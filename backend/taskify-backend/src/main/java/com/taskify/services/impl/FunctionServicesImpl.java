package com.taskify.services.impl;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.constants.TaskType;
import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionDto;
import com.taskify.dtos.FunctionFieldDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.external.email.EmailService;
import com.taskify.models.ActivityLogModel;
import com.taskify.models.FunctionFieldModel;
import com.taskify.models.FunctionModel;
import com.taskify.models.TaskModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.FunctionFieldRepository;
import com.taskify.repositories.FunctionRepository;
import com.taskify.repositories.TaskRepository;
import com.taskify.repositories.UserRepository;
import com.taskify.services.ActivityLogServices;
import com.taskify.services.FunctionFieldServices;
import com.taskify.services.FunctionServices;

import java.nio.file.Files;

@Service
public class FunctionServicesImpl implements FunctionServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FunctionRepository functionRepository;

    @Autowired
    private FunctionFieldServices functionFieldServices;

    @Autowired
    private FunctionFieldRepository functionFieldRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ActivityLogServices activityLogServices;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public FunctionDto createFunction(FunctionDto functionDto, FileDto[] files) {
        TaskModel taskModel = this.taskRepository.findById(functionDto.getTaskId()).orElseThrow(
                () -> new ResourceNotFoundException("No task exist for id: " + functionDto.getTaskId()));

                System.out.println("created user id: " + functionDto.getCreatedByUserId());
                System.out.println("assigned user id: " + functionDto.getAssignedUserId());
        UserModel createdUser = this.userRepository.findById(functionDto.getCreatedByUserId()).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + functionDto.getCreatedByUserId()));
        UserModel assignedUser = this.userRepository.findById(functionDto.getAssignedUserId()).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + functionDto.getAssignedUserId()));

        FunctionModel functionModel = this.modelMapper.map(functionDto, FunctionModel.class);
        functionModel.setTask(taskModel);
        functionModel.setCreatedByUser(createdUser);
        FunctionModel savedFunctionModel = this.functionRepository.save(functionModel);
        System.out.println("\n\nSaved function: " + savedFunctionModel);
        for (FunctionFieldDto fieldDto : functionDto.getFunctionFields()) {
            fieldDto.setFunctionId(savedFunctionModel.getId());
            this.functionFieldServices.createFunctionField(fieldDto, files);
        }

        // Send notification to the assigned task
        taskModel.setAssignedUser(assignedUser);
        this.taskRepository.save(taskModel);
        String subject = "Function Assignment on Taskify";
        String body = this.generateEmailBody(createdUser, taskModel, assignedUser, savedFunctionModel);
        this.emailService.sendSimpleMessage(assignedUser.getEmail(), subject, body);

        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("FUNCTION");
        activityLogModel.setAction("CREATE");
        activityLogModel.setMessage("A Function got created by " + taskModel.getAssignedUser().getName());

        this.activityLogServices.createLog(activityLogModel);

        return this.functionModelToDto(savedFunctionModel);
    }

    public String generateEmailBody(UserModel createdUser, TaskModel taskModel, UserModel assignedUser, FunctionModel functionModel) {
        String body = "Dear " + assignedUser.getName() + ",\n\n" +
            "We hope this message finds you well.\n\n" + 
            "We are pleased to inform you that a function has been assigned to you on Taskify. Below are the details of the task and function:\n\n" +
            "Task Type     : " + taskModel.getTaskType() + "\n" +
            "Task Priorrity: " + taskModel.getTaskPriority() + "\n" + 
            "Function      : " + functionModel.getFunctionTitle() + "\n" + 
            "Due Date      : " + functionModel.getDueDate() + "\n" + 
            "Department    : " + functionModel.getFunctionDepartment() + "\n" + 
            "Created By    : " + functionModel.getCreatedByUser().getName() + "\n\n" +
            "Please log in to your Taskify account to review the task details and manage your workflow. Should you have any questions or require further information, feel free to reach out.\n\n" + 
            "Thank you for your attention and cooperation.\n\n" +
            "Best regards,\n\n" +
            "Taskify Software"
        ;

        return body;
    }


    @Override
    public List<FunctionDto> getAllFunctionsByTask(Long taskId) {
        TaskModel taskModel = this.taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("No task exist for id: " + taskId));

        return this.functionModelListToDtoList(
                this.functionRepository.findByTask(taskModel));
    }

    @Override
    public List<FunctionDto> getCompletedFunctions() {
        return this.functionModelListToDtoList(
                this.functionRepository.findByIsCompleted(true));
    }

    @Override
    public FunctionDto getFunctionById(Long functionId) {
        return this.functionModelToDto(
                this.functionRepository.findById(functionId).orElseThrow(
                        () -> new ResourceNotFoundException("No function exist for id: " + functionId)));
    }

    @Override
    public FunctionDto updateFunction(FunctionDto functionDto, Long functionId) {
        FunctionModel foundFunctionModel = this.functionRepository.findById(functionId).orElseThrow(
                () -> new ResourceNotFoundException("No function exist for id: " + functionId));

        foundFunctionModel.setDueDate(functionDto.getDueDate());
        foundFunctionModel.setLastEdited(functionDto.getLastEdited());
        foundFunctionModel.setIsCompleted(functionDto.getIsCompleted());

        FunctionDto updatedFunctionDto = this.functionModelToDto(
            this.functionRepository.save(foundFunctionModel));

            TaskModel taskModel = this.taskRepository.findById(foundFunctionModel.getTask().getId()).orElse(null);
            UserModel assigUserModel = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElse(null);
          // Create a log
          ActivityLogModel activityLogModel = new ActivityLogModel();
          activityLogModel.setDate(new Date());
          activityLogModel.setType("FUNCTION");
          activityLogModel.setAction("UPDATE");
          activityLogModel.setMessage("A Function got updated by " + assigUserModel.getName());
  
          this.activityLogServices.createLog(activityLogModel);

        return updatedFunctionDto;
    }

    @Override
    public Boolean deleteFunction(Long functionId) {
        FunctionModel functionModel = this.functionRepository.findById(functionId).orElse(null);
        if (functionModel == null) {
            return false;
        }

        TaskModel taskModel = this.taskRepository.findById(functionModel.getTask().getId()).orElse(null);
        UserModel assigUserModel = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElse(null);

        List<FunctionFieldModel> functionFieldModels = this.functionFieldRepository.findByFunction(functionModel);
        for (FunctionFieldModel functionFieldModel : functionFieldModels) {
            this.functionFieldServices.deleteFunctionField(functionFieldModel.getId());
        }

        this.functionRepository.deleteById(functionId);



        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("FUNCTION");
        activityLogModel.setAction("DELETE");
        activityLogModel.setMessage("A Function got deleted by " + assigUserModel.getName());

        this.activityLogServices.createLog(activityLogModel);

        return true;
    }

    public Object getFunctionTemplateByTaskType(String taskType) {
        String jsonFileName;
        if (taskType.toUpperCase().equals(TaskType.NEW_PUMP_INQUIRY.name())) {
            jsonFileName = "new-pump-inquiry.json";
        } else if (taskType.toUpperCase().equals(TaskType.SERVICE_TASK.name())) {
            jsonFileName = "service-task.json";
        } else {
            throw new IllegalArgumentException("Invalid task type");
        }

        return readJsonFromFile(jsonFileName);
    }

    private Object readJsonFromFile(String fileName) {
        try {
            ClassPathResource resource = new ClassPathResource(fileName);
            byte[] jsonData = Files.readAllBytes(Paths.get(resource.getURI()));
            return objectMapper.readValue(jsonData, Object.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read JSON file: " + fileName, e);
        }
    }

    public FunctionDto functionModelToDto(FunctionModel functionModel) {
        TaskModel taskModel = this.taskRepository.findById(functionModel.getTask().getId()).orElse(null);


        UserModel createdUser = this.userRepository.findById(taskModel.getCreatedByUser().getId()).orElseThrow(
            () -> new ResourceNotFoundException("No user exist for id: " + functionModel.getCreatedByUser().getId()));
        
    UserModel assignedUser = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElseThrow(
            () -> new ResourceNotFoundException("No user exist for id: " + functionModel.getTask().getAssignedUser().getId()));


        FunctionDto functionDto = this.modelMapper.map(functionModel, FunctionDto.class);
        functionDto.setTaskId(functionModel.getTask().getId());
        functionDto.setFunctionFields(this.functionFieldServices.getAllFunctionFieldsByFunction(functionModel.getId()));
        functionDto.setCreatedByUserId(createdUser.getId());
        functionDto.setAssignedUserId(assignedUser.getId());

        return functionDto;
    }

    public List<FunctionDto> functionModelListToDtoList(List<FunctionModel> functionModelList) {
        List<FunctionDto> functionDtoList = new ArrayList<>();
        for (FunctionModel functionModel : functionModelList) {
            functionDtoList.add(this.functionModelToDto(functionModel));
        }

        return functionDtoList;
    }

}

package com.taskify.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.taskify.constants.TaskPriority;
import com.taskify.constants.TaskType;
import com.taskify.dtos.TaskDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.external.email.EmailService;
import com.taskify.models.ActivityLogModel;
import com.taskify.models.CustomerModel;
import com.taskify.models.FunctionModel;
import com.taskify.models.TaskModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.CustomerRepository;
import com.taskify.repositories.FunctionRepository;
import com.taskify.repositories.TaskRepository;
import com.taskify.repositories.UserRepository;
import com.taskify.services.ActivityLogServices;
import com.taskify.services.FunctionServices;
import com.taskify.services.TaskServices;
import com.taskify.utils.ListResponse;
import com.taskify.utils.TaskifyStats;

@Service
public class TaskServicesImpl implements TaskServices {

    public static final int PAGE_SIZE = 25;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FunctionServices functionServices;

    @Autowired
    private FunctionRepository functionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ActivityLogServices activityLogServices;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        taskDto.setId(0L);
        TaskModel taskModel = this.taskDtoToModel(taskDto);
        UserModel createdByUser = this.userRepository.findById(taskDto.getCreatedByUserId()).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + taskDto.getCreatedByUserId()));
        UserModel assignUser = this.userRepository.findById(taskDto.getAssignedUserId()).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + taskDto.getCreatedByUserId()));

        taskModel.setCreatedByUser(createdByUser);
        taskModel.setAssignedUser(assignUser);

        TaskDto createdTaskDto = this.taskModelToDto(this.taskRepository.save(taskModel));

        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("TASK");
        activityLogModel.setAction("CREATE");
        activityLogModel.setMessage("A task got created by " + taskModel.getCreatedByUser().getName());

        this.activityLogServices.createLog(activityLogModel);

        String subject = "Task Assignment Notification from Taskify Software";
        String body = generateCreateTaskEmail(taskModel, createdByUser);
        this.emailService.sendSimpleMessage(assignUser.getEmail(), subject, body);

        return createdTaskDto;
    }

    public String generateCreateTaskEmail(TaskModel taskModel, UserModel userModel) {
        String body = "\nDear " + userModel.getName() + ",\n\n" +
                "We hope this message finds you well. This is to inform you that you have been assigned a task via Taskify Software. The details of the task are as follows:\n\n"
                +
                "Task Type: " + taskModel.getTaskType() + "\n" +
                "Task Priority: " + taskModel.getTaskPriority() + "\n\n" +
                "You will be responsible for this task. Please feel free to reach out if you have any specific instructions or requirements for this task.\n\n"
                +
                "Looking forward to your guidance and support throughout the completion of this task.\n\n" +
                "Best regards,\n" +
                "Taskify Software\n";
        ;

        return body;
    }

    @Override
    public ListResponse<List<TaskDto>> getAllTask(int pageNumber) {
        Pageable pageable = this.getPageable(pageNumber);
        Page<TaskModel> taskPage = this.taskRepository.findAll(pageable);

        List<TaskModel> taskModelList = taskPage.getContent();

        ListResponse<List<TaskDto>> listResponse = new ListResponse(
                pageNumber,
                PAGE_SIZE,
                taskPage.getTotalPages(),
                taskPage.getTotalElements(),
                this.taskModeListToDtoList(taskModelList));

        return listResponse;
    }

    @Override
    public ListResponse<List<TaskDto>> getTasksByType(String taskType, int pageNumber) {
        Pageable pageable = this.getPageable(pageNumber);
        Page<TaskModel> taskPage = this.taskRepository.findByTaskTypeOrderByTaskTypeDesc(taskType, pageable);

        List<TaskModel> taskModelList = taskPage.getContent();

        ListResponse<List<TaskDto>> listResponse = new ListResponse(
                pageNumber,
                PAGE_SIZE,
                taskPage.getTotalPages(),
                taskPage.getTotalElements(),
                this.taskModeListToDtoList(taskModelList));

        return listResponse;
    }

    public TaskifyStats getStats() {
        TaskifyStats taskifyStats = new TaskifyStats();

        taskifyStats.setTotalTasks(this.taskRepository.countTotalTasks());

        taskifyStats.setNewPumpInquiryTasks(this.taskRepository.countTasksByType(TaskType.NEW_PUMP_INQUIRY.name()));
        taskifyStats.setServiceTasks(this.taskRepository.countTasksByType(TaskType.SERVICE_TASK.name()));

        taskifyStats.setCurrentTasks(this.taskRepository.countTasksForCurrentMonth());
        taskifyStats.setCurrentHighPriorityTasks(
                this.taskRepository.countTasksByPriorityForCurrentMonth(TaskPriority.HIGH.name()));

        taskifyStats.setCurrentTaskCompleted(this.taskRepository.countTasksByIsCompletedForCurrentMonth(true));

        taskifyStats.setTotalCustomers(this.customerRepository.count());

        System.out.println("\n\n total task: " + taskifyStats.toString());

        return taskifyStats;
    }

    @Override
    public ListResponse<List<TaskDto>> getTasksByPriority(String taskPriority, int pageNumber) {
        Pageable pageable = this.getPageable(pageNumber);
        Page<TaskModel> taskPage = this.taskRepository.findByTaskPriorityOrderByTaskPriorityDesc(taskPriority,
                pageable);

        List<TaskModel> taskModelList = taskPage.getContent();

        ListResponse<List<TaskDto>> listResponse = new ListResponse(
                pageNumber,
                PAGE_SIZE,
                taskPage.getTotalPages(),
                taskPage.getTotalElements(),
                this.taskModeListToDtoList(taskModelList));

        return listResponse;
    }

    @Override
    public List<TaskDto> getTasksByCustomer(Long customerId, int pageNumber) {
        CustomerModel customerModel = this.customerRepository.findById(customerId).orElseThrow(
                () -> new ResourceNotFoundException("No customer exist for id: " + customerId));
        Pageable pageable = this.getPageable(pageNumber);
        Page<TaskModel> taskPage = this.taskRepository.findByCustomerOrderByCustomerDesc(customerModel, pageable);

        List<TaskModel> taskModelList = taskPage.getContent();

        return taskModelList.stream()
                .map(this::taskModelToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getTasksByAssignedUser(Long assignedUserId) {
        UserModel assignedUser = this.userRepository.findById(assignedUserId).orElseThrow(
                () -> new ResourceNotFoundException("No user exist for id: " + assignedUserId));

        List<TaskModel> taskModelList = this.taskRepository.findByAssignedUser(assignedUser);

        return taskModelList.stream()
                .map(this::taskModelToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ListResponse<List<TaskDto>> getCompletedTasks(int pageNumber) {
        Pageable pageable = this.getPageable(pageNumber);
        Page<TaskModel> taskPage = this.taskRepository.findByIsCompletedOrderByIsCompletedDesc(true, pageable);

        List<TaskModel> taskModelList = taskPage.getContent();

        ListResponse<List<TaskDto>> listResponse = new ListResponse(
                pageNumber,
                PAGE_SIZE,
                taskPage.getTotalPages(),
                taskPage.getTotalElements(),
                this.taskModeListToDtoList(taskModelList));

        return listResponse;
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
        return this.taskModelToDto(
                this.taskRepository.findById(taskId).orElseThrow(
                        () -> new ResourceNotFoundException("No task exist for id: " + taskId)));
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto, Long taskId) {
        System.out.println("\n\n taskDto: " + taskDto);

        TaskModel foundTaskModel = this.taskDtoToModel(this.getTaskById(taskId));
        if (foundTaskModel != null) {
            UserModel assignedUser = this.userRepository.findById(taskDto.getAssignedUserId()).orElseThrow(
                    () -> new ResourceNotFoundException("No user exist for id: " + taskDto.getAssignedUserId()));

            foundTaskModel.setCompletedDate(taskDto.getCompletedDate());
            foundTaskModel.setIsCompleted(taskDto.getIsCompleted());
            foundTaskModel.setProblemDescription(taskDto.getProblemDescription());
            foundTaskModel.setPumpManufacturer(taskDto.getPumpManufacturer());
            foundTaskModel.setPumpType(taskDto.getPumpType());
            foundTaskModel.setRequirements(taskDto.getRequirements());
            foundTaskModel.setSpecification(taskDto.getSpecification());
            foundTaskModel.setTaskPriority(taskDto.getTaskPriority());


            // If assigning the task to another user
            if (!taskDto.getAssignedUserId().equals(foundTaskModel.getAssignedUser().getId()) && !taskDto.getIsCompleted()) {
                foundTaskModel.setAssignedUser(assignedUser);
            }

            // Create a log
            ActivityLogModel activityLogModel = new ActivityLogModel();
            activityLogModel.setDate(new Date());
            activityLogModel.setType("TASK");
            activityLogModel.setAction("UPDATE");
            activityLogModel.setMessage("Task got updated by " + foundTaskModel.getAssignedUser().getName());

            this.activityLogServices.createLog(activityLogModel);

            TaskDto updatedTaskDto = this.taskModelToDto(
                    this.taskRepository.save(foundTaskModel));

            UserModel createdUser = this.userRepository.findById(taskDto.getCreatedByUserId()).orElseThrow(
                    () -> new ResourceNotFoundException("No user exist for id: " + taskDto.getAssignedUserId()));

            String subject = "task#" + updatedTaskDto.getId() + " forwarded to you on Taskify";
            String body = this.generateEmailBody(createdUser, foundTaskModel, assignedUser);
            this.emailService.sendSimpleMessage(assignedUser.getEmail(), subject, body);

            return updatedTaskDto;
        }

        return null;
    }

    public String generateEmailBody(UserModel createdUser, TaskModel taskModel, UserModel assignedUser) {
        String body = "Dear " + assignedUser.getName() + ",\n\n" +
                "We hope this message finds you well.\n\n" +
                "We are pleased to inform you that a task has been forwarded to you on Taskify. Below are the details of the task and function:\n\n"
                +
                "Task Type     : " + taskModel.getTaskType() + "\n" +
                "Task Priorrity: " + taskModel.getTaskPriority() + "\n" +
                "Created By    : " + taskModel.getCreatedByUser().getName() + "\n\n" +
                "Please log in to your Taskify account to review the task details and manage your workflow. Should you have any questions or require further information, feel free to reach out.\n\n"
                +
                "Thank you for your attention and cooperation.\n\n" +
                "Best regards,\n\n" +
                "Taskify Software";

        return body;
    }

    @Override
    public Boolean deleteTask(Long taskId) {
        TaskModel taskModel = this.taskRepository.findById(taskId).orElse(null);
        if (taskModel == null) {
            return false;
        }

        // Delete all functions
        List<FunctionModel> functionModels = this.functionRepository.findByTask(taskModel);
        for (FunctionModel functionModel : functionModels) {
            this.functionServices.deleteFunction(functionModel.getId());
        }

        // Delete the given tash by id
        this.taskRepository.deleteById(taskId);

        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("TASK");
        activityLogModel.setAction("DELETE");
        activityLogModel.setMessage("Task got deleted by " + taskModel.getAssignedUser().getName());

        this.activityLogServices.createLog(activityLogModel);

        return true;
    }

    public TaskDto taskModelToDto(TaskModel taskModel) {
        TaskDto taskDto = this.modelMapper.map(taskModel, TaskDto.class);
        taskDto.setCustomerId(taskModel.getCustomer().getId());
        taskDto.setAssignedUserId(taskModel.getAssignedUser().getId());
        taskDto.setFunctions(this.functionServices.getAllFunctionsByTask(taskModel.getId()));

        return taskDto;
    }

    public List<TaskDto> taskModeListToDtoList(List<TaskModel> taskModelList) {
        List<TaskDto> taskDtoList = new ArrayList<>();

        for (TaskModel taskModel : taskModelList) {
            taskDtoList.add(this.taskModelToDto(taskModel));
        }

        return taskDtoList;
    }

    public TaskModel taskDtoToModel(TaskDto taskDto) {
        // Check for customer exist
        CustomerModel customerModel = this.customerRepository.findById(taskDto.getCustomerId())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "No customer exist for id: " + taskDto.getCustomerId()));

        // Check for assigned user exist
        UserModel assignedUser = this.userRepository.findById(taskDto.getAssignedUserId())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "No user exist for id: " + taskDto.getAssignedUserId()));

        TaskModel taskModel = this.modelMapper.map(taskDto, TaskModel.class);
        taskModel.setCustomer(customerModel);
        taskModel.setAssignedUser(assignedUser);

        return taskModel;
    }

    public Pageable getPageable(int pageNumber) {
        if (pageNumber < 0) {
            throw new IllegalArgumentException("Page number should always be greater than 0");
        }
        return PageRequest.of(pageNumber, PAGE_SIZE);
    }

}

package com.taskify.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.dtos.FieldColumnDto;
import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionDto;
import com.taskify.dtos.FunctionFieldDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.ActivityLogModel;
import com.taskify.models.FieldColumnModel;
import com.taskify.models.FunctionFieldModel;
import com.taskify.models.FunctionModel;
import com.taskify.models.TaskModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.FieldColumnRepository;
import com.taskify.repositories.FunctionFieldRepository;
import com.taskify.repositories.FunctionRepository;
import com.taskify.repositories.TaskRepository;
import com.taskify.repositories.UserRepository;
import com.taskify.services.ActivityLogServices;
import com.taskify.services.FieldColumnServices;
import com.taskify.services.FunctionFieldServices;

@Service
public class FunctionFieldServicesImpl implements FunctionFieldServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FunctionRepository functionRepository;

    @Autowired
    private FunctionFieldRepository functionFieldRepository;

    @Autowired
    private FieldColumnServices fieldColumnServices;

    @Autowired
    private FieldColumnRepository fieldColumnRepository;

    @Autowired
    private ActivityLogServices activityLogServices;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public FunctionFieldDto createFunctionField(FunctionFieldDto functionFieldDto, FileDto[] files) {
        FunctionModel functionModel = this.functionRepository.findById(functionFieldDto.getFunctionId()).orElseThrow(
                () -> new ResourceNotFoundException("No function exist for id: " + functionFieldDto.getFunctionId()));

        FunctionFieldModel functionFieldModel = this.modelMapper.map(functionFieldDto, FunctionFieldModel.class);
        functionFieldModel.setFunction(functionModel);

        FunctionFieldModel savedFunctionFieldModel = this.functionFieldRepository.save(functionFieldModel);
        System.out.println("\n\nsaved function_field: " + savedFunctionFieldModel);
        // FunctionFieldDto savedFunctionFieldDto =
        // this.functionFieldModelToDto(savedFunctionFieldModel);

        for (FieldColumnDto fieldColumnDto : functionFieldDto.getFieldColumns()) {
            fieldColumnDto.setFunctionFieldId(savedFunctionFieldModel.getId());
            FieldColumnModel fieldColumnModel = this.modelMapper.map(
                    fieldColumnDto, FieldColumnModel.class);
            fieldColumnModel.setFunctionField(savedFunctionFieldModel);

            this.fieldColumnServices.createFieldColumn(fieldColumnDto, files);
        }

        FunctionModel foundFunctionModel = this.functionRepository.findById(functionFieldDto.getFunctionId())
                .orElse(null);
        TaskModel taskModel = this.taskRepository.findById(foundFunctionModel.getTask().getId()).orElse(null);
        UserModel assigUserModel = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElse(null);

        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("FUNCTION_FIELD");
        activityLogModel.setAction("CREATED");
        activityLogModel.setMessage("A function_field got created by " + assigUserModel.getName());

        this.activityLogServices.createLog(activityLogModel);

        return this.functionFieldModelToDto(savedFunctionFieldModel);

    }

    @Override
    public List<FunctionFieldDto> getAllFunctionFieldsByFunction(Long functionId) {
        FunctionModel functionModel = this.functionRepository.findById(functionId).orElseThrow(
                () -> new ResourceNotFoundException("No function exist for id: " + functionId));

        return this.functionFieldModelListToDtoList(
                this.functionFieldRepository.findByFunction(functionModel));
    }

    @Override
    public List<FunctionFieldDto> getCompletedFunctionFields() {
        return this.functionFieldModelListToDtoList(
                this.functionFieldRepository.findByIsCompleted(true));
    }

    @Override
    public FunctionFieldDto getFunctionFieldById(Long functionFieldId) {
        return this.functionFieldModelToDto(
                this.functionFieldRepository.findById(functionFieldId).orElseThrow(
                        () -> new ResourceNotFoundException("No function_field exist for id: " + functionFieldId)));
    }

    @Override
    public FunctionFieldDto updateFunctionField(FunctionFieldDto functionFieldDto, Long functionFieldId) {
        try {
            FunctionFieldModel foundFunctionFieldModel = this.functionFieldRepository.findById(functionFieldId).orElseThrow(
                    () -> new ResourceNotFoundException("No function_field exist for id: " + functionFieldId));
    
            foundFunctionFieldModel.setLastEdited(functionFieldDto.getLastEdited());
            foundFunctionFieldModel.setIsCompleted(functionFieldDto.getIsCompleted());
            foundFunctionFieldModel.setLastEdited(new Date());
            System.out.println(foundFunctionFieldModel);
    
            FunctionFieldDto updatedFunctionFieldDto = this.functionFieldModelToDto(
                    this.functionFieldRepository.save(foundFunctionFieldModel));
    
            for (FieldColumnDto fieldColumnDto : functionFieldDto.getFieldColumns()) {
                this.fieldColumnServices.updateFieldColumn(fieldColumnDto, fieldColumnDto.getId());
            }
    
            List<FunctionFieldDto> functionFieldDtos = this
                    .getAllFunctionFieldsByFunction(foundFunctionFieldModel.getFunction().getId());
            Boolean flag = false;
            for (FunctionFieldDto functionFieldDto2 : functionFieldDtos) {
                if (functionFieldDto2.getIsCompleted() == false) {
                    break;
                } else {
                    flag = true;
                }
            }
    
            FunctionModel foundFunctionModel = this.functionRepository
                    .findById(foundFunctionFieldModel.getFunction().getId())
                    .orElse(null);
    
            if (flag == true) {
                foundFunctionModel.setIsCompleted(true);
                this.functionRepository.save(foundFunctionModel);
            }
    
            TaskModel taskModel = this.taskRepository.findById(foundFunctionModel.getTask().getId()).orElse(null);
            UserModel assigUserModel = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElse(null);
    
            // Create a log
            ActivityLogModel activityLogModel = new ActivityLogModel();
            activityLogModel.setDate(new Date());
            activityLogModel.setType("FUNCTION_FIELD");
            activityLogModel.setAction("UPDATE");
            activityLogModel.setMessage("A function_field got deleted by " + assigUserModel.getName());
    
            this.activityLogServices.createLog(activityLogModel);
    
            return updatedFunctionFieldDto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteFunctionField(Long functionFieldId) {
        FunctionFieldModel fieldModel = this.functionFieldRepository.findById(functionFieldId).orElse(null);
        if (fieldModel == null) {
            return false;
        }

        List<FieldColumnModel> fieldColumnModels = this.fieldColumnRepository.findByFunctionField(fieldModel);
        for (FieldColumnModel fieldColumnModel : fieldColumnModels) {
            this.fieldColumnServices.deleteFieldColumn(fieldColumnModel.getId());
        }

        this.functionFieldRepository.deleteById(functionFieldId);

        FunctionModel foundFunctionModel = this.functionRepository.findById(fieldModel.getFunction().getId())
                .orElse(null);
        TaskModel taskModel = this.taskRepository.findById(foundFunctionModel.getTask().getId()).orElse(null);
        UserModel assigUserModel = this.userRepository.findById(taskModel.getAssignedUser().getId()).orElse(null);

        // Create a log
        ActivityLogModel activityLogModel = new ActivityLogModel();
        activityLogModel.setDate(new Date());
        activityLogModel.setType("FUNCTION_FIELD");
        activityLogModel.setAction("DELETE");
        activityLogModel.setMessage("A function_field got deleted by " + assigUserModel.getName());

        this.activityLogServices.createLog(activityLogModel);

        return true;
    }

    public FunctionFieldDto functionFieldModelToDto(FunctionFieldModel functionFieldModel) {
        if (functionFieldModel == null) {
            return null;
        }

        FunctionFieldDto functionFieldDto = this.modelMapper.map(functionFieldModel, FunctionFieldDto.class);
        functionFieldDto.setFunctionId(functionFieldModel.getFunction().getId());
        functionFieldDto
                .setFieldColumns(this.fieldColumnServices.getAllFieldColumnsByFunctionField(functionFieldDto.getId()));

        return functionFieldDto;
    }

    public List<FunctionFieldDto> functionFieldModelListToDtoList(List<FunctionFieldModel> functionFieldModelList) {
        List<FunctionFieldDto> functionFieldDtoList = new ArrayList<>();
        for (FunctionFieldModel functionFieldModel : functionFieldModelList) {
            functionFieldDtoList.add(this.functionFieldModelToDto(functionFieldModel));
        }

        return functionFieldDtoList;
    }

}

package com.taskify.services;

import java.util.List;

import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionDto;

public interface FunctionServices {

    public FunctionDto createFunction(FunctionDto FunctionDto, FileDto[] files);

    public List<FunctionDto> getAllFunctionsByTask(Long taskId);

    public List<FunctionDto> getCompletedFunctions();
    
    public FunctionDto getFunctionById(Long functionId);

    public Object getFunctionTemplateByTaskType(String taskType);

    public FunctionDto updateFunction(FunctionDto functionDto, Long functionId);

    public Boolean deleteFunction(Long functionId);

}

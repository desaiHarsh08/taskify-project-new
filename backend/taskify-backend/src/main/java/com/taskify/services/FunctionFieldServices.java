package com.taskify.services;

import java.util.List;

import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionFieldDto;

public interface FunctionFieldServices {

    public FunctionFieldDto createFunctionField(FunctionFieldDto functionFieldDto, FileDto[] files);

    public List<FunctionFieldDto> getAllFunctionFieldsByFunction(Long functionId);

    public List<FunctionFieldDto> getCompletedFunctionFields();
    
    public FunctionFieldDto getFunctionFieldById(Long functionFieldId);

    public FunctionFieldDto updateFunctionField(FunctionFieldDto functionFieldDto, Long functionFieldId);

    public Boolean deleteFunctionField(Long functionFieldId);

}

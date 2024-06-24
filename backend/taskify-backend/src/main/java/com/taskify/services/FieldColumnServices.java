package com.taskify.services;

import java.util.List;

import com.taskify.dtos.FieldColumnDto;
import com.taskify.dtos.FileDto;

public interface FieldColumnServices {
    
    public FieldColumnDto createFieldColumn(FieldColumnDto fieldColumnDto, FileDto[] files);

    public List<FieldColumnDto> getAllFieldColumnsByFunctionField(Long functionFieldId);
    
    public FieldColumnDto getFieldColumnById(Long fieldColumnId);

    public FieldColumnDto updateFieldColumn(FieldColumnDto fieldColumnDto, Long fieldColumnId);

    public Boolean deleteFieldColumn(Long fieldColumnId);

}

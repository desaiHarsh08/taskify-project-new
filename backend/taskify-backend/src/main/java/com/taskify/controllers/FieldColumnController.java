package com.taskify.controllers;

import java.util.List;

import org.modelmapper.spi.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.services.FieldColumnServices;
import com.taskify.dtos.FieldColumnDto;
import com.taskify.dtos.FileDto;

class FieldColumnRequest {
    public FieldColumnDto fieldColumnDto;
    public FileDto[] fileDtos;
}

@RestController
@RequestMapping("/api/v1/field-columns")
public class FieldColumnController {

    @Autowired
    private FieldColumnServices fieldColumnServices;

    @PostMapping(value = "", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createFieldColumn(@RequestBody FieldColumnRequest fieldColumnRequest) {
        FieldColumnDto createdFieldColumn = this.fieldColumnServices.createFieldColumn(fieldColumnRequest.fieldColumnDto, fieldColumnRequest.fileDtos);
        if (createdFieldColumn != null) {
            return new ResponseEntity<>(createdFieldColumn, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(
            new ErrorMessage("FieldColumn already exist"), 
            HttpStatus.CONFLICT
        );
    }
    
    @GetMapping("/function-field/{functionFieldId}")
    public ResponseEntity<List<FieldColumnDto>> getAllFieldColumnsByFunction(@PathVariable Long functionFieldId) {
        return new ResponseEntity<List<FieldColumnDto>>(
            this.fieldColumnServices.getAllFieldColumnsByFunctionField(functionFieldId), 
            HttpStatus.OK);
    }
    
    @GetMapping("/{fieldColumnId}")
    public ResponseEntity<FieldColumnDto> getFieldColumnById(@PathVariable Long fieldColumnId) {
        return new ResponseEntity<FieldColumnDto>(
            this.fieldColumnServices.getFieldColumnById(fieldColumnId), 
            HttpStatus.OK);
    }

    @PutMapping("/{fieldColumnId}")
    public ResponseEntity<FieldColumnDto> updateFieldColumn(@PathVariable Long fieldColumnId, @RequestBody FieldColumnDto fieldColumnDto) {
        if (fieldColumnDto.getId() != fieldColumnId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<FieldColumnDto>(
            this.fieldColumnServices.updateFieldColumn(fieldColumnDto, fieldColumnId), 
            HttpStatus.OK);
    }

    @DeleteMapping("/{fieldColumnId}")
    public ResponseEntity<Boolean> deleteFieldColumn(@PathVariable Long fieldColumnId) {
        return new ResponseEntity<Boolean>(
            this.fieldColumnServices.deleteFieldColumn(fieldColumnId), 
            HttpStatus.OK);
    }

}

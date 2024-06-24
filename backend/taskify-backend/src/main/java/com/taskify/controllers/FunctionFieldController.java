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

import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionFieldDto;
import com.taskify.services.FunctionFieldServices;

class FunctionFieldRequest {
    public FunctionFieldDto functionFieldDto;
    public FileDto[] fileDtos;
}
@RestController
@RequestMapping("/api/v1/function-fields")
public class FunctionFieldController {

    @Autowired
    private FunctionFieldServices functionFieldServices;

    @PostMapping(value = "", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createFunctionField(@RequestBody FunctionFieldRequest functionFieldRequest) {
        FunctionFieldDto createdFunctionField = this.functionFieldServices.createFunctionField(functionFieldRequest.functionFieldDto, functionFieldRequest.fileDtos);
        if (createdFunctionField != null) {
            return new ResponseEntity<>(createdFunctionField, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(
            new ErrorMessage("FunctionField already exist"), 
            HttpStatus.CONFLICT
        );
    }
    
    @GetMapping("/function/{functionId}")
    public ResponseEntity<List<FunctionFieldDto>> getAllFunctionFieldsByFunction(@PathVariable Long functionId) {
        return new ResponseEntity<List<FunctionFieldDto>>(
            this.functionFieldServices.getAllFunctionFieldsByFunction(functionId), 
            HttpStatus.OK);
    }
    
    @GetMapping("/{functionFieldId}")
    public ResponseEntity<FunctionFieldDto> getFunctionFieldById(@PathVariable Long functionFieldId) {
        return new ResponseEntity<FunctionFieldDto>(
            this.functionFieldServices.getFunctionFieldById(functionFieldId), 
            HttpStatus.OK);
    }
    
    @GetMapping("/completed")
    public ResponseEntity<List<FunctionFieldDto>> getCompletedFunctionFields() {
        return new ResponseEntity<List<FunctionFieldDto>>(
            this.functionFieldServices.getCompletedFunctionFields(), 
            HttpStatus.OK);
    }

    @PutMapping("/{functionFieldId}")
    public ResponseEntity<FunctionFieldDto> updateFunctionField(@PathVariable Long functionFieldId, @RequestBody FunctionFieldDto functionFieldDto) {
        if (functionFieldDto.getId() != functionFieldId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<FunctionFieldDto>(
            this.functionFieldServices.updateFunctionField(functionFieldDto, functionFieldId), 
            HttpStatus.OK);
    }

    @DeleteMapping("/{functionFieldId}")
    public ResponseEntity<Boolean> deleteFunctionField(@PathVariable Long functionFieldId) {
        return new ResponseEntity<Boolean>(
            this.functionFieldServices.deleteFunctionField(functionFieldId), 
            HttpStatus.OK);
    }

}

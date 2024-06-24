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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskify.dtos.FileDto;
import com.taskify.dtos.FunctionDto;
import com.taskify.services.FunctionServices;

class FunctionRequest {
    public FunctionDto functionDto;
    public FileDto[] fileDtos;
}

@RestController
@RequestMapping("/api/v1/functions")
public class FunctionController {

    @Autowired
    private FunctionServices functionServices;

    // @PostMapping(value = "", consumes = { "multipart/form-data" })
    // public ResponseEntity<?> createFunction(@RequestBody FunctionRequest functionRequest) {
    //     // System.out.println("" +object.toString());
    //     // FunctionDto functionDto = (FunctionDto) object;
    //     System.out.println(functionRequest.functionDto.toString());
    //     // FunctionDto functionDto = (FunctionDto) object;
    //     System.out.println("functionDto: " + functionRequest.functionDto);
    //     try {
    //         FunctionDto createdFunction = this.functionServices.createFunction(functionRequest.functionDto,
    //                 functionRequest.fileDtos);
    //         if (createdFunction != null) {
    //             System.out.println("functionDto: " + functionRequest.functionDto);
    //             return new ResponseEntity<>(createdFunction, HttpStatus.CREATED);
    //         }
    //         return new ResponseEntity<ErrorMessage>(
    //                 new ErrorMessage("Function already exist"),
    //                 HttpStatus.CONFLICT);
    //     } catch (Exception e) {
    //         System.out.println(e);
    //         throw new IllegalArgumentException("test delete");
    //     }
    // }


    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<?> createFunction(
            @RequestPart("functionDto") String functionDtoJson,
            @RequestPart(value = "files", required = false) MultipartFile[] files,
            @RequestPart(value = "fileMetadata", required = false) String fileMetadataJson) {
        try {
            FunctionDto functionDto = objectMapper.readValue(functionDtoJson, FunctionDto.class);
             // Initialize fileDtos to an empty array if files or fileMetadataJson is null
        FileDto[] fileDtos = new FileDto[0];
        
        if (files != null && fileMetadataJson != null) {
            fileDtos = objectMapper.readValue(fileMetadataJson, FileDto[].class);

            // Ensure number of files match number of fileDtos
            if (files.length != fileDtos.length) {
                return new ResponseEntity<>(new ErrorMessage("Number of files does not match file metadata"),
                        HttpStatus.BAD_REQUEST);
            }

            // Associate each file with its respective FileDto
            for (int i = 0; i < fileDtos.length; i++) {
                fileDtos[i].setFile(files[i]);
            }
        }

            FunctionDto createdFunction = this.functionServices.createFunction(functionDto, fileDtos);
            if (createdFunction != null) {
                return new ResponseEntity<>(createdFunction, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(new ErrorMessage("Function already exists"), HttpStatus.CONFLICT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorMessage("Error creating function: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<FunctionDto>> getAllFunctionsByTask(@PathVariable Long taskId) {
        return new ResponseEntity<List<FunctionDto>>(
                this.functionServices.getAllFunctionsByTask(taskId),
                HttpStatus.OK);
    }

    @GetMapping("/{functionId}")
    public ResponseEntity<FunctionDto> getFunctionById(@PathVariable Long functionId) {
        return new ResponseEntity<FunctionDto>(
                this.functionServices.getFunctionById(functionId),
                HttpStatus.OK);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<FunctionDto>> getCompletedFunctions() {
        return new ResponseEntity<List<FunctionDto>>(
                this.functionServices.getCompletedFunctions(),
                HttpStatus.OK);
    }

    @GetMapping("/template/{taskType}")
    public ResponseEntity<Object> getFunctionByPriority(@PathVariable String taskType) {
        return new ResponseEntity<Object>(
                this.functionServices.getFunctionTemplateByTaskType(taskType),
                HttpStatus.OK);
    }

    @PutMapping("/{functionId}")
    public ResponseEntity<FunctionDto> updateFunction(@PathVariable Long functionId,
            @RequestBody FunctionDto functionDto) {
        if (functionDto.getId() != functionId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<FunctionDto>(
                this.functionServices.updateFunction(functionDto, functionId),
                HttpStatus.OK);
    }

    @DeleteMapping("/{functionId}")
    public ResponseEntity<Boolean> deleteFunction(@PathVariable Long functionId) {
        return new ResponseEntity<Boolean>(
                this.functionServices.deleteFunction(functionId),
                HttpStatus.OK);
    }

}

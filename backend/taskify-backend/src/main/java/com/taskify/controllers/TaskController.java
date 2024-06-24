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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.dtos.TaskDto;
import com.taskify.services.TaskServices;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskServices taskServices;

    @PostMapping("")
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto) {
        System.out.println(taskDto);
        TaskDto createdTask = this.taskServices.createTask(taskDto);
        if (createdTask != null) {
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(
            new ErrorMessage("Task already exist"), 
            HttpStatus.CONFLICT
        );
    }
    
    @GetMapping("")
    public ResponseEntity<List<TaskDto>> getAllTasks(@RequestParam int pageNumber) {
        return new ResponseEntity<List<TaskDto>>(
            this.taskServices.getAllTask(pageNumber), 
            HttpStatus.OK);
    }
    
    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long taskId) {
        return new ResponseEntity<TaskDto>(
            this.taskServices.getTaskById(taskId), 
            HttpStatus.OK);
    }
    
    @GetMapping("/type")
    public ResponseEntity<List<TaskDto>> getTaskByType(@RequestParam String taskType, @RequestParam int pageNumber) {
        return new ResponseEntity<List<TaskDto>>(
            this.taskServices.getTasksByType(taskType, pageNumber), 
            HttpStatus.OK);
    }
    
    @GetMapping("/priority")
    public ResponseEntity<List<TaskDto>> getTaskByPriority(@RequestParam String taskPriority, @RequestParam int pageNumber) {
        return new ResponseEntity<List<TaskDto>>(
            this.taskServices.getTasksByPriority(taskPriority, pageNumber), 
            HttpStatus.OK);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<TaskDto>> getTaskByCustomer(@RequestParam Long customerId, @RequestParam int pageNumber) {
        return new ResponseEntity<List<TaskDto>>(
            this.taskServices.getTasksByCustomer(customerId, pageNumber), 
            HttpStatus.OK);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<TaskDto>> getCompletedTask(@RequestParam int pageNumber) {
        return new ResponseEntity<List<TaskDto>>(
            this.taskServices.getCompletedTasks(pageNumber), 
            HttpStatus.OK);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long taskId, @RequestBody TaskDto taskDto) {
        if (taskDto.getId() != taskId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<TaskDto>(
            this.taskServices.updateTask(taskDto, taskId), 
            HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Boolean> deleteTask(@PathVariable Long taskId) {
        System.out.println("fired deleting");
        return new ResponseEntity<Boolean>(
            this.taskServices.deleteTask(taskId), 
            HttpStatus.OK);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        System.out.println("fired stats");
        return new ResponseEntity<>(
            this.taskServices.getStats(), 
            HttpStatus.OK);
    }


}

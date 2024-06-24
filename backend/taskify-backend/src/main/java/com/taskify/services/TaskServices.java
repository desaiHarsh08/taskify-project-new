package com.taskify.services;

import java.util.List;

import com.taskify.dtos.TaskDto;
import com.taskify.utils.TaskifyStats;

public interface TaskServices {

    public TaskDto createTask(TaskDto taskDto);

    public List<TaskDto> getAllTask(int pageNumber);


    public TaskifyStats getStats();

    public List<TaskDto> getTasksByType(String taskType, int pageNumber);

    public List<TaskDto> getTasksByPriority(String taskPriority, int pageNumber);

    public List<TaskDto> getTasksByCustomer(Long customerId, int pageNumber);

    public List<TaskDto> getTasksByAssignedUser(Long assignedUserId);

    public List<TaskDto> getCompletedTasks(int pageNumber);
    
    public TaskDto getTaskById(Long taskId);

    public TaskDto updateTask(TaskDto TaskDto, Long TaskId);

    public Boolean deleteTask(Long taskId);

}

package com.taskify.dtos;

import java.util.Date;
import java.util.List;

import com.taskify.constants.TaskPriority;
import com.taskify.constants.TaskType;
import com.taskify.models.UserModel;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;

    private String taskType = TaskType.NEW_PUMP_INQUIRY.name();

    private String taskPriority = TaskPriority.NORMAL.name();

    private Long customerId;

    private String pumpType; // For all task

    private String pumpManufacturer; // For "NEW_PUMP_INQUIRY"

    private String specification; // For "NEW_PUMP_INQUIRY"

    private String requirements; // For "NEW_PUMP_INQUIRY"

    private String problemDescription; // For "SERVICE_TASK"

    @ManyToOne(targetEntity = UserModel.class)
    private Long assignedUserId;

    private Date createdDate;
    
    private Date completedDate;

    private Boolean isCompleted;

    private Long createdByUserId;

    List<FunctionDto> functions;

}

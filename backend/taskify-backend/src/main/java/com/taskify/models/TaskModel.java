package com.taskify.models;

import java.util.Date;

import com.taskify.constants.ModelConstants;
import com.taskify.constants.TaskPriority;
import com.taskify.constants.TaskType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = ModelConstants.TASK_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TaskModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskType = TaskType.NEW_PUMP_INQUIRY.name();

    private String taskPriority = TaskPriority.NORMAL.name();

    @ManyToOne(targetEntity = CustomerModel.class)
    @JoinColumn(name = "customer_id_fk")
    private CustomerModel customer;

    private String pumpType; // For all task

    private String pumpManufacturer; // For "NEW_PUMP_INQUIRY"

    private String specification; // For "NEW_PUMP_INQUIRY"

    private String requirements; // For "NEW_PUMP_INQUIRY"

    private String problemDescription; // For "SERVICE_TASK"

    @ManyToOne(targetEntity = UserModel.class)
    private UserModel assignedUser;

    private Date createdDate;

    @ManyToOne(targetEntity = UserModel.class)
    private UserModel createdByUser;
    
    private Date completedDate;

    private Boolean isCompleted;

}

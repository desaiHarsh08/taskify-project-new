package com.taskify.models;

import java.util.Date;

import com.taskify.constants.Department;
import com.taskify.constants.ModelConstants;

import jakarta.persistence.Column;
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
@Table(name = ModelConstants.FUNCTION_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FunctionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String functionTitle;

    @Column(nullable = false)
    private String functionDescription;

    @Column(nullable = false)
    private String functionDepartment = Department.QUOTATION.name();

    private Date addedDate;

    private Date dueDate;

    private Date lastEdited;

    @ManyToOne(targetEntity = TaskModel.class)
    @JoinColumn(name = "task_id_fk")
    private TaskModel task;

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "created_user_id_fk")
    private UserModel createdByUser;

    private Boolean isCompleted;

}

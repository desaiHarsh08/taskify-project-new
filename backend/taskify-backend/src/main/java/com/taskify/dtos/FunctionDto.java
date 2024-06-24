package com.taskify.dtos;

import java.util.Date;
import java.util.List;

import com.taskify.constants.Department;
import com.taskify.models.UserModel;

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
public class FunctionDto {

    private Long id;

    private String functionTitle;

    private String functionDescription;

    private String functionDepartment = Department.QUOTATION.name();

    private Date addedDate;

    private Date dueDate;

    private Date lastEdited;

    private Long taskId;

    private Boolean isCompleted;

    private List<FunctionFieldDto> functionFields; 

    private Long assignedUserId;

    private Long createdByUserId;

}

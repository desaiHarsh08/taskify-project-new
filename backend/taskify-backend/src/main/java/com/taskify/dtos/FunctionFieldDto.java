package com.taskify.dtos;

import java.util.Date;
import java.util.List;

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
public class FunctionFieldDto {

    private Long id;

    private String fieldTitle;

    private String fieldDescription;

    private Long functionId;

    private Date fieldCreated;

    private Date lastEdited;

    private Boolean isCompleted;

    List<FieldColumnDto> fieldColumns;

}

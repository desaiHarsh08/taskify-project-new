package com.taskify.dtos;

import java.util.Date;
import java.util.List;

import com.taskify.constants.ColumnType;

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
public class FieldColumnDto {

    private Long id;

    private String type = ColumnType.STRING.name();

    private String name;

    private List<Object> files;

    private String value;

    private String forwardFileToEmail;

    private Boolean largeText;

    private Boolean unique;

    private Boolean autoAssign;

    private Boolean multipleFiles;

    private Long functionFieldId;

    private Date lastEdited;

}

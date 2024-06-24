package com.taskify.models;

import java.util.Date;

import com.taskify.constants.ColumnType;
import com.taskify.constants.ModelConstants;

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
@Table(name = ModelConstants.COLUMN_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FieldColumnModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type = ColumnType.STRING.name();

    private String name;

    private String value;

    private String forwardFileToEmail;

    private Boolean largeText;

    private Boolean isUnique;

    private Boolean autoAssign;

    private Boolean multipleFiles;

    @ManyToOne(targetEntity = FunctionFieldModel.class)
    @JoinColumn(name = "field_id_fk")
    private FunctionFieldModel functionField;

    private Date lastEdited;

}

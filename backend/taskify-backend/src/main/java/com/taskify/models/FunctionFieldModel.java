package com.taskify.models;

import java.util.Date;

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
@Table(name = ModelConstants.FIELD_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FunctionFieldModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldTitle;

    private String fieldDescription;

    @ManyToOne(targetEntity = FunctionModel.class)
    @JoinColumn(name = "function_id_fk")
    private FunctionModel function;

    private Date fieldCreated;

    private Date lastEdited;

    private Boolean isCompleted;
}

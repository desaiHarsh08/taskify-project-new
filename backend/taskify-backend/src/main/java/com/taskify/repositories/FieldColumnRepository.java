package com.taskify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.FieldColumnModel;
import com.taskify.models.FunctionFieldModel;

@Repository
public interface FieldColumnRepository extends JpaRepository<FieldColumnModel, Long> {

    List<FieldColumnModel> findByFunctionField(FunctionFieldModel functionField);

}

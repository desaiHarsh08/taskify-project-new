package com.taskify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.FunctionFieldModel;
import com.taskify.models.FunctionModel;

@Repository
public interface FunctionFieldRepository extends JpaRepository<FunctionFieldModel, Long> {

    List<FunctionFieldModel> findByFunction(FunctionModel function);

    List<FunctionFieldModel> findByIsCompleted(Boolean isCompleted);

}

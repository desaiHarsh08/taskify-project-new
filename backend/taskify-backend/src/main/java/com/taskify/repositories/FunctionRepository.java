package com.taskify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.FunctionModel;
import com.taskify.models.TaskModel;

@Repository
public interface FunctionRepository extends JpaRepository<FunctionModel, Long> {

    List<FunctionModel> findByTask(TaskModel task);

    List<FunctionModel> findByIsCompleted(Boolean isCompleted);

}

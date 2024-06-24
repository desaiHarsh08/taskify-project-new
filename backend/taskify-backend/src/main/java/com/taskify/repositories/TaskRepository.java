package com.taskify.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.taskify.models.CustomerModel;
import com.taskify.models.TaskModel;
import com.taskify.models.UserModel;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {

    Page<TaskModel> findByTaskTypeOrderByTaskTypeDesc(String taskType, Pageable pageable);

    Page<TaskModel> findByTaskPriorityOrderByTaskPriorityDesc(String taskPriority, Pageable pageable);

    public Page<TaskModel> findByCustomerOrderByCustomerDesc(CustomerModel customer, Pageable pageable);

    public List<TaskModel> findByAssignedUser(UserModel assignedUser);

    public Page<TaskModel> findByIsCompletedOrderByIsCompletedDesc(Boolean isCompleted, Pageable pageable);

    // New methods for counting tasks
    @Query("SELECT COUNT(t) FROM TaskModel t")
    public long countTotalTasks();

    @Query("SELECT COUNT(t) FROM TaskModel t WHERE t.taskType = :taskType")
    long countTasksByType(@Param("taskType") String taskType);

    @Query("SELECT COUNT(t) FROM TaskModel t WHERE t.taskPriority = :taskPriority")
    long countTasksByPriority(@Param("taskPriority") String taskPriority);

    @Query("SELECT COUNT(t) FROM TaskModel t WHERE MONTH(t.createdDate) = MONTH(CURRENT_DATE) AND YEAR(t.createdDate) = YEAR(CURRENT_DATE)")
    long countTasksForCurrentMonth();

    @Query("SELECT COUNT(t) FROM TaskModel t WHERE t.taskType = :taskType AND MONTH(t.createdDate) = MONTH(CURRENT_DATE()) AND YEAR(t.createdDate) = YEAR(CURRENT_DATE())")
long countTasksByTypeForCurrentMonth(@Param("taskType") String taskType);


@Query("SELECT COUNT(t) FROM TaskModel t WHERE t.taskPriority = :taskPriority AND MONTH(t.createdDate) = MONTH(CURRENT_DATE()) AND YEAR(t.createdDate) = YEAR(CURRENT_DATE())")
long countTasksByPriorityForCurrentMonth(@Param("taskPriority") String taskPriority);

@Query("SELECT COUNT(t) FROM TaskModel t WHERE t.isCompleted = :isCompleted AND MONTH(t.createdDate) = MONTH(CURRENT_DATE()) AND YEAR(t.createdDate) = YEAR(CURRENT_DATE())")
long countTasksByIsCompletedForCurrentMonth(@Param("isCompleted") Boolean isCompleted);


}

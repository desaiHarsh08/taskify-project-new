package com.taskify.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.taskify.models.ActivityLogModel;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLogModel, Long> {

    @Query("SELECT a FROM ActivityLogModel a WHERE DATE(a.date) = CURRENT_DATE ORDER BY a.date DESC")
    List<ActivityLogModel> findTodaysActivities();

}
package com.taskify.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.models.ActivityLogModel;
import com.taskify.services.ActivityLogRepository;
import com.taskify.services.ActivityLogServices;

@Service
public class ActivityLogServicesImpl implements ActivityLogServices {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Override
    public List<ActivityLogModel> getTodaysActivities() {
        // Fetch activities for today
        List<ActivityLogModel> activityLogModels = this.activityLogRepository.findTodaysActivities();

        // Log retrieved activities
        System.out.println("\n\nlogs: " + activityLogModels);

        return activityLogModels;
    }

    @Override
    public void createLog(ActivityLogModel activityLogModel) {
        this.activityLogRepository.save(activityLogModel);
    }
}

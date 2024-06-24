package com.taskify.services;

import com.taskify.models.ActivityLogModel;

import java.util.List;
public interface ActivityLogServices {

    public List<ActivityLogModel> getTodaysActivities();

    public void createLog(ActivityLogModel activityLogModel);

}

package com.taskify.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.services.ActivityLogServices;

@RestController
@RequestMapping("/api/v1/logs")
public class ActivityLogController {

    @Autowired
    private ActivityLogServices activityLogServices;

    @GetMapping("")
    public ResponseEntity<?> getActivityLogs() {
        return new ResponseEntity<>(
                this.activityLogServices.getTodaysActivities(),
                HttpStatus.OK
        );
    }

}
package com.taskify.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskifyStats {

    private Long totalTasks;

    private Long serviceTasks;

    private Long newPumpInquiryTasks;

    private Long currentTasks;

    private Long currentHighPriorityTasks;

    private Long currentTaskCompleted;

    private Long totalCustomers;

}

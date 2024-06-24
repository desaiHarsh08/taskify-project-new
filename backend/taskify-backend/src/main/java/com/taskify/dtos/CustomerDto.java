package com.taskify.dtos;

import java.util.List;

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
public class CustomerDto {

    private Long id;

    private String customerName;

    private String customerTmpId;

    private String email;

    private String personOfContact;

    private String phone;

    private String address;

    private String city;

    private String pincode;

    private List<TaskDto> allTask;

}

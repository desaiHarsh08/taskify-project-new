package com.taskify.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    private String name;
    
    private String email;

    private String phone;

    private String password;

    private Boolean isDisabled;

    private String department;

    private List<String> roles;

    private Boolean isActive;

    private Boolean isAdmin;

}

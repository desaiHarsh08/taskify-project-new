package com.taskify.services;

import java.util.List;

import com.taskify.dtos.UserDto;

public interface UserServices {

    public UserDto createUser(UserDto userDto);

    public List<UserDto> getAllUsers();
    
    public List<UserDto> getUsersByDepartment(String department);

    public List<UserDto> getDisabledUsers();

    public UserDto getUserById(Long userId);

    public UserDto getUserByEmail(String email);

    public UserDto updateUser(UserDto userDto, Long userId);

    public Boolean resetPassward(String email, String rawPassword);

}

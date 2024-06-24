package com.taskify.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskify.dtos.UserDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.external.email.EmailService;
import com.taskify.models.RoleModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.RoleRepository;
import com.taskify.repositories.UserRepository;
import com.taskify.services.UserServices;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) 
    {
        UserModel founUserModel = this.userRepository.findByEmail(userDto.getEmail()).orElse(null);
        if (founUserModel != null) {
            return null;
        }
        // Encrypt the raw password
        userDto.setPassword(this.bCryptPasswordEncoder.encode(userDto.getPassword()));
        // Create an user
        UserModel savedUser = userRepository.save(this.modelMapper.map(userDto, UserModel.class));

        // Notify the user
        emailService.sendSimpleMessage(savedUser.getEmail(), "Welcome to Taskify", "Your account has been created.");

        // Add Roles
        for (String role: userDto.getRoles()) {
            RoleModel roleModel = new RoleModel();
            roleModel.setRoleType(role);
            roleModel.setUser(savedUser);

            roleRepository.save(roleModel);
        }


        return this.userModelToDto(savedUser);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return this.userModelListToDto(this.userRepository.findAll());
    }

    @Override
    public List<UserDto> getUsersByDepartment(String department) {
        return this.userModelListToDto(this.userRepository.findByDepartment(department));
    }

    @Override
    public List<UserDto> getDisabledUsers() {
        return this.userModelListToDto(this.userRepository.findByIsDisabled(true));
    }

    @Override
    public UserDto getUserById(Long userId) {
        UserModel foundUser = this.userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("No user exist with id: " + userId));

        return this.userModelToDto(foundUser);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        UserModel foundUser = this.userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("No user exist with email: " + email));

        return this.userModelToDto(foundUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long userId) {
        UserModel foundUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("No user exist with id: " + userId));
        foundUser.setName(userDto.getName());
        foundUser.setIsDisabled(userDto.getIsDisabled());
        foundUser.setPhone(userDto.getPhone());
        foundUser.setDepartment(userDto.getDepartment());
        foundUser.setIsActive(userDto.getIsActive());
        
        // Update user fields here
        UserModel updatedUser = userRepository.save(foundUser);
        return this.userModelToDto(updatedUser);
    }

    // TODO
    @Override
    public Boolean resetPassward(String email, String rawPassword) {
        // UserModel user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        // assuming PasswordUtil is a utility class to hash the password
        // user.setPassword(PasswordUtil.hashPassword(rawPassword));
        // userRepository.save(user);
        // emailService.sendSimpleMessage(email, "Password Reset", "Your password has been reset.");
        return false;
    }

    public UserDto userModelToDto(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        // Map UserModel to UserDto
        UserDto userDto = this.modelMapper.map(userModel, UserDto.class);

        // Fetch all roles for the user
        List<RoleModel> roleModelList = this.roleRepository.findByUser(userModel);

        // Map roles to strings and add them to UserDto
        List<String> roles = roleModelList.stream()
                                .map(RoleModel::getRoleType)
                                .collect(Collectors.toList());

        userDto.setRoles(roles);

        return userDto;
    }

    public List<UserDto> userModelListToDto(List<UserModel> userModelList) {
        List<UserDto> userDtoList = new ArrayList<>();

        for (UserModel userModel: userModelList) {
            userDtoList.add(this.userModelToDto(userModel));
        }

        return userDtoList;
    }

}

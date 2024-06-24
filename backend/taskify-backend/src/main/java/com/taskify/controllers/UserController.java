package com.taskify.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.dtos.UserDto;
import com.taskify.services.UserServices;
import com.taskify.utils.ErrorMessage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserServices userServices;

    @PostMapping("")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        UserDto createdUser = this.userServices.createUser(userDto);
        if (createdUser != null) {
            return new ResponseEntity<UserDto>(createdUser, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(new ErrorMessage("User already exist"), HttpStatus.CONFLICT);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<List<UserDto>>(
            this.userServices.getAllUsers(), 
            HttpStatus.OK
        );
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        return new ResponseEntity<UserDto>(
            this.userServices.getUserById(userId), 
            HttpStatus.OK
        );
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<List<UserDto>> getUsersByDepartment(@PathVariable String department) {
        return new ResponseEntity<List<UserDto>>(
            this.userServices.getUsersByDepartment(department), 
            HttpStatus.OK
        );
    }
    
    @GetMapping("/disabled")
    public ResponseEntity<List<UserDto>> getDisabledUsers() {
        return new ResponseEntity<List<UserDto>>(
            this.userServices.getDisabledUsers(), 
            HttpStatus.OK
        );
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        return new ResponseEntity<UserDto>(
            this.userServices.getUserByEmail(email), 
            HttpStatus.OK
        );
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) {
        if (userDto.getId() != userId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<UserDto>(
            this.userServices.updateUser(userDto, userId), 
            HttpStatus.OK
        );
    }

    @PostMapping("/reset/{userId}")
    public ResponseEntity<Boolean> resetPassword(@PathVariable Long userId, @RequestBody Map<String, String> obj) {
        return new ResponseEntity<Boolean>(
            this.userServices.resetPassward(obj.get("email"), obj.get("password")), 
            HttpStatus.OK
        );
    }

    

}

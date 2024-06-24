package com.taskify.controllers;

import java.util.List;

import org.modelmapper.spi.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.services.RoleServices;
import com.taskify.models.RoleModel;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    @Autowired
    private RoleServices roleServices;

    @PostMapping("")
    public ResponseEntity<?> createRole(@RequestBody RoleModel Role) {
        RoleModel createdRole = this.roleServices.createRole(Role);
        if (createdRole != null) {
            return new ResponseEntity<RoleModel>(createdRole, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(new ErrorMessage("Role already exist"), HttpStatus.CONFLICT);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserRoles(@PathVariable Long userId) {
        return new ResponseEntity<List<RoleModel>>(
            this.roleServices.getUserRoles(userId), 
            HttpStatus.OK
        );
    }
    
    @GetMapping("/{roleId}")
    public ResponseEntity<RoleModel> getRoleById(@PathVariable Long roleId) {
        return new ResponseEntity<RoleModel>(
            this.roleServices.getRoleById(roleId), 
            HttpStatus.OK
        );
    }
   
    @PutMapping("/{roleId}")
    public ResponseEntity<RoleModel> updateRole(@PathVariable Long roleId, @RequestBody RoleModel roleModel) {
        if (roleModel.getId() != roleId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<RoleModel>(
            this.roleServices.updateRole(roleModel, roleId), 
            HttpStatus.OK
        );
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Boolean> delteRole(@PathVariable Long roleId) {
        return new ResponseEntity<Boolean>(
            this.roleServices.deleteRole(roleId), 
            HttpStatus.OK
        );
    }

}

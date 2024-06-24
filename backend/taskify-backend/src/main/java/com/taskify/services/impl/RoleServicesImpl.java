package com.taskify.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.RoleModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.RoleRepository;
import com.taskify.repositories.UserRepository;
import com.taskify.services.RoleServices;

@Service
public class RoleServicesImpl implements RoleServices {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public RoleModel createRole(RoleModel roleModel) {
        // Check if the user exist
        Long userId = roleModel.getUser().getId();
        UserModel foundUser = this.userRepository.findById(userId).orElse(null);
        if (foundUser == null) {
            throw new ResourceNotFoundException("No user exist with id: " + userId);
        }

        // Check if the role already exist
        List<RoleModel> roleModelList = this.getUserRoles(roleModel.getId());
        List<String> roles = roleModelList.stream()
                                .map(RoleModel::getRoleType)
                                .collect(Collectors.toList());
        if (roles.contains(roleModel.getRoleType())) {
            return null;
        }
        // Add the role
        return this.roleRepository.save(roleModel);
    }

    @Override
    public List<RoleModel> getUserRoles(Long userId) {
        UserModel foundUser = this.userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("No user exist with id: " + userId)
            );
        return this.roleRepository.findByUser(foundUser);
    }

    @Override
    public RoleModel getRoleById(Long roleId) {
        return this.roleRepository.findById(roleId).orElseThrow(
            () -> new ResourceNotFoundException("No role found for id: " + roleId)
        );
    }

    // TODO
    @Override
    public RoleModel updateRole(RoleModel roleModel, Long roleId) {

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateRole'");
    }

    @Override
    public Boolean deleteRole(Long roleId) {
        this.getRoleById(roleId);
        this.deleteRole(roleId);
        return true;
    }

}

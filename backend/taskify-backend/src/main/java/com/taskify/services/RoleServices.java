package com.taskify.services;

import java.util.List;

import com.taskify.models.RoleModel;


public interface RoleServices {

    public RoleModel createRole(RoleModel RoleModel);

    public List<RoleModel> getUserRoles(Long userId);
    
    public RoleModel getRoleById(Long roleId);

    public RoleModel updateRole(RoleModel roleModel, Long roleId);

    public Boolean deleteRole(Long roleId);

}

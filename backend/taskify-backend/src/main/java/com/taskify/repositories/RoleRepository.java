package com.taskify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.RoleModel;
import com.taskify.models.UserModel;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {

    List<RoleModel> findByUser(UserModel user);
    
}

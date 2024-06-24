package com.taskify.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    public Optional<UserModel> findByEmail(String email);

    public List<UserModel> findByDepartment(String department);

    public List<UserModel> findByIsDisabled(Boolean isDisabled);

}

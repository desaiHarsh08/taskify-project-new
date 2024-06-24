package com.taskify.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.CustomerModel;

@Repository
public interface CustomerRepository extends JpaRepository <CustomerModel, Long> {

    Optional<CustomerModel> findByEmail(String email);
    
}

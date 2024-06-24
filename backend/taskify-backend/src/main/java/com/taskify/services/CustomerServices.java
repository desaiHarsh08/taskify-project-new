package com.taskify.services;

import java.util.List;

import com.taskify.dtos.CustomerDto;
import com.taskify.dtos.CustomerResponse;

public interface CustomerServices {

    public CustomerDto createCustomer(CustomerDto customer);

    public CustomerResponse getAllCustomers(int pageNumber);
    
    public CustomerDto getCustomerById(Long customerId);
    
    public CustomerDto getCustomerByEmail(String email);

    public CustomerDto updateCustomer(CustomerDto CustomerDto, Long customerId);

    public Boolean deleteCustomer(Long customerId);

}

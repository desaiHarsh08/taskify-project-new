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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.services.CustomerServices;
import com.taskify.dtos.CustomerDto;
import com.taskify.dtos.CustomerResponse;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody CustomerDto customerDto) {
        System.out.println(customerDto);
        CustomerDto createdCustomer = this.customerServices.createCustomer(customerDto);
        if (customerDto != null) {
            return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
        }
        return new ResponseEntity<ErrorMessage>(
            new ErrorMessage("Customer already exist"), 
            HttpStatus.CONFLICT
        );
    }
    
    @GetMapping("")
    public ResponseEntity<CustomerResponse> getAllCustomers(@RequestParam int pageNumber) {
        return new ResponseEntity<CustomerResponse>(
            this.customerServices.getAllCustomers(pageNumber), 
            HttpStatus.OK);
    }
    
    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long customerId) {
        return new ResponseEntity<CustomerDto>(
            this.customerServices.getCustomerById(customerId), 
            HttpStatus.OK);
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<CustomerDto> getCustomerByEmail(@PathVariable String email) {
        return new ResponseEntity<CustomerDto>(
            this.customerServices.getCustomerByEmail(email), 
            HttpStatus.OK);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Long customerId, @RequestBody CustomerDto customerDto) {
        System.out.println("in controller, customerDto: " + customerDto);
        if (customerDto.getId() != customerId) {
            throw new IllegalArgumentException("Invalid id");
        }
        return new ResponseEntity<CustomerDto>(
            this.customerServices.updateCustomer(customerDto, customerId), 
            HttpStatus.OK);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Boolean> deleteCustomer(@PathVariable Long customerId) {
        return new ResponseEntity<Boolean>(
            this.customerServices.deleteCustomer(customerId), 
            HttpStatus.OK);
    }

}

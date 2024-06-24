package com.taskify.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.taskify.dtos.CustomerDto;
import com.taskify.dtos.CustomerResponse;
import com.taskify.dtos.TaskDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.CustomerModel;
import com.taskify.repositories.CustomerRepository;
import com.taskify.services.CustomerServices;
import com.taskify.services.TaskServices;

@Service
public class CustomerServicesImpl implements CustomerServices {

    public static final Integer PAGE_SIZE = 25;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TaskServices taskServices;

    @Override
    public CustomerDto createCustomer(CustomerDto customer) {
        // CustomerModel foundCustomer = this.customerRepository
        // if (this.getCustomerByEmail(customer.getEmail()) != null) {
        //     return null;
        // }
        CustomerModel customerModel = this.modelMapper.map(customer, CustomerModel.class);
        
        CustomerModel savedCustomerModel = this.customerRepository.save(customerModel);

        return this.customerModelToDto(savedCustomerModel);
    }

    @Override
    public CustomerResponse getAllCustomers(int pageNumber) {
        if (pageNumber < 0) {
            throw new IllegalArgumentException("Page number should always be greater than 0");
        }
        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE);
        Page<CustomerModel> customerPage = this.customerRepository.findAll(pageable);

        List<CustomerDto> customerDtos = customerPage.stream()
        .map(this::customerModelToDto)
        .collect(Collectors.toList());

        CustomerResponse pageResponse = new CustomerResponse();
        pageResponse.setContent(customerDtos);
        pageResponse.setPageNumber(customerPage.getNumber());
        pageResponse.setPageSize(customerPage.getSize());
        pageResponse.setTotalEntries(customerPage.getTotalElements());
        pageResponse.setTotalPages(customerPage.getTotalPages());
        pageResponse.setLastPage(customerPage.isLast());

        return pageResponse;
    }

    @Override
    public CustomerDto getCustomerByEmail(String email) {
        return this.customerModelToDto(
                this.customerRepository.findByEmail(email).orElseThrow(
                        () -> new ResourceNotFoundException("No customer exist with email:" + email)
                    )
                );
    }

    @Override
    public CustomerDto getCustomerById(Long customerId) {
        return this.customerModelToDto(
                this.customerRepository.findById(customerId).orElseThrow(
                        () -> new ResourceNotFoundException("No customer exist with id:" + customerId)
                    )
                );
    }

    @Override
    public CustomerDto updateCustomer(CustomerDto customerDto, Long customerId) {
        System.out.println("customerDto: " + customerDto);
        CustomerModel foundCustomer = this.customerRepository.findById(customerId).orElse(null);
        if (foundCustomer == null) {
            throw new ResourceNotFoundException("No customer exist with id:" + customerId);
        }
        foundCustomer.setCustomerName(customerDto.getCustomerName());
        foundCustomer.setCustomerTmpId(customerDto.getCustomerTmpId());
        foundCustomer.setPersonOfContact(customerDto.getPersonOfContact());
        foundCustomer.setPhone(customerDto.getPhone());
        foundCustomer.setCity(customerDto.getCity());
        foundCustomer.setAddress(customerDto.getAddress());
        foundCustomer.setPincode(customerDto.getPincode());

        CustomerModel savedCustomer = this.customerRepository.save(foundCustomer);

        return this.customerModelToDto(savedCustomer);
    }

    @Override
    public Boolean deleteCustomer(Long customerId) {
        CustomerDto customerDto = this.getCustomerById(customerId);

        // Delete all the task
        for (TaskDto taskDto: customerDto.getAllTask()) {
            this.taskServices.deleteTask(taskDto.getId());
        }
        this.customerRepository.deleteById(customerId);
        return true;
    }

    public CustomerDto customerModelToDto(CustomerModel customerModel) {
        if (customerModel == null) {
            return null;
        }

        CustomerDto customerDto = this.modelMapper.map(customerModel, CustomerDto.class);

        customerDto.setAllTask(this.taskServices.getTasksByCustomer(customerModel.getId(), 0));

        return customerDto;
    }

    public List<CustomerDto> customerModelListToDto(List<CustomerModel> customerModelList) {
        List<CustomerDto> customerDtoList = new ArrayList<>();

        for (CustomerModel customerModel : customerModelList) {
            customerDtoList.add(this.customerModelToDto(customerModel));
        }

        return customerDtoList;
    }

}

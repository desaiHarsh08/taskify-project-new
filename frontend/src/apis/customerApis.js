import { API, handleApiError } from "../utils/api";

export const addCustomer = async (customer) => {
    console.log("creating customer: ", customer);
    try {
        const response = await API.post(`/api/v1/customers`,
            customer,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        );
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchAllCustomers = async (pageNumber) => {
    try {
        const response = await API.get(`/api/v1/customers?pageNumber=${pageNumber}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchCustomerById = async (customerId) => {
    console.log(customerId);
    try {
        const response = await API.get(`/api/v1/customers/${customerId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateCustomer = async (customer) => {
    try {
        const response = await API.put(`/api/v1/customers/${customer.id}`,
            customer,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        );
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const deleteCustomer = async (customerId) => {
    console.log(customerId);
    try {
        const response = await API.delete(`/api/v1/customers/${customerId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
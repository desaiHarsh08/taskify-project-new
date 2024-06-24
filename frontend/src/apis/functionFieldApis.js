import { API, handleApiError } from "../utils/api";

export const createFunctionField = async (newFunctionField) => {
    try {
        const response = await API.post(`/api/v1/function-fields`, 
        newFunctionField,
        {
            headers: {
                'Content-Type': "multipart/form-data" 
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

export const fetchAllFunctionFieldsByFunctionId = async (functionId) => {
    try {
        const response = await API.get(`/api/v1/function-fields/function/${functionId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchFunctionFieldById = async (functionFieldId) => {
    console.log(functionFieldId);
    try {
        const response = await API.get(`/api/v1/function-fields/${functionFieldId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateFunctionField = async (updatedFunctionField) => {
    try {
        const response = await API.put(`/api/v1/function-fields/${updatedFunctionField.id}`, updatedFunctionField, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const deleteFunctionField = async (functionFieldId) => {
    try {
        const response = await API.delete(`/api/v1/function-fields/${functionFieldId}`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
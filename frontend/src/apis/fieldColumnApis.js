import { API, handleApiError } from "../utils/api";

export const createFieldColumn = async (newFieldColumn) => {
    try {
        const response = await API.post(`/api/v1/field-columns`, 
        newFieldColumn,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
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

export const fetchAllFieldColumnsByFunctionFieldId = async (functionFieldId) => {
    try {
        const response = await API.get(`/api/v1/field-columns/function/${functionFieldId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchFieldColumnById = async (fieldColumnId) => {
    console.log(fieldColumnId);
    try {
        const response = await API.get(`/api/v1/field-columns/${fieldColumnId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateFieldColumn = async (updatedFieldColumn) => {
    try {
        const response = await API.put(`/api/v1/field-columns/${updatedFieldColumn.id}`, updatedFieldColumn, {
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

export const deleteFieldColumn = async (fieldColumnId) => {
    try {
        const response = await API.delete(`/api/v1/field-columns/${fieldColumnId}`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
import { API, handleApiError } from "../utils/api";

// export const createFunction = async (formData) => {
//     console.log("making request for adding function:", formData);
//     try {
//         const response = await API.post(`/api/v1/functions`,
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             },
//         );
//         console.log(response.data)
//         return { error: null, data: response.data }
//     } catch (error) {
//         console.log(error);
//         return handleApiError(error);
//     }
// }

export const createFunction = async (formData) => {
    console.log("FormData entries before request:");
    if (!formData.has("files")) {
        formData.append("files", null);
    }
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value, "\n");
    }
    console.log("making request for adding function:", formData);
    try {
        const response = await API.post(`/api/v1/functions`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log(response.data);
        return { error: null, data: response.data };
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
};

export const fetchAllFunctionsByTaskId = async (taskId) => {
    try {
        const response = await API.get(`/api/v1/functions/task/${taskId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchFunctionById = async (functionId) => {
    console.log(functionId);
    try {
        const response = await API.get(`/api/v1/functions/${functionId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchFunctionFormat = async (taskType) => {
    try {
        const response = await API.get(`/api/v1/functions/template/${taskType}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateFunction = async (updatedFunction) => {
    try {
        const response = await API.put(`/api/v1/functions/${updatedFunction.id}`, updatedFunction, {
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

export const deleteFunction = async (functionId) => {
    try {
        const response = await API.delete(`/api/v1/functions/${functionId}`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
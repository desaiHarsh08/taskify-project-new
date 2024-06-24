import { API, handleApiError } from "../utils/api";

export const createTask = async (newTask) => {
    try {
        const response = await API.post(`/api/v1/tasks`, 
        newTask,
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

export const fetchAllTasks = async (pageNumber) => {
    try {
        const response = await API.get(`/api/v1/tasks?pageNumber=${pageNumber}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchTaskById = async (taskId) => {
    console.log(taskId);
    try {
        const response = await API.get(`/api/v1/tasks/${taskId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateTask = async (task) => {
    try {
        const response = await API.put(`/api/v1/tasks/${task.id}`, task, {
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

export const deleteTask = async (taskId) => {
    try {
        const response = await API.delete(`/api/v1/tasks/${taskId}`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const getStats = async () => {
    try {
        const response = await API.get(`/api/v1/tasks/stats`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
import { API, handleApiError } from "../utils/api";

export const getLogs = async () => {
    try {
        const response = await API.get(`/api/v1/logs`);
        console.log(response.data)
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
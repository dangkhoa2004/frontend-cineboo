import { apiClient } from './api';
import axios from 'axios'; // Ensure Axios is imported

/* Lấy danh sách mã phương thức thanh toán */
export const fetchpttts = async (params = {}) => {
    try {
        const response = await apiClient.get('/pttt/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu mã phương thức thanh toán]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy mã phương thức thanh toán theo id */
export const fetchptttById = async (id: string) => {
    try {
        const response = await apiClient.get(`/pttt/find/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu mã phương thức thanh toán]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Cập nhật mã phương thức thanh toán theo id */
export const updateptttById = async (id: string, ptttData: any) => {
    try {
        const response = await apiClient.put(`/pttt/update/${id}`, ptttData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật mã phương thức thanh toán]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Xoá mã phương thức thanh toán theo id */
export const deleteptttById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/pttt/delete/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá mã phương thức thanh toán');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá mã phương thức thanh toán]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Tạo mã phương thức thanh toán mới */
export const createpttt = async (ptttData: any) => {
    try {
        const response = await apiClient.post('/pttt/add', ptttData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi tạo mã phương thức thanh toán]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

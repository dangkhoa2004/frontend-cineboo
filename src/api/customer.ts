import { apiClient } from './api';
import axios from 'axios'; // Ensure Axios is imported

/* Lấy danh sách nhân viên */
export const fetchnhanviens = async (params = {}) => {
    try {
        const response = await apiClient.get('/nhanvien/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu nhân viên]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy nhân viên theo id */
export const fetchnhanvienById = async (id: string) => {
    try {
        const response = await apiClient.get(`/nhanvien/find/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu nhân viên]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Cập nhật nhân viên theo id */
export const updatenhanvienById = async (id: string, nhanvienData: any) => {
    try {
        const response = await apiClient.put(`/nhanvien/update/${id}`, nhanvienData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật nhân viên]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Xoá nhân viên theo id */
export const deletenhanvienById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/nhanvien/delete/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá nhân viên');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá nhân viên]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Tạo nhân viên mới */
export const createnhanvien = async (nhanvienData: any) => {
    try {
        const response = await apiClient.post('/nhanvien/add', nhanvienData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi tạo nhân viên]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
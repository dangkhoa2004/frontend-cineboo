import {requestWithJWT } from './api';
import axios from 'axios'; // Ensure Axios is imported

/* Lấy danh sách khách hàng */
export const fetchkhachhangs = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/khachhang/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy khách hàng theo id */
export const fetchkhachhangById = async (id: string) => {
    try {
        const response = await requestWithJWT('get',`/khachhang/find/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Cập nhật khách hàng theo id */
export const updatekhachhangById = async (id: string, khachhangData: any) => {
    try {
        const response = await requestWithJWT('put',`/khachhang/update/${id}`, khachhangData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Xoá khách hàng theo id */
export const deletekhachhangById = async (id: string) => {
    try {
        const response = await requestWithJWT('put',`/khachhang/disable/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá khách hàng');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Tạo khách hàng mới */
export const createkhachhang = async (khachhangData: any) => {
    try {
        const response = await requestWithJWT('post','/khachhang/add', khachhangData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi tạo khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

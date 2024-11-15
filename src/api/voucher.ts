import { apiClient } from './api';
import axios from 'axios'; // Ensure Axios is imported

/* Lấy danh sách mã giảm giá */
export const fetchVouchers = async (params = {}) => {
    try {
        const response = await apiClient.get('/voucher/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu mã giảm giá]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy mã giảm giá theo id */
export const fetchVoucherById = async (id: string) => {
    try {
        const response = await apiClient.get(`/voucher/find/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu mã giảm giá]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Cập nhật mã giảm giá theo id */
export const updateVoucherById = async (id: string, VoucherData: any) => {
    try {
        const response = await apiClient.put(`/voucher/update/${id}`, VoucherData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật mã giảm giá]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Xoá mã giảm giá theo id */
export const deleteVoucherById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/voucher/delete/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá mã giảm giá');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá mã giảm giá]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Tạo mã giảm giá mới */
export const createVoucher = async (VoucherData: any) => {
    try {
        const response = await apiClient.post('/voucher/add', VoucherData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi tạo mã giảm giá]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

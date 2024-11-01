import { apiClient } from './api';
import axios from 'axios'; // Ensure Axios is imported

export const fetchInvoices = async () => {
    try {
        const dataToSend = { /* dữ liệu cần gửi */ };
        const response = await apiClient.post('api/Invoice/list', dataToSend);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

export const fetchInvoiceById = async (id: string) => {
    try {
        const dataToSend = { id };
        const response = await apiClient.post(`api/Invoice/${id}`, dataToSend);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xử lý dữ liệu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
import { apiClient } from './api.ts';
import axios from 'axios'; // Đảm bảo import axios

export const fetchInvoices = async () => {
    try {
        const dataToSend = { /* dữ liệu cần gửi */ };
        const response = await apiClient.post('api/Invoice/list', { data: dataToSend });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error);
        throw error;
    }
};

export const fetchInvoiceById = async (id: string) => {
    try {
        const dataToSend = { id }; // Ví dụ gửi ID
        const response = await apiClient.post(`api/Invoice/${id}`, { data: dataToSend });
        return response.data;
    } catch (error) {
        console.error('API [Lỗi khi xử lý dữ liệu]:', error);
        throw error;
    }
};

export const fetchInvoiceNow = async () => {
    try {
        const response = await apiClient.get(`api/Invoice/now`);
        return response.data;
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error);
        throw error;
    }
};

export const fetchInvoiceFuture = async () => {
    try {
        const response = await apiClient.get(`api/Invoice/future`);
        return response.data;
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error);
        throw error;
    }
};

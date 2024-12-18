import { apiClient, requestWithJWT } from './api';

/* Lấy danh sách mã giảm giá */
export const fetchHoanVe = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/hoanve/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu mã giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy hoanve theo id */
export const fetchRefundById = async (id: string) => {
    try {
        const response = await requestWithJWT('get',`/hoanve/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
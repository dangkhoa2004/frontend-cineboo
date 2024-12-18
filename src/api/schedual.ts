import { apiClient,requestWithJWT } from './api';

/* Lấy danh sách mã giảm giá */
export const fetchPTTT = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/suatchieu/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu mã giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy hoanve theo id */
export const fetchSuatChieuById = async (id: string) => {
    try {
        const response = await requestWithJWT('get',`/suatchieu/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
export const updateSuatChieuById = async (id: string, movieData: any) => {
    try {
        const response = await requestWithJWT('put',`/suatchieu/update/${id}`, movieData);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu độ tuôi]', error instanceof Error ? error.message : error);
        throw error;
    }
};
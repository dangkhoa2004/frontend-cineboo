import { apiClient } from './api';
import axios from 'axios'; // Đảm bảo Axios được nhập khẩu

/**
 * Lấy danh sách khách hàng.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách khách hàng.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu khách hàng.
 */
export const fetchkhachhangs = async (params = {}) => {
    try {
        const response = await apiClient.get('/khachhang/get', { params });
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

/**
 * Lấy thông tin khách hàng theo id.
 * @param {string} id - Id của khách hàng cần lấy thông tin.
 * @returns {Promise<any>} Dữ liệu thông tin khách hàng.
 * @throws {Error} Nếu có lỗi khi lấy thông tin khách hàng.
 */
export const fetchkhachhangById = async (id: string) => {
    try {
        const response = await apiClient.get(`/khachhang/find/${id}`);
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

/**
 * Cập nhật thông tin khách hàng theo id.
 * @param {string} id - Id của khách hàng cần cập nhật.
 * @param {Object} khachhangData - Dữ liệu khách hàng cần cập nhật.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi cập nhật.
 * @throws {Error} Nếu có lỗi khi cập nhật thông tin khách hàng.
 */
export const updatekhachhangById = async (id: string, khachhangData: any) => {
    try {
        const response = await apiClient.put(`/khachhang/update/${id}`, khachhangData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý tại component
    }
};

/**
 * Xoá khách hàng theo id.
 * @param {string} id - Id của khách hàng cần xoá.
 * @returns {Promise<void>} Không có dữ liệu trả về.
 * @throws {Error} Nếu có lỗi khi xoá khách hàng.
 */
export const deletekhachhangById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/khachhang/delete/${id}`);
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

/**
 * Tạo khách hàng mới.
 * @param {Object} khachhangData - Dữ liệu khách hàng cần tạo.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi tạo khách hàng.
 * @throws {Error} Nếu có lỗi khi tạo khách hàng mới.
 */
export const createkhachhang = async (khachhangData: any) => {
    try {
        const response = await apiClient.post('/khachhang/add', khachhangData);
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

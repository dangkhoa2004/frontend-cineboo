import { apiClient } from './api';
import axios from 'axios'; // Đảm bảo Axios được nhập khẩu

/**
 * Lấy danh sách nhân viên.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách nhân viên.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu nhân viên.
 */
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

/**
 * Lấy thông tin nhân viên theo id.
 * @param {string} id - Id của nhân viên cần lấy thông tin.
 * @returns {Promise<any>} Dữ liệu thông tin nhân viên.
 * @throws {Error} Nếu có lỗi khi lấy thông tin nhân viên.
 */
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

/**
 * Cập nhật thông tin nhân viên theo id.
 * @param {string} id - Id của nhân viên cần cập nhật.
 * @param {Object} nhanvienData - Dữ liệu nhân viên cần cập nhật.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi cập nhật.
 * @throws {Error} Nếu có lỗi khi cập nhật thông tin nhân viên.
 */
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
        throw error; // Ném lại lỗi để xử lý tại component
    }
};

/**
 * Xoá nhân viên theo id.
 * @param {string} id - Id của nhân viên cần xoá.
 * @returns {Promise<void>} Không có dữ liệu trả về.
 * @throws {Error} Nếu có lỗi khi xoá nhân viên.
 */
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

/**
 * Tạo nhân viên mới.
 * @param {Object} nhanvienData - Dữ liệu nhân viên cần tạo.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi tạo nhân viên.
 * @throws {Error} Nếu có lỗi khi tạo nhân viên mới.
 */
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

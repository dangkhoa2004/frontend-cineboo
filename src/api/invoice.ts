import { apiClient, requestWithJWT } from './api';
import axios from 'axios';

/**
 * Lấy danh sách hoá đơn.
 * @param {Object} params - Tham số truy vấn để lấy danh sách hoá đơn.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const fetchInvoices = async (params: Record<string, any> = {}) => {
    try {
        const response = await apiClient.get('/hoadon/get', { params });
        return response?.data;
    } catch (error) {
        handleApiError('lấy danh sách hoá đơn', error);
    }
};

/**
 * Lấy danh sách hoàn vé.
 * @param {Object} params - Tham số truy vấn để lấy danh sách hoàn vé.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const fetchRefunds = async (params: Record<string, any> = {}) => {
    try {
        const response = await apiClient.get('/hoanve/get', { params });
        return response?.data;
    } catch (error) {
        handleApiError('lấy danh sách hoàn vé', error);
    }
};

/**
 * Lấy danh sách phương thức thanh toán.
 * @param {Object} params - Tham số truy vấn để lấy danh sách phương thức thanh toán.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const fetchPaymentMethods = async (params: Record<string, any> = {}) => {
    try {
        const response = await apiClient.get('/pttt/get', { params });
        return response?.data;
    } catch (error) {
        handleApiError('lấy danh sách phương thức thanh toán', error);
    }
};

/**
 * Xóa phương thức thanh toán theo ID.
 * @param {string} id - ID của phương thức thanh toán cần xóa.
 */
export const deletePaymentMethodById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/khachhang/delete/${id}`);
        if (!response || response.status !== 200) {
            throw new Error('Không thể xoá phương thức thanh toán');
        }
    } catch (error) {
        handleApiError('xóa phương thức thanh toán', error);
    }
};

/**
 * Lấy hoá đơn theo ID.
 * @param {string} id - ID của hoá đơn.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const fetchInvoiceById = async (id: string) => {
    try {
        const response = await apiClient.get(`/hoadon/find/${id}`);
        return response?.data;
    } catch (error) {
        handleApiError('lấy hoá đơn theo ID', error);
    }
};

/**
 * Cập nhật hoá đơn theo ID.
 * @param {string} id - ID của hoá đơn.
 * @param {Object} invoiceData - Dữ liệu cần cập nhật cho hoá đơn.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const updateInvoiceById = async (id: string, invoiceData: Record<string, any>) => {
    try {
        const response = await apiClient.put(`/hoadon/update/${id}`, invoiceData);
        return response?.data;
    } catch (error) {
        handleApiError('cập nhật hoá đơn theo ID', error);
    }
};

/**
 * Xóa hoá đơn theo ID.
 * @param {string} id - ID của hoá đơn.
 */
export const deleteInvoiceById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/hoadon/delete/${id}`);
        if (!response || response.status !== 200) {
            throw new Error('Không thể xoá hoá đơn');
        }
    } catch (error) {
        handleApiError('xóa hoá đơn theo ID', error);
    }
};

/**
 * Tạo mới hoá đơn.
 * @param {Object} invoiceData - Dữ liệu của hoá đơn mới.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const createInvoice = async (invoiceData: Record<string, any>) => {
    try {
        const response = await requestWithJWT('post', '/hoadon/add', invoiceData);
        return response?.data;
    } catch (error) {
        handleApiError('tạo hoá đơn mới', error);
    }
};

/**
 * Tạo mã QR để thanh toán.
 * @param {string} id - ID của hoá đơn.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const createInvoiceQr = async (id: string) => {
    try {
        const response = await apiClient.get(`/payos/create-payment-link/url/${id}`);
        return response?.data;
    } catch (error) {
        handleApiError('tạo mã QR hoá đơn', error);
    }
};

/**
 * Đặt phương thức thanh toán cho hoá đơn.
 * @param {string} invoiceId - ID của hoá đơn.
 * @param {string} paymentMethodId - ID của phương thức thanh toán.
 * @returns {Promise<Object>} Dữ liệu phản hồi.
 */
export const setPaymentMethod = async (invoiceId: string, paymentMethodId: string) => {
    try {
        const response = await requestWithJWT('put', `/hoadon/hoaDon/${invoiceId}/setPTTT/${paymentMethodId}`, {});
        return response?.data;
    } catch (error) {
        handleApiError('đặt phương thức thanh toán', error);
    }
};

/**
 * Xử lý lỗi API.
 * @param {string} action - Mô tả hành động đang thực hiện.
 * @param {unknown} error - Đối tượng lỗi.
 */
const handleApiError = (action: string, error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error(`API: [Lỗi ${action}]`, error.response ? error.response.data : error.message);
    } else if (error instanceof Error) {
        console.error(`API: [Lỗi không xác định khi ${action}]`, error.message);
    } else {
        console.error(`API: [Lỗi không xác định khi ${action}]`, error);
    }
    throw error;
};
/**
 * Lấy danh sách mã giảm giá.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách mã giảm giá.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu mã giảm giá.
 */
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

/**
 * Xoá mã giảm giá theo id.
 * @param {string} id - Id của mã giảm giá cần xoá.
 * @returns {Promise<void>} Không có dữ liệu trả về.
 * @throws {Error} Nếu có lỗi khi xoá mã giảm giá.
 */
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
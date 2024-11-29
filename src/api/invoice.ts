import { apiClient,requestWithJWT } from './api';
import axios from 'axios'; // Ensure Axios is imported

/* Lấy danh sách hoá đơn */
export const fetchInvoices = async (params = {}) => {
    try {
        const response = await apiClient.get('/hoadon/get', { params });
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

/* Lấy hoá đơn theo id */
export const fetchInvoiceById = async (id: string) => {
    try {
        const response = await apiClient.get(`/hoadon/find/${id}`);
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

/* Cập nhật hoá đơn theo id */
export const updateInvoiceById = async (id: string, invoiceData: any) => {
    try {
        const response = await apiClient.put(`/hoadon/update/${id}`, invoiceData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật hoá đơn]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Xoá hoá đơn theo id */
export const deleteInvoiceById = async (id: string) => {
    try {
        const response = await apiClient.delete(`/hoadon/delete/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá hoá đơn');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá hoá đơn]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Tạo hoá đơn mới */
export const createInvoice = async (invoiceData: any) => {
    try {
        const response = await requestWithJWT('post','/hoadon/add', invoiceData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi tạo hoá đơn]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* create-payment-link */
// export const createInvoiceQr = async (id: string) => {
//     try {
//         const response = await apiClient.get(`/payos/create-payment-link/url/${id}`);
//         if (!response.status) {
//             throw new Error('Không thể khởi tạo trang thanh toán');
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('API: [Lỗi khi xoá hoá đơn]', error.response ? error.response.data : error.message);
//         } else {
//             console.error('API: [Lỗi không xác định]', error);
//         }
//         throw error;
//     }
// };
// /* Lấy hoá đơn theo id */
export const createInvoiceQr = async (id: string) => {
    try {
        const response = await apiClient.get(`/payos/create-payment-link/url/${id}`);
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
/* Tạo hoá đơn mới */
export const setPaymentMethod = async (invoiceId:any ,paymentMethodId:any) => {
    try {
        const response = await requestWithJWT('put','/hoadon/hoaDon/'+invoiceId+"/setPTTT/"+paymentMethodId, {});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi đặt PTTT]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
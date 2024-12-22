import { requestWithJWT } from './api';

/* Lấy danh sách hoá đơn */
export const fetchInvoices = async (params = {}) => {
    try {
        const response = await requestWithJWT('get', '/hoadon/get', {
            params, headers: {
                'Authorization': `Bearer`,
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy danh sách hoá đơn theo id khách hàng*/
export const fetchInvoicesByUserID = async (id: string) => {
    try {
        const response = await requestWithJWT('get', `/hoadon/find/ID_KhachHang/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Lấy danh sách khách hàng */
export const fetchRefunds = async (params = {}) => {
    try {
        const response = await requestWithJWT('get', '/hoanve/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu khách hàng]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Lấy danh sách hoá đơn */
export const fetchPaymentMethods = async (params = {}) => {
    try {
        const response = await requestWithJWT('get', '/pttt/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Xoá khách hàng theo id */
export const deletePaymentMethodById = async (id: string) => {
    try {
        const response = await requestWithJWT('put', `/khachhang/disable/${id}`);
        if (response && !response.status) {
            throw new Error('Không thể xoá khách hàng');
        }
    } catch (error) {
        console.error('API: [Lỗi khi xoá khách hàng]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Lấy danh sách hoá đơn */
export const updateInvoice = async (params = {}) => {
    try {
        const response = await requestWithJWT('get', '/hoadon/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Lấy hoá đơn theo id */
export const fetchInvoiceById = async (id: string) => {
    try {
        const response = await requestWithJWT('get', `/hoadon/find/${id}`);

        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Cập nhật hoá đơn theo id */
export const updateInvoiceById = async (id: string, invoiceData: any) => {
    try {
        const response = await requestWithJWT('put', `/hoadon/update/${id}`, invoiceData);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi cập nhật hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Xoá hoá đơn theo id */
export const deleteInvoiceById = async (id: string) => {
    try {
        const response = await requestWithJWT('put', `/hoadon/disable/${id}`);
        if (response && !response.status) {
            throw new Error('Không thể xoá hoá đơn');
        }
    } catch (error) {
        console.error('API: [Lỗi khi xoá hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Tạo hoá đơn mới */
export const createInvoice = async (invoiceData: any) => {
    try {
        const response = await requestWithJWT('post', '/hoadon/add', invoiceData);
        // Ensure response is defined and response.data exists
        if (!response || !response.data) {
            throw new Error('Không thể tạo hoá đơn, không có dữ liệu trả về');
        }
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi tạo hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};


/* Tạo hoá đơn mới có qr */
export const createInvoiceQr = async (id: string) => {
    try {
        const response = await requestWithJWT('get', `/payos/create-payment-link/url/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Tạo hoá đơn mới với thanh toán */
export const setPaymentMethod = async (invoiceId: any, paymentMethodId: any) => {
    try {
        const response = await requestWithJWT('put', `/hoadon/hoaDon/${invoiceId}/setPTTT/${paymentMethodId}`, {});

        // Check if response is defined and if response.data exists
        if (!response || !response.data) {
            throw new Error('Không thể xử lý dữ liệu khi đặt PTTT');
        }

        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi đặt PTTT]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Lấy danh sách mã giảm giá */
export const fetchVouchers = async (params = {}) => {
    try {
        const response = await requestWithJWT('get', '/voucher/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu mã giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy voucher theo id */
export const fetchVoucherById = async (id: string) => {
    try {
        const response = await requestWithJWT('get', `/voucher/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu voucher]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Cập nhật voucher theo id */
export const updateVoucherById = async (id: string, voucherData: any) => {
    try {
        const response = await requestWithJWT('put', `/voucher/update/${id}`, voucherData);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi cập nhật voucher]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Xoá mã giảm giá theo id */
export const deleteVoucherById = async (id: string) => {
    try {
        const response = await requestWithJWT('put', `/voucher/disable/${id}`);
        if (response && !response.status) {
            throw new Error('Không thể xoá mã giảm giá');
        }
    } catch (error) {
        console.error('API: [Lỗi khi xoá mã giảm giá]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy hoá đơn theo id */
export const fetchInvoiceByMaHoaDon = async (maHoaDon: string) => {
    try {
        const response = await requestWithJWT('get', `/hoadon/find/MaHoaDon/${maHoaDon}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Gửi yêu cầu in vé */
export const requestInvoicePrint = async (maHoaDon: string) => {
    try {
        const response = await requestWithJWT('put', `/hoadon/print/thermal/bytes/${maHoaDon}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu yêu cầu in vé]', error instanceof Error ? error.message : error);
        throw error;
    }
};

/* Tạo hoá đơn mới có qr */
export const createVoucher = async (voucherData: any) => {
    try {
        const response = await requestWithJWT('post', `/voucher/add`, voucherData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi thêm voucher]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
/* Thay đổi trạng thái hoá đơn */
export const changeInvoiceStatus = async (id_hoadon: string, trangthai: string) => {
    try {
        // Gửi yêu cầu PUT với URL được định dạng đúng
        const response = await requestWithJWT('put', `/hoadon/status/${id_hoadon}?trangThai=${trangthai}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi thay đổi trạng thái hoá đơn]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Duyệt ID thông qua PayOS */
export const approvePayment = async (orderId: string) => {
    try {
        const response = await requestWithJWT('get', `/payos/get/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu voucher]', error instanceof Error ? error.message : error);
        throw error;
    }
};

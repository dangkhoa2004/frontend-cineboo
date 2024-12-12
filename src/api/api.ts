import axios, { Method } from 'axios';

/**
 * Tạo một client Axios với baseURL và timeout.
 */
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Cập nhật nếu backend dùng địa chỉ hoặc cổng khác
    timeout: 1000000, // Thời gian chờ là 1000 giây để tiện debug
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor cho request, không tự động thêm Authorization.
 */
apiClient.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Interceptor cho response để xử lý lỗi.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Timeout Error: Kết nối vượt quá thời gian cho phép.');
        } else if (error.message === 'Network Error') {
            console.error('Network Error: Không thể kết nối với server.');
        } else {
            console.error('Error:', error);
        }
        return Promise.reject(error);
    }
);

/**
 * Thực hiện request với JWT.
 * @param {Method} method - Phương thức HTTP (GET, POST, PUT, DELETE, ...).
 * @param {string} url - URL của API endpoint.
 * @param {Object} [data={}] - Dữ liệu gửi kèm request.
 * @returns {Promise<AxiosResponse>} Phản hồi từ API.
 */
const requestWithJWT = (method: Method, url: string, data: any = {}) => {
    let token = sessionStorage.getItem('token');
    if (token) {
        token = token.slice(1, -1); // Loại bỏ ký tự thừa nếu có
    } else {
        console.error('JWT Token không tồn tại. Hủy yêu cầu.');
        return Promise.reject(new Error('JWT Token không tồn tại.'));
    }

    return apiClient({
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export { apiClient, requestWithJWT };

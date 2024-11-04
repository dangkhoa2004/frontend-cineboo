import axios, { Method } from 'axios';

// Tạo một client Axios với baseURL và timeout
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',  // Cập nhật nếu backend dùng địa chỉ hoặc cổng khác
    timeout: 10000,  // Thời gian chờ là 10 giây
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request, không tự động thêm Authorization
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    }
);

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

// Hàm thực hiện request có gắn token khi cần
const requestWithAuth = (method: Method, url: string, data: any = {}) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return apiClient({
        method,
        url,
        data,
        headers: { ...headers },
    });
};

export { apiClient, requestWithAuth };

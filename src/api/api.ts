import axios from 'axios';

// Tạo một client Axios với baseURL và timeout
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',  // Cập nhật nếu backend dùng địa chỉ hoặc cổng khác
    timeout: 10000,  // Thời gian chờ là 10 giây
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request để gắn token vào headers nếu có
// apiClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         console.error('Interceptor Error:', error);
//         return Promise.reject(error);
//     }
// );

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


export { apiClient };

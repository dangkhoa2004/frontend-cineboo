import axios from 'axios';
import { apiClient } from './api';

/* Lấy danh sách phim */
export const fetchMovies = async (params = {}) => {
    try {
        const response = await apiClient.get('/phim/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
/* Cập nhật thông tin phim theo id */
export const updateMovieById = async (id: string, movieData: any) => {
    try {
        const response = await apiClient.put(`/phim/update/${id}`, movieData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở component
    }
};

/* Lấy phim theo id */
export const fetchMovieById = async (id: string) => {
    try {
        const response = await apiClient.get(`/phim/find/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xử lý dữ liệu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
/* Lấy danh sách suất chiếu theo id phim */
export const fetchShowtimesByMovieId = async (movieId: String) => {
    try {
        const response = await apiClient.get(`/suatchieu/find/ID_Phim/${movieId}`);
        return response.data; // Dữ liệu phải chứa thông tin lịch chiếu và các ngày có lịch chiếu
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xử lý dữ liệu ghế theo lịch chiếu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
/* Lấy danh sách ghế dựa theo suất chiếu */
export const fetchSeatByShowTime = async (suatchieuId: String) => {
    try {
        const response = await apiClient.get(`/ghe/find/ID_SuatChieu/${suatchieuId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xử lý dữ liệu lịch chiếu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy danh sách phim đang chiếu */
export const fetchMovieNow = async () => {
    try {
        const response = await apiClient.get('/api/movie/now');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/* Lấy danh sách phim sắp chiếu */
export const fetchMovieFuture = async () => {
    try {
        const response = await apiClient.get('/api/movie/future');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};
/* Cập nhập trạng thái phim */
export async function deleteMovieById(movieId: string) {
    try {
        const response = await apiClient.put(`/phim/disable/${movieId}`);
        if (!response.status) {
            throw new Error('Không thể xoá phim');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xoá phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
}

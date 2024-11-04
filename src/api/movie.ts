import axios from 'axios';
import { apiClient } from './api';

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

export const fetchShowtimesByMovieId = async (movieId: string) => {
    try {
        const response = await apiClient.get(`/api/movie/${movieId}/showtimes`);
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

export const fetchShowtimesByMovieIdForWeek = async (movieId: string) => {
    try {
        const response = await apiClient.get(`/api/movie/${movieId}/showtimes/week`);
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

export const fetchSeatsByShowtimeId = async (showtimeId: string) => {
    try {
        const response = await apiClient.get(`/api/showtime/${showtimeId}/seats`);
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

export async function deleteMovieById(movieId: string) {
    try {
        const response = await apiClient.delete(`/movies/${movieId}`);
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

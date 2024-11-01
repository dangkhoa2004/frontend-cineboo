// api/movie.ts
import axios from 'axios';
import { Movie } from '@/type';
import { apiClient } from './api';

export const fetchMovies = async (params = {}): Promise<Movie[]> => {
    try {
        const response = await apiClient.get('/phim/get', { params });
        return response.data; // Trả về dữ liệu
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
};


export const fetchMovieById = async (id: string) => {
    try {
        const dataToSend = { id }; // Ví dụ gửi ID
        const response = await apiClient.post(`api/movie/${id}`, { data: dataToSend });
        return response.data;
    } catch (error) {
        console.error('API [Lỗi khi xử lý dữ liệu]:', error);
        throw error;
    }
};

// Hàm để lấy lịch chiếu phim theo ID phim
export const fetchShowtimesByMovieId = async (movieId: string) => {
    const response = await apiClient.get(`api/movie/${movieId}/showtimes`);
    return response.data;
};

// Hàm để lấy lịch chiếu phim theo ID phim cho nhiều ngày
export const fetchShowtimesByMovieIdForWeek = async (movieId: string) => {
    const response = await apiClient.get(`api/movie/${movieId}/showtimes/week`);
    return response.data; // Giả sử API trả về dữ liệu cho nhiều ngày
};

// Hàm để lấy danh sách ghế theo ID suất chiếu
export const fetchSeatsByShowtimeId = async (showtimeId: string) => {
    const response = await apiClient.get(`api/showtime/${showtimeId}/seats`);
    return response.data; // Giả sử API trả về dữ liệu ghế
};

export const fetchMovieNow = async () => {
    try {
        const response = await apiClient.get(`api/movie/now`);
        return response.data;
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error);
        throw error;
    }
};

export const fetchMovieFuture = async () => {
    try {
        const response = await apiClient.get(`api/movie/future`);
        return response.data;
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error);
        throw error;
    }
};

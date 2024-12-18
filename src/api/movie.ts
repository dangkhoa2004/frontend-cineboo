import axios from 'axios';
import { apiClient,requestWithJWT } from './api';

/**
 * Lấy danh sách phim.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách phim.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu phim.
 */
export const fetchMovies = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/phim/get', { params });
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

/**
 * Lấy danh sách phòng chiếu.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách phòng chiếu.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu phòng chiếu.
 */
export const fetchPhongChieu = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/phongchieu/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu phòng chiếu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Lấy danh sách suất chiếu.
 * @param {Object} params - Tham số lọc hoặc phân trang (nếu có).
 * @returns {Promise<any>} Dữ liệu danh sách suất chiếu.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu suất chiếu.
 */
export const fetchSuatChieu = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/suatchieu/get', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xử lý dữ liệu suất chiếu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Thêm phim mới vào hệ thống.
 * @param {Object} movieData - Dữ liệu phim cần thêm.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi thêm phim.
 * @throws {Error} Nếu có lỗi khi thêm phim.
 */
export const createMovie = async (movieData: any) => {
    try {
        const response = await requestWithJWT('post',`/phim/add`, movieData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi thêm phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Cập nhật thông tin phim theo id.
 * @param {string} id - Id của phim cần cập nhật.
 * @param {Object} movieData - Dữ liệu phim cần cập nhật.
 * @returns {Promise<any>} Dữ liệu phản hồi sau khi cập nhật.
 * @throws {Error} Nếu có lỗi khi cập nhật phim.
 */
export const updateMovieById = async (id: string, movieData: any) => {
    try {
        const response = await requestWithJWT('put',`/phim/update/${id}`, movieData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi cập nhật phim]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Lấy phim theo id.
 * @param {string} id - Id của phim cần lấy.
 * @returns {Promise<any>} Dữ liệu thông tin phim.
 * @throws {Error} Nếu có lỗi khi lấy phim theo id.
 */
export const fetchMovieById = async (id: string) => {
    try {
        const response = await requestWithJWT('get',`/phim/find/${id}`);
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

/**
 * Lấy danh sách suất chiếu theo id phim.
 * @param {string} movieId - Id của phim cần lấy danh sách suất chiếu.
 * @returns {Promise<any>} Dữ liệu danh sách suất chiếu.
 * @throws {Error} Nếu có lỗi khi lấy danh sách suất chiếu.
 */
export const fetchShowtimesByMovieId = async (movieId: string) => {
    try {
        const response = await requestWithJWT('get',`/suatchieu/find/ID_Phim/${movieId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API [Lỗi khi xử lý dữ liệu ghế theo lịch chiếu]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Lấy danh sách ghế dựa theo suất chiếu.
 * @param {string} suatchieuId - Id của suất chiếu cần lấy danh sách ghế.
 * @returns {Promise<any>} Dữ liệu danh sách ghế.
 * @throws {Error} Nếu có lỗi khi lấy danh sách ghế.
 */
export const fetchSeatByShowTime = async (suatchieuId: string) => {
    try {
        const response = await requestWithJWT('get',`/ghe/find/ID_SuatChieu/${suatchieuId}`);
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

/**
 * Lấy danh sách phim đang chiếu.
 * @returns {Promise<any>} Dữ liệu danh sách phim đang chiếu.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu phim đang chiếu.
 */
export const fetchMovieNow = async () => {
    try {
        const response = await requestWithJWT('get','/api/movie/now');
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

/**
 * Lấy danh sách phim sắp chiếu.
 * @returns {Promise<any>} Dữ liệu danh sách phim sắp chiếu.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu phim sắp chiếu.
 */
export const fetchMovieFuture = async () => {
    try {
        const response = await requestWithJWT('get','/api/movie/future');
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

/**
 * Lấy danh sách độ tuổi cho phim.
 * @returns {Promise<any>} Dữ liệu danh sách độ tuổi.
 * @throws {Error} Nếu có lỗi khi lấy dữ liệu độ tuổi.
 */
export const fetchAgeGroups = async () => {
    try {
        const response = await requestWithJWT('get','/dotuoi/get');
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

/**
 * Xóa khách hàng theo id.
 * @param {string} id - Id của khách hàng cần xóa.
 * @returns {Promise<void>} Không có dữ liệu trả về.
 * @throws {Error} Nếu có lỗi khi xóa khách hàng.
 */
export const deleteAgeGroupById = async (id: string) => {
    try {
        const response = await requestWithJWT('delete',`/dotuoi/disable/${id}`);
        if (!response.status) {
            throw new Error('Không thể xoá khách hàng');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API: [Lỗi khi xoá khách hàng]', error.response ? error.response.data : error.message);
        } else {
            console.error('API: [Lỗi không xác định]', error);
        }
        throw error;
    }
};

/**
 * Cập nhật trạng thái phim.
 * @param {string} movieId - Id của phim cần cập nhật trạng thái.
 * @returns {Promise<void>} Không có dữ liệu trả về.
 * @throws {Error} Nếu có lỗi khi cập nhật trạng thái phim.
 */
export async function deleteMovieById(movieId: string) {
    try {
        const response = await requestWithJWT('put',`/phim/disable/${movieId}`);
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

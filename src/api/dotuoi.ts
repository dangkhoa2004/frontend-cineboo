import { apiClient, requestWithJWT} from './api';

/* Lấy danh sách độ tuôi */
export const fetchDoTuoi = async (params = {}) => {
    try {
        const response = await requestWithJWT('get','/dotuoi/get', { params });
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu độ tuôi]', error instanceof Error ? error.message : error);
        throw error;
    }
};
/* Lấy hoanve theo id */
export const fetchDoTuoiById = async (id: string) => {
    try {
        const response = await requestWithJWT('get',`/dotuoi/find/${id}`);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu độ tuôi]', error instanceof Error ? error.message : error);
        throw error;
    }
};
export const updateDoTuoiById = async (id: string, movieData: any) => {
    try {
        const response = await requestWithJWT('put',`/dotuoi/update/${id}`, movieData);
        return response.data;
    } catch (error) {
        console.error('API: [Lỗi khi xử lý dữ liệu độ tuôi]', error instanceof Error ? error.message : error);
        throw error;
    }
};
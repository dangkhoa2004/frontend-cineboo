// authService.ts
import { apiClient } from './api'; // Correct import statement

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

interface LoginResponse {
    token: string;
    role: string;
}

export const fetchProfile = async (): Promise<any> => {
    try {
        const response = await apiClient.get('/api/user/profile'); // Use apiClient for profile fetch
        return response.data;
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác tìm nạp:', error);
        throw error;
    }
};

export const authService = {
    login(username: string, password: string): Promise<LoginResponse> {
        if (!username || !password) {
            return Promise.reject('Vui lòng điền vào cả hai trường.');
        }
        return apiClient.post<LoginResponse>('/api/user/login', { username, password })
            .then(response => {
                const { token, role } = response.data;
                localStorage.setItem(TOKEN_KEY, token);
                localStorage.setItem(USER_INFO_KEY, JSON.stringify({ role }));
                // Set CSRF token if available
                const csrfToken = document.querySelector('meta[name="csrf-token"]');
                if (csrfToken) {
                    apiClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.getAttribute('content') || '';
                }
                return response.data;
            });
    },
};

// Other utility functions
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function storageLocal(): Storage {
    return window.localStorage;
}

export function logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
}

export function isLoggedIn(): boolean {
    const token = getToken();
    return token !== null;
}

export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token;
}

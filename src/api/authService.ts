// api/authService.ts
import axios from "axios";

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

// Hàm sessionStorageUtil để làm việc với sessionStorage
function sessionStorageUtil() {
    return {
        getItem: (key: string) => {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null; // Trả về null nếu không có
        },
        setItem: (key: string, value: any) => {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key: string) => {
            sessionStorage.removeItem(key);
        },
        clear: () => {
            sessionStorage.clear();
        }
    };
}

// Lưu token và thông tin người dùng
export async function login(username: string, password: string) {
    try {
        const response = await axios.post("http://localhost:8080/api/user/login", {
            username,
            password,
        });
        if (response.status === 200) {
            const data = response.data;
            setToken(data.token);
            if (data.hasOwnProperty("khachHang")) {
                setUserInfo(data.khachHang); // Lưu thông tin khách hàng
            } else {
                setUserInfo(data.nhanVien); // Lưu thông tin nhân viên nếu có
            }
            console.log("Đăng nhập thành công:", data);
            return data;
        } else {
            throw new Error("Đăng nhập thất bại");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
}


export function setUserInfo(userInfo: any): void {
    sessionStorageUtil().setItem(USER_INFO_KEY, userInfo);
}

export function setToken(token: string): void {
    sessionStorageUtil().setItem(TOKEN_KEY, token);
}

export function logout(): void {
    sessionStorageUtil().removeItem(TOKEN_KEY);
    sessionStorageUtil().removeItem(USER_INFO_KEY);
}

// Kiểm tra xem người dùng đã đăng nhập chưa
export function isLoggedIn(): boolean {
    const token = sessionStorageUtil().getItem(TOKEN_KEY);
    return token !== null; // Nếu có token thì người dùng đã đăng nhập
}

// Lấy thông tin người dùng từ sessionStorage
export function getUserInfo(): any | null {
    return sessionStorageUtil().getItem(USER_INFO_KEY); // Trả về thông tin người dùng hoặc null nếu không có
}

// Kiểm tra xem token đã được lưu chưa
export function hasToken(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null; // Trả về true nếu token đã được lưu
}

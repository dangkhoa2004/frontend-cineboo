// api/authService.ts
import axios from "axios";

// Hàm sessionStorageUtil để làm việc với sessionStorage
function sessionStorageUtil() {
    return {
        getItem: (key: string): any => {
            const item = sessionStorage.getItem(key);
            try {
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error(`Error parsing JSON for key "${key}":`, e);
                return null;
            }
        },
        setItem: (key: string, value: any): void => {
            if (value !== undefined) {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                console.warn(`Attempted to set undefined value for key "${key}"`);
            }
        },
        removeItem: (key: string): void => {
            sessionStorage.removeItem(key);
        },
        clear: (): void => {
            sessionStorage.clear();
        }
    };
}

// API gửi yêu cầu khôi phục mật khẩu
export async function recoverPassword(email: string): Promise<any> {
    try {
        const response = await axios.put(
            `http://localhost:8080/taikhoan/recovery/send?email=${encodeURIComponent(email)}`,
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Yêu cầu khôi phục mật khẩu thành công:", response.data);
            return response.data;
        } else {
            throw new Error("Khôi phục mật khẩu thất bại");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Khôi phục mật khẩu thất bại");
    }
}
export async function resetPassword(email: string, otp: string, newPassword: string, retypePassword: string) {
    try {
        const response = await axios.put(
            "http://localhost:8080/taikhoan/recovery/reset-password",
            {
                email,
                otp,
                newPassword,
                retypePassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Đặt lại mật khẩu thành công:", response.data);
            return response.data;
        } else {
            throw new Error("Đặt lại mật khẩu thất bại");
            console.log("Đăng ký thành công:", response.data);
            return response.data;
        }
        throw new Error("Đăng ký thất bại");
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Đặt lại mật khẩu thất bại");
    }
}
// Hàm đăng ký
export async function signup(data: Record<string, any>): Promise<any> {
    try {
        const queryParams = new URLSearchParams({
            username: data.username,
            password: data.password,
        }).toString();

        const response = await axios.post(
            `http://localhost:8080/khachhang/add?${queryParams}`,
            null,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (response.status === 200) {
            console.log("Đăng ký thành công:", response.data);
            return response.data;
        }
        throw new Error("Đăng ký thất bại");
    } catch (error: any) {
        console.error("Lỗi khi đăng ký:", error);
        throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
}

// Hàm đăng nhập
export async function login(username: string, password: string): Promise<any> {
    try {
        const response = await axios.post("http://localhost:8080/api/user/login", {
            username,
            password,
        });

        if (response.status === 200) {
            const data = response.data;

            // Lưu token và thông tin người dùng vào sessionStorage
            setToken(data.token);
            setUserInfo(data.khachHang || data.nhanVien);

            console.log("Đăng nhập thành công:", data);
            return data;
        }
        throw new Error("Đăng nhập thất bại");
    } catch (error: any) {
        console.error("Lỗi khi đăng nhập:", error);
        throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
}

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

export function setUserInfo(userInfo: any): void {
    sessionStorageUtil().setItem(USER_INFO_KEY, userInfo);
}

export function setToken(token: string): void {
    sessionStorageUtil().setItem(TOKEN_KEY, token);
}

export function logout(): void {
    sessionStorageUtil().removeItem(TOKEN_KEY);
    sessionStorageUtil().removeItem(USER_INFO_KEY);
    localStorage.clear();
    sessionStorage.clear();
}

export function isLoggedIn(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null;
}

export function getUserInfo(): any | null {
    return sessionStorageUtil().getItem(USER_INFO_KEY);
}

export function hasToken(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null;
}

export function getUserRole(): string | null {
    const userInfo = getUserInfo();
    return userInfo?.role || null;
}

export function canAccessModule(moduleName: string): boolean {
    const role = getUserRole();
    const permissions: Record<string, string[]> = {
        khachHang: ["ungDung", "thongTin"],
        nhanVien: [
            "ungDung", "thongTin", "hoaDon", "phims", "vouchers", "tinNhan",
            "thongTinKhachHang", "thongTinNhanVien", "phuongThucThanhToan"
        ],
    };
    return role ? permissions[role]?.includes(moduleName) || false : false;
}

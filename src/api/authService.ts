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

// API đặt lại mật khẩu
export async function resetPassword(email: string, otp: string, newPassword: string, retypePassword: string): Promise<any> {
    try {
        const response = await axios.put(
            "http://localhost:8080/taikhoan/recovery/reset-password",
            { email, otp, newPassword, retypePassword },
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
        }
        throw new Error("Đặt lại mật khẩu thất bại");
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
            data, // Truyền dữ liệu JSON vào đây thay vì null
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
            'Authorization': `Bearer`,
            username,
            password,
        });

        if (response.status === 200) {
            const data = response.data;

            // Lưu token và thông tin tài khoản vào sessionStorage
            setToken(data.token);
            setUserInfo(data.taiKhoan); // Lưu toàn bộ thông tin tài khoản mới

            console.log("Đăng nhập thành công:", data);
            return data;
        }
        throw new Error("Đăng nhập thất bại");
    } catch (error: any) {
        console.error("Lỗi khi đăng nhập:", error);
        throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
}

// Hàm lưu thông tin tài khoản
export function setUserInfo(userInfo: any): void {
    sessionStorageUtil().setItem(USER_INFO_KEY, userInfo);
}

// Hàm lấy thông tin tài khoản
export function getUserInfo(): any | null {
    return sessionStorageUtil().getItem(USER_INFO_KEY);
}

// Hàm lưu token
export function setToken(token: string): void {
    sessionStorageUtil().setItem(TOKEN_KEY, token);
}

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";
export function logout(): void {
    sessionStorageUtil().removeItem(TOKEN_KEY);
    sessionStorageUtil().removeItem(USER_INFO_KEY);
    localStorage.clear();
    sessionStorage.clear();
}

export function isLoggedIn(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null;
}

export function hasToken(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null;
}

// Hàm lấy dữ liệu người dùng qua API
export async function getUserData(): Promise<any> {
    try {
        const userInfo = getUserInfo();
        if (!userInfo || !userInfo.id) {
            throw new Error("Không tìm thấy thông tin tài khoản hoặc ID không hợp lệ.");
        }

        const response = await axios.get(
            `http://localhost:8080/taikhoan/find/${userInfo.id}`,
            {
                headers: {
                    'Authorization': `Bearer`,
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Không thể lấy dữ liệu người dùng.");
    } catch (error: any) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        throw new Error(error.response?.data?.message || "Lỗi khi lấy dữ liệu người dùng.");
    }
}
export async function canAccessModule(moduleName: string): Promise<boolean> {
    // Lấy dữ liệu người dùng
    const userData = await getUserData();  // Lấy toàn bộ dữ liệu người dùng từ API

    // Quyền truy cập cơ bản cho khách hàng và nhân viên
    const permissions: Record<string, string[]> = {
        khachHang: ["hoaDon", "ungDung", "thongTin"],
        nhanVien: [
            "ungDung", "thongTin", "hoaDon", "phims", "vouchers",
            "tinNhan", "thongTinKhachHang", "thongTinNhanVien", "phuongThucThanhToan", "thongTinNguoiDung", "baoCaoThongKe", "dotuoi", "pttt"
        ],
    };

    // Kiểm tra quyền của người dùng dựa trên sự tồn tại của khachHang hoặc nhanVien
    if (userData.khachHang) {
        // Người dùng là khách hàng
        const hasPermission = permissions.khachHang.includes(moduleName);
        return hasPermission;
    } else if (userData.nhanVien) {
        // Người dùng là nhân viên
        const hasPermission = permissions.nhanVien.includes(moduleName);
        return hasPermission;
    }
    return false;
}

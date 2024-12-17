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
// Định nghĩa interface cho các tham số truyền vào
interface SignUpData {
    username: string;
    password: string;
    ten: string;
    ho: string;
    tendem: string;
    diaChi: string;
    email: string;
    soDienThoai: string;
    ngaySinh: string;
    danToc: number;
}
// API gửi yêu cầu khôi phục mật khẩu
export async function recoverPassword(email: string) {
    try {
        const response = await axios.put(`http://localhost:8080/taikhoan/recovery/send?email=${encodeURIComponent(email)}`, null, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

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

// Hàm đăng ký với kiểu dữ liệu
export async function signup(data: SignUpData) {
    try {
        // Tạo URL với query parameters từ dữ liệu
        const queryParams = new URLSearchParams({
            username: data.username,
            password: data.password,
        }).toString();

        // Gửi request không có body vì API không yêu cầu
        const response = await axios.post(`http://localhost:8080/khachhang/add?${queryParams}`, null, {
            headers: {
                'Content-Type': 'application/json', // Có thể không cần thiết nếu không gửi body
            }
        });

        if (response.status === 200) {
            const responseData = response.data;
            console.log("Đăng ký thành công:", responseData);
            return responseData;
        } else {
            throw new Error("Đăng ký thất bại");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
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
    localStorage.clear();
    sessionStorage.clear();

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
// Kiểm tra vai trò người dùng và phân quyền truy cập module
export function getUserRole(): string | null {
    const userInfo = getUserInfo();
    return userInfo?.role || null;
}

export function canAccessModule(moduleName: string): boolean {
    const role = getUserRole() as "khachHang" | "nhanVien";
    const permissions = {
        khachHang: ["ungDung", "thongTin"],
        nhanVien: [
            "ungDung", "thongTin", "hoaDon", "phims", "vouchers", "tinNhan",
            "thongTinKhachHang", "thongTinNhanVien", "phuongThucThanhToan"
        ],
    };
    return role ? permissions[role]?.includes(moduleName) || false : false;
}
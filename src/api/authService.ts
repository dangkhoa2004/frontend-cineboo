// api/authService.ts
import axios, { AxiosError } from "axios";

// Định nghĩa các khóa lưu trữ trong sessionStorage
const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

/**
 * Hàm giúp thao tác với sessionStorage.
 * @returns {object} Các phương thức để thao tác với sessionStorage (get, set, remove, clear).
 */
function sessionStorageUtil() {
    return {
        /**
         * Lấy giá trị từ sessionStorage.
         * @param {string} key - Khóa của mục cần lấy.
         * @returns {any | null} Giá trị của mục trong sessionStorage hoặc null nếu không có.
         */
        getItem: (key: string) => {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null; // Trả về null nếu không có giá trị
        },

        /**
         * Lưu giá trị vào sessionStorage.
         * @param {string} key - Khóa để lưu giá trị.
         * @param {any} value - Giá trị cần lưu.
         */
        setItem: (key: string, value: any) => {
            sessionStorage.setItem(key, JSON.stringify(value));
        },

        /**
         * Xóa mục khỏi sessionStorage.
         * @param {string} key - Khóa của mục cần xóa.
         */
        removeItem: (key: string) => {
            sessionStorage.removeItem(key);
        },

        /**
         * Xóa tất cả dữ liệu trong sessionStorage.
         */
        clear: () => {
            sessionStorage.clear();
        }
    };
}
// Định nghĩa kiểu dữ liệu cho `data` khi đăng ký
interface SignUpData {
    username: string;
    password: string;
    ten: string;
    tenDem?: string;
    ho: string;
    ngaySinh?: string;
    soDienThoai?: string;
    gioiTinh?: number;
    email: string;
    danToc?: string;
    diaChi?: string;
}

/**
 * Hàm đăng ký người dùng.
 * @param {SignUpData} data - Dữ liệu cần gửi khi đăng ký.
 * @returns {Promise<any>} Dữ liệu phản hồi từ server nếu đăng ký thành công.
 * @throws {Error} Nếu có lỗi trong quá trình đăng ký.
 */
export async function signup(data: SignUpData) {
    try {
        // Tạo URL với query parameters từ dữ liệu người dùng (username và password)
        const queryParams = new URLSearchParams({
            username: data.username,
            password: data.password,
        }).toString();

        // Dữ liệu còn lại (ten, ho, email, ...) sẽ được gửi qua body dưới dạng JSON
        const bodyData = {
            ten: data.ten,
            tenDem: data.tenDem || '', // Nếu không có tên đệm thì có thể để trống
            ho: data.ho,
            ngaySinh: data.ngaySinh || '', // Nếu không có ngày sinh, có thể để trống hoặc gửi null
            soDienThoai: data.soDienThoai || '',
            gioiTinh: data.gioiTinh || 0,
            email: data.email,
            danToc: data.danToc || '',
            diaChi: data.diaChi || ''
        };

        // Gửi yêu cầu POST đến API với query parameters và body
        const response = await axios.post(
            `http://localhost:8080/khachhang/add?${queryParams}`,
            bodyData,
            {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo định dạng JSON
                }
            }
        );

        // Kiểm tra kết quả trả về từ API
        if (response.status === 200) {
            const responseData = response.data;
            console.log("Đăng ký thành công:", responseData);
            return responseData;
        } else {
            throw new Error("Đăng ký thất bại");
        }
    } catch (error: unknown) {
        // Kiểm tra lỗi có phải là của Axios không
        if (error instanceof AxiosError) {
            // Nếu là lỗi của axios, có thể truy cập vào error.response để lấy thông tin chi tiết
            throw new Error(error.response?.data?.message || "Đăng ký thất bại");
        } else {
            // Nếu không phải lỗi của axios, throw lỗi chung
            throw new Error("Đăng ký thất bại");
        }
    }
}


/**
 * Hàm đăng nhập người dùng và lưu token cùng thông tin người dùng.
 * @param {string} username - Tên người dùng.
 * @param {string} password - Mật khẩu người dùng.
 * @returns {Promise<any>} Dữ liệu phản hồi từ server nếu đăng nhập thành công.
 * @throws {Error} Nếu có lỗi trong quá trình đăng nhập.
 */
export async function login(username: string, password: string) {
    try {
        // Gửi yêu cầu đăng nhập với username và password
        const response = await axios.post("http://localhost:8080/api/user/login", {
            username,
            password,
        });

        // Nếu đăng nhập thành công, lưu token và thông tin người dùng
        if (response.status === 200) {
            const data = response.data;
            setToken(data.token);
            setUserInfo(data.khachHang || data.nhanVien); // Lưu thông tin khách hàng hoặc nhân viên
            console.log("Đăng nhập thành công:", data);
            return data;
        } else {
            throw new Error("Đăng nhập thất bại");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
}

/**
 * Lưu thông tin người dùng vào sessionStorage.
 * @param {any} userInfo - Thông tin người dùng.
 */
export function setUserInfo(userInfo: any): void {
    sessionStorageUtil().setItem(USER_INFO_KEY, userInfo);
}

/**
 * Lưu token vào sessionStorage.
 * @param {string} token - Token của người dùng.
 */
export function setToken(token: string): void {
    sessionStorageUtil().setItem(TOKEN_KEY, token);
}

/**
 * Đăng xuất người dùng (xóa token và thông tin người dùng).
 */
export function logout(): void {
    sessionStorageUtil().removeItem(TOKEN_KEY);
    sessionStorageUtil().removeItem(USER_INFO_KEY);
}

/**
 * Kiểm tra xem người dùng đã đăng nhập chưa (dựa trên token).
 * @returns {boolean} Trả về true nếu người dùng đã đăng nhập.
 */
export function isLoggedIn(): boolean {
    const token = sessionStorageUtil().getItem(TOKEN_KEY);
    return token !== null; // Nếu có token thì người dùng đã đăng nhập
}

/**
 * Lấy thông tin người dùng từ sessionStorage.
 * @returns {any | null} Thông tin người dùng hoặc null nếu không có.
 */
export function getUserInfo(): any | null {
    return sessionStorageUtil().getItem(USER_INFO_KEY); // Trả về thông tin người dùng hoặc null nếu không có
}

/**
 * Kiểm tra xem token có tồn tại trong sessionStorage không.
 * @returns {boolean} Trả về true nếu token đã được lưu.
 */
export function hasToken(): boolean {
    return sessionStorageUtil().getItem(TOKEN_KEY) !== null; // Trả về true nếu token đã được lưu
}

/**
 * Lấy vai trò của người dùng (khách hàng hoặc nhân viên).
 * @returns {string | null} Vai trò của người dùng (khách hàng hoặc nhân viên) hoặc null nếu không có vai trò.
 */
export function getUserRole(): string | null {
    const userInfo = getUserInfo();
    return userInfo?.role || null;
}

/**
 * Kiểm tra quyền truy cập vào một module cụ thể dựa trên vai trò người dùng.
 * @param {string} moduleName - Tên module cần kiểm tra quyền truy cập.
 * @returns {boolean} Trả về true nếu người dùng có quyền truy cập vào module.
 */
export function canAccessModule(moduleName: string): boolean {
    const role = getUserRole() as "khachHang" | "nhanVien"; // Lấy vai trò của người dùng
    const permissions = {
        khachHang: ["ungDung", "thongTin"], // Khách hàng có quyền truy cập các module này
        nhanVien: [ // Nhân viên có quyền truy cập nhiều module hơn
            "ungDung", "thongTin", "hoaDon", "phims", "vouchers", "tinNhan",
            "thongTinKhachHang", "thongTinNhanVien", "phuongThucThanhToan"
        ],
    };
    return role ? permissions[role]?.includes(moduleName) || false : false;
}

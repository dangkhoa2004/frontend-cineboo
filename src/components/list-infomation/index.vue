<template>
<div>
    <div v-if="userInfo">
        <form @submit.prevent="updateUserInfo">
            <div>
                <label>Họ:</label>
                <input type="text" v-model="userInfo.ho" />
            </div>
            <div>
                <label>Tên đệm:</label>
                <input type="text" v-model="userInfo.tenDem" />
            </div>
            <div>
                <label>Tên:</label>
                <input type="text" v-model="userInfo.ten" />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" v-model="userInfo.email" />
            </div>
            <div>
                <label>Địa chỉ:</label>
                <input type="text" v-model="userInfo.diaChi" />
            </div>
            <div>
                <label>Ngày sinh:</label>
                <input type="date" v-model="formattedDate" @change="updateDate" />
            </div>
            <div>
                <label>Dân tộc:</label>
                <input type="text" v-model="userInfo.danToc" />
            </div>
            <div class="gender-selection">
                <label>Giới tính:</label>
                <select v-model="userInfo.gioiTinh">
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>

            <!-- Hiển thị Chức vụ chỉ khi là nhân viên -->
            <div v-if="userInfo.phanLoaiTaiKhoan.tenLoaiTaiKhoan === 'NhanVien' && userInfo.chucVu">
                <label>Chức vụ:</label>
                <input type="text" v-model="userInfo.chucVu.tenChucVu" />
            </div>

            <div>
                <label>Ghi chú:</label>
                <input type="text" v-model="userInfo.ghiChu" />
            </div>
            <button type="submit">Cập nhật thông tin</button>
        </form>
    </div>
    <div v-else>
        <p>Không có thông tin người dùng.</p>
    </div>
</div>
</template>

<script lang="ts">
import { getUserData, setUserInfo } from "@/api/authService"; // Đảm bảo đường dẫn đúng với vị trí của authService

interface User {
    id: string;
    ten: string;
    tenDem: string;
    ho: string;
    email: string;
    diaChi: string;
    ngaySinh: [number, number, number];
    danToc: string;
    gioiTinh: number;
    chucVu?: { tenChucVu: string }; // Chức vụ có thể không có cho khách hàng
    ghiChu: string;
    phanLoaiTaiKhoan: { tenLoaiTaiKhoan: string }; // 'NhanVien' hoặc 'KhachHang'
}

export default {
    name: "UserInfo",
    data() {
        return {
            userInfo: null as User | null,
            formattedDate: "", // Để lưu trữ ngày sinh ở định dạng dễ sử dụng
        };
    },
    mounted: async function () {
        try {
            const user = await getUserData(); // Sử dụng await để lấy dữ liệu từ Promise
            console.log("Dữ liệu người dùng:", user); // Kiểm tra dữ liệu người dùng

            if (user) {
                if (user.khachHang) { // Kiểm tra nếu là khách hàng
                    this.userInfo = {
                        ...user.khachHang, // Lấy thông tin từ khách hàng
                        phanLoaiTaiKhoan: user.phanLoaiTaiKhoan,
                        ghiChu: user.ghiChu,
                        email: user.email,
                    };
                    this.formattedDate = this.formatDate(user.khachHang.ngaySinh); // Chuyển đổi ngày sinh sang định dạng dễ sử dụng
                } else if (user.nhanVien) { // Nếu là nhân viên
                    this.userInfo = {
                        ...user.nhanVien, // Lấy thông tin từ nhân viên
                        phanLoaiTaiKhoan: user.phanLoaiTaiKhoan,
                        ghiChu: user.ghiChu,
                        email: user.email,
                    };
                    this.formattedDate = this.formatDate(user.nhanVien.ngaySinh); // Chuyển đổi ngày sinh sang định dạng dễ sử dụng
                } else {
                    console.error("Không có thông tin người dùng hợp lệ.");
                }
            } else {
                console.error("Không có thông tin người dùng.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
    },
    methods: {
        formatDate(dateArray: [number, number, number]): string {
            const [year, month, day] = dateArray;
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`; // Định dạng thành YYYY-MM-DD
        },
        updateDate(event: Event) {
            const input = event.target as HTMLInputElement;
            const date = new Date(input.value);
            if (this.userInfo) {
                this.userInfo.ngaySinh = [date.getFullYear(), date.getMonth() + 1, date.getDate()]; // Cập nhật ngày sinh
            }
        },
        updateUserInfo() {
            if (this.userInfo) {
                setUserInfo(this.userInfo); // Lưu thông tin đã cập nhật vào sessionStorage
                alert("Thông tin đã được cập nhật!");
            }
        }
    }
};
</script>

<style scoped>
.search-input {
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}
</style>

<style src="./assets/styles.css" scoped></style>
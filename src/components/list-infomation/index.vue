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
            <div v-if="userInfo.taiKhoan.phanLoaiTaiKhoan.tenLoaiTaiKhoan === 'NhanVien' && userInfo.chucVu">
                <label>Chức vụ:</label>
                <input type="text" v-model="userInfo.chucVu.tenChucVu" />
            </div>

            <div>
                <label>Ghi chú:</label>
                <input type="text" v-model="userInfo.taiKhoan.ghiChu" />
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
import { getUserInfo, setUserInfo } from "@/api/authService"; // Đảm bảo đường dẫn đúng với vị trí của authService

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
    taiKhoan: {
        tenDangNhap: string,
        ghiChu: string,
        phanLoaiTaiKhoan: { tenLoaiTaiKhoan: string }, // 'NhanVien' hoặc 'KhachHang'
    };
}

export default {
    name: "ChatApp",
    data() {
        return {
            userInfo: null as User | null,
            formattedDate: "", // Để lưu trữ ngày sinh ở định dạng dễ sử dụng
        };
    },
    mounted() {
        const user = getUserInfo();
        if (user) {
            this.userInfo = user;
            this.formattedDate = this.formatDate(user.ngaySinh); // Chuyển đổi ngày sinh sang định dạng dễ sử dụng
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

<style src="./assets/styles.css" scoped></style>

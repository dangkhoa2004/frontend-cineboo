<template>
<div>
    <div v-if="userInfo">
        <form @submit.prevent="updateUserInfo">
            <!-- Các trường thông tin cá nhân -->
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
                <input type="text" v-model="userInfo.email" />
            </div>
            <div>
                <label>Số điện thoại:</label>
                <input type="text" v-model="userInfo.soDienThoai" />
            </div>
            <div>
                <label>Địa chỉ:</label>
                <input type="text" v-model="userInfo.diaChi" />
            </div>
            <div>
                <label>Ngày sinh:</label>
                <input type="date" :value="formattedDate" @change="updateDate" />
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
import { getUserData } from "@/api/authService";
import { updatekhachhangById } from "@/api/customer";
import { updatenhanvienById } from "@/api/employee";
import { validateEmail, validatePhoneNumber, validateDate, validateRequiredField } from '@/utils/validation';
import Swal from 'sweetalert2';

interface User {
    id: string;
    ten: string;
    tenDem: string;
    ho: string;
    email: string;
    soDienThoai: string;
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
            if (!Array.isArray(dateArray) || dateArray.length !== 3) {
                throw new Error("Dữ liệu không hợp lệ. Phải là một mảng [năm, tháng, ngày].");
            }

            const [year, month, day] = dateArray;
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                throw new Error("Ngày hoặc tháng không hợp lệ.");
            }

            const formattedDay = day < 10 ? '0' + day : day.toString();
            const formattedMonth = month < 10 ? '0' + month : month.toString();
            return `${year}-${formattedMonth}-${formattedDay}`; // Định dạng thành yyyy-MM-dd để phù hợp với input type="date"
        },

        updateDate(event: Event) {
            const input = event.target as HTMLInputElement;
            const date = new Date(input.value);
            if (this.userInfo) {
                this.userInfo.ngaySinh = [date.getFullYear(), date.getMonth() + 1, date.getDate()]; // Cập nhật ngày sinh
                this.formattedDate = input.value; // Cập nhật định dạng hiển thị phù hợp với input type="date"
            }
        },
        validateUserInfo() {
            const { ho, ten, email, diaChi, soDienThoai, danToc } = this.userInfo || {};
            const hoError = validateRequiredField(ho, "Họ");
            const tenError = validateRequiredField(ten, "Tên");
            const soDienThoaiError = validatePhoneNumber(soDienThoai);
            const emailError = validateEmail(email);
            const diaChiError = validateRequiredField(diaChi, "Địa chỉ");
            const ngaySinhError = validateDate(this.formattedDate);
            const danTocError = validateRequiredField(danToc, "Dân tộc");

            if (hoError || tenError || emailError || diaChiError || soDienThoaiError || ngaySinhError || danTocError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi cập nhật thông tin',
                    text: hoError || tenError || emailError || diaChiError || soDienThoaiError || ngaySinhError || danTocError,
                });
                return false;
            }
            return true;
        },
        async updateUserInfo() {
            if (this.userInfo && this.validateUserInfo()) {
                try {
                    if (this.userInfo.phanLoaiTaiKhoan.tenLoaiTaiKhoan === 'KhachHang') {
                        await updatekhachhangById(this.userInfo.id, this.userInfo);
                    } else if (this.userInfo.phanLoaiTaiKhoan.tenLoaiTaiKhoan === 'NhanVien') {
                        await updatenhanvienById(this.userInfo.id, this.userInfo);
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Thông tin đã được cập nhật!',
                    });
                    setTimeout(() => { window.location.reload(); }, 1500);
                } catch (error) {
                    console.error("Lỗi khi cập nhật thông tin:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Lỗi khi cập nhật thông tin.',
                    });
                }
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

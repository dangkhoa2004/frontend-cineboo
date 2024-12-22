<template>
<div class="employee-detail">
    <div v-if="employee">
        <div>
            <label>ID Nhân Viên:</label>
            <input v-model="employee.id" disabled />
        </div>
        <div>
            <label>Mã Nhân Viên:</label>
            <input v-model="employee.maNhanVien" />
        </div>
        <div>
            <label>Chức Vụ:</label>
            <input v-model="employee.chucVu.tenChucVu" disabled />
        </div>
        <div>
            <label>Họ:</label>
            <input v-model="employee.ho" />
        </div>
        <div>
            <label>Tên Đệm:</label>
            <input v-model="employee.tenDem" />
        </div>
        <div>
            <label>Tên:</label>
            <input v-model="employee.ten" />
        </div>
        <div>
            <label>Ngày Sinh:</label>
            <input type="date" v-model="formattedDateOfBirth" />
        </div>
        <div>
            <label>Giới Tính: </label>
            <select v-model="employee.gioiTinh">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
            </select>
        </div>
        <div>
            <label>Email:</label>
            <input v-model="employee.taiKhoan.email" />
        </div>
        <div>
            <label>Dân Tộc:</label>
            <input v-model="employee.danToc" />
        </div>
        <div>
            <label>Địa Chỉ:</label>
            <input v-model="employee.diaChi" />
        </div>
        <div>
            <label>Ghi Chú Tài Khoản:</label>
            <input v-model="employee.taiKhoan.ghiChu" />
        </div>
        <div>
            <label>Trạng Thái Nhân Viên:</label>
            <select v-model="employee.trangThai" disabled>
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
            </select>
        </div>
        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveEmployee">Lưu lại</button>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin nhân viên...</p>
    </div>
</div>
</template>

<script>
import { fetchnhanvienById, updatenhanvienById } from "@/api/employee";
import Swal from "sweetalert2";
import {
    validateEmail,
    validatePhoneNumber,
    validateRequiredField,
    validateDate,
} from "@/utils/validation.ts";

export default {
    data() {
        return {
            employee: null,
            formattedDateOfBirth: '',
        };
    },
    async mounted() {
        await this.loadEmployee();
    },
    methods: {
        async loadEmployee() {
            const employeeId = this.$route.params.id;
            try {
                const employeeData = await fetchnhanvienById(employeeId);
                this.employee = employeeData;
                this.formattedDateOfBirth = this.formatDateForInput(this.employee.ngaySinh);
            } catch (error) {
                console.error("Lỗi khi tải thông tin nhân viên:", error);
            }
        },
        validateUserInfo() {
            const { ho, ten, email, diaChi, soDienThoai, danToc } = this.employee || {};
            const hoError = validateRequiredField(ho, "Họ");
            const tenError = validateRequiredField(ten, "Tên");
            const soDienThoaiError = validatePhoneNumber(soDienThoai);
            const emailError = validateEmail(this.employee.taiKhoan.email.trim());
            const diaChiError = validateRequiredField(diaChi, "Địa chỉ");
            const ngaySinhError = validateDate(this.formattedDateOfBirth);
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
        async saveEmployee() {
            if (!this.employee) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không tìm thấy thông tin nhân viên.',
                });
                return;
            }
            if (this.validateUserInfo()) {
                const updatedEmployee = {
                    id: this.employee.id,
                    ten: this.employee.ten,
                    tenDem: this.employee.tenDem,
                    ho: this.employee.ho,
                    gioiTinh: this.employee.gioiTinh,
                    danToc: this.employee.danToc,
                    diaChi: this.employee.diaChi,
                    email: this.employee.taiKhoan.email,
                    ghiChu: this.employee.taiKhoan.ghiChu,
                    soDienThoai: this.employee.soDienThoai,
                    ngaySinh: this.formattedDateOfBirth
                };

                try {
                    await updatenhanvienById(this.employee.id, updatedEmployee);
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Thông tin đã được cập nhật!',
                    });
                    setTimeout(() => { window.location.reload(); }, 2000);
                } catch (error) {
                    console.error("Lỗi khi cập nhật thông tin:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Lỗi khi cập nhật thông tin.',
                    });
                }
            }
        },
        formatDateForInput(dateArray) {
            const [year, month, day] = dateArray;
            const date = new Date(year, month - 1, day);
            return date.toISOString().split('T')[0];
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped src="./assets/styles.css"></style>
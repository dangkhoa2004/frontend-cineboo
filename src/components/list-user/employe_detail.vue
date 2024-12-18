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
            <label>Ghi Chú Tài Khoản:</label>
            <input v-model="employee.taiKhoan.ghiChu" />
        </div>
        <div>
            <label>Tên:</label>
            <input v-model="employee.ten" />
        </div>
        <div>
            <label>Tên Đệm:</label>
            <input v-model="employee.tenDem" />
        </div>
        <div>
            <label>Họ:</label>
            <input v-model="employee.ho" />
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
            <label>Trạng Thái Nhân Viên:</label>
            <select v-model="employee.trangThai">
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
import { fetchnhanvienById, updatenhanvienById } from "@/api/employee"; // Assuming you have these API functions

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
        async saveEmployee() {
            try {
                const updatedEmployee = {
                "id": this.employee.id,
  "ten": this.employee.ten,
  "tenDem": this.employee.tenDem,
  "ho": this.employee.ho,
  "gioiTinh": this.employee.gioiTinh,
  "danToc": this.employee.danToc,
  "diaChi": this.employee.diaChi,
  "email": this.employee.taiKhoan.email,
  "ghiChu": this.employee.taiKhoan.ghiChu,
  "soDienThoai": this.employee.soDienThoai,
                    "ngaySinh": this.formattedDateOfBirth // Convert the formatted date back to the array format
                };

                await updatenhanvienById(this.employee.id, updatedEmployee);
                alert("Thông tin nhân viên đã được cập nhật thành công!");
                this.$router.go(-1);
            } catch (error) {
                console.error("Lỗi khi cập nhật nhân viên:", error);
                alert("Có lỗi xảy ra khi cập nhật thông tin nhân viên.");
            }
        },
        formatDateForInput(dateArray) {
            const [year, month, day] = dateArray;
            const date = new Date(year, month - 1, day + 1);
            return date.toISOString().split('T')[0];
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped src="./assets/styles.css"></style>
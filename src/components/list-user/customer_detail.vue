<template>
<div class="customer-detail">
    <div v-if="customer">
        <div>
            <label>ID Khách Hàng:</label>
            <input v-model="customer.id" disabled />
        </div>
        <div>
            <label>Mã Khách Hàng:</label>
            <input v-model="customer.maKhachHang" disabled />
        </div>
        <div>
            <label>Phân Loại Khách Hàng:</label>
            <input v-model="customer.phanLoaiKhachHang.tenPhanLoaiKhachHang" disabled />
        </div>
        <div>
            <label>Ghi Chú Tài Khoản:</label>
            <input v-model="customer.taiKhoan.ghiChu" disabled />
        </div>
        <div>
            <label>Tên:</label>
            <input v-model="customer.ten" disabled />
        </div>
        <div>
            <label>Tên Đệm:</label>
            <input v-model="customer.tenDem" disabled />
        </div>
        <div>
            <label>Họ:</label>
            <input v-model="customer.ho" disabled />
        </div>
        <div>
            <label>Ngày Sinh:</label>
            <input type="date" v-model="formattedDateOfBirth" disabled />
        </div>
        <div>
            <label>Số Điện Thoại:</label>
            <input v-model="customer.soDienThoai" disabled />
        </div>
        <div>
            <label>Giới Tính: </label>
            <select v-model="customer.gioiTinh" disabled>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
            </select>
        </div>
        <div>
            <label>Email:</label>
            <input v-model="customer.taiKhoan.email" disabled />
        </div>
        <div>
            <label>Dân Tộc:</label>
            <input v-model="customer.danToc" disabled />
        </div>
        <div>
            <label>Địa Chỉ:</label>
            <input v-model="customer.diaChi" disabled />
        </div>
        <div>
            <label>Điểm:</label>
            <input v-model="customer.diem" type="number" disabled />
        </div>
        <div>
            <label>Trạng Thái Khách Hàng:</label>
            <select v-model="customer.trangThaiKhachHang" disabled>
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
            </select>
        </div>
        <div class="button-container">
            <button @click="goBack">Trở về</button>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin khách hàng...</p>
    </div>
</div>
</template>

<script>
import { fetchkhachhangById } from "@/api/customer";

export default {
    data() {
        return {
            customer: null,
            formattedDateOfBirth: '',
        };
    },
    async mounted() {
        await this.loadCustomer();
    },
    methods: {
        async loadCustomer() {
            const customerId = this.$route.params.id;
            try {
                const customerData = await fetchkhachhangById(customerId);
                this.customer = customerData;
                this.formattedDateOfBirth = this.formatDateForInput(this.customer.ngaySinh);
            } catch (error) {
                console.error("Lỗi khi tải thông tin khách hàng:", error);
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
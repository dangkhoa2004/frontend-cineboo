<template>
<div class="voucher-detail">
    <h2>Chi tiết voucher</h2>
    <div v-if="voucher">
        <div class="card voucher-info">
            <div><strong>Mã voucher:</strong> {{ voucher.maVoucher }}</div>
            <div><strong>Giá trị đổi:</strong> {{ formatCurrency(voucher.giaTriDoi) }}</div>
            <div><strong>Trừ tiền phần trăm:</strong> {{ voucher.truTienPhanTram }}%</div>
            <div><strong>Trừ tiền số:</strong> {{ formatCurrency(voucher.truTienSo) }}</div>
            <div><strong>Số tiền tối thiểu:</strong> {{ formatCurrency(voucher.soTienToiThieu) }}</div>
            <div><strong>Giảm tối đa:</strong> {{ formatCurrency(voucher.giamToiDa) }}</div>
            <div><strong>Ngày bắt đầu:</strong> {{ formatDate(voucher.ngayBatDau) }}</div>
            <div><strong>Ngày kết thúc:</strong> {{ formatDate(voucher.ngayKetThuc) }}</div>
            <div><strong>Số lượng:</strong> {{ voucher.soLuong }}</div>
            <div><strong>Trạng thái voucher:</strong>
                {{ voucher.trangThaiVoucher === 1 ? "Đang áp dụng" : "Hết hạn" }}
            </div>
        </div>
        <!-- Back Button -->
        <button @click="goBack">Trở về</button>
    </div>
    <div v-else>
        <p>Đang tải thông tin voucher...</p>
    </div>
</div>
</template>

<script>
import { fetchVoucherById } from "@/api/voucher"; // Assuming a function to fetch voucher by ID

export default {
    data() {
        return {
            voucher: null, // Đảm bảo dữ liệu voucher
        };
    },
    async mounted() {
        await this.loadVoucher();
    },
    methods: {
        async loadVoucher() {
            const voucherId = this.$route.params.id;
            try {
                const voucherData = await fetchVoucherById(voucherId);
                this.voucher = voucherData;
            } catch (error) {
                console.error("Lỗi khi tải thông tin voucher:", error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            return date.toLocaleDateString("vi-VN", options);
        },
        formatCurrency(amount) {
            if (amount === null || amount === undefined || isNaN(amount)) {
                return 'Chưa có giá trị';  // Hoặc trả về giá trị mặc định như '0 VND'
            }
            return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        },
        goBack() {
            this.$router.go(-1); // Quay lại trang trước
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
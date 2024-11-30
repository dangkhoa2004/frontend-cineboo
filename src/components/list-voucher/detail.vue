<template>
<div class="voucher-detail">
    <h2>Chi tiết voucher</h2>
    <div v-if="voucher">
        <div class="card voucher-info">
            <div>
                <label>Mã voucher:</label>
                <input v-model="voucher.maVoucher" disabled />
            </div>
            <div>
                <label>Giá trị đổi:</label>
                <input v-model="voucher.giaTriDoi" :placeholder="voucher.giaTriDoi ? '' : '<trống>'" />
            </div>
            <div>
                <label>Trừ tiền phần trăm:</label>
                <input v-model="voucher.truTienPhanTram"
                    :placeholder="voucher.truTienPhanTram !== undefined ? '' : '<trống>'" />
            </div>
            <div>
                <label>Trừ tiền số:</label>
                <input v-model="voucher.truTienSo" :placeholder="voucher.truTienSo ? '' : '<trống>'" />
            </div>
            <div>
                <label>Số tiền tối thiểu:</label>
                <input v-model="voucher.soTienToiThieu" :placeholder="voucher.soTienToiThieu ? '' : '<trống>'" />
            </div>
            <div>
                <label>Giảm tối đa:</label>
                <input v-model="voucher.giamToiDa" :placeholder="voucher.giamToiDa ? '' : '<trống>'" />
            </div>
            <div>
                <label>Ngày bắt đầu:</label>
                <input type="date" v-model="formattedStartDate" :placeholder="formattedStartDate ? '' : '<trống>'" />
            </div>
            <div>
                <label>Ngày kết thúc:</label>
                <input type="date" v-model="formattedEndDate" :placeholder="formattedEndDate ? '' : '<trống>'" />
            </div>
            <div>
                <label>Số lượng:</label>
                <input v-model="voucher.soLuong" :placeholder="voucher.soLuong ? '' : '<trống>'" />
            </div>
            <div>
                <label>Trạng thái voucher:</label>
                <input v-model="voucher.trangThaiVoucher" :disabled="true"
                    :placeholder="voucher.trangThaiVoucher ? '' : '<trống>'" />
            </div>
        </div>
        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveVoucher">Lưu lại</button>
        </div>
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
    computed: {
        formattedStartDate() {
            return this.voucher?.ngayBatDau ? this.formatDate(this.voucher.ngayBatDau) : '';
        },
        formattedEndDate() {
            return this.voucher?.ngayKetThuc ? this.formatDate(this.voucher.ngayKetThuc) : '';
        },
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
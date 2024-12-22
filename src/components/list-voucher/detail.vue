<template>
<div class="voucher-detail">
    <div class="button-container">
        <button @click="goBack">Trở về</button>
        <button @click="saveVoucher">Lưu lại</button>
    </div>
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
                <input type="date" v-model="formattedStartDate" @input="updateStartDate($event.target.value)"
                    :placeholder="formattedStartDate ? '' : '<trống>'" />
            </div>
            <div>
                <label>Ngày kết thúc:</label>
                <input type="date" v-model="formattedEndDate" @input="updateEndDate($event.target.value)"
                    :placeholder="formattedEndDate ? '' : '<trống>'" />
            </div>
            <div>
                <label>Số lượng:</label>
                <input v-model="voucher.soLuong" :placeholder="voucher.soLuong ? '' : '<trống>'" />
            </div>
            <div>
                <label>Trạng thái voucher:</label>
                <input v-model="voucher.trangThaiVoucher" disabled :placeholder="voucher.trangThaiVoucher" />
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin voucher...</p>
    </div>
</div>
</template>

<script>
import { fetchVoucherById, updateVoucherById } from "@/api/invoice"; // Assuming a function to fetch and update voucher by ID
import Swal from "sweetalert2";

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
        formattedStartDate: {
            get() {
                return this.voucher?.ngayBatDau ? this.formatDateForInput(this.voucher.ngayBatDau) : '';
            },
            set(newValue) {
                this.voucher.ngayBatDau = newValue;
            }
        },
        formattedEndDate: {
            get() {
                return this.voucher?.ngayKetThuc ? this.formatDateForInput(this.voucher.ngayKetThuc) : '';
            },
            set(newValue) {
                this.voucher.ngayKetThuc = newValue;
            }
        },
    },
    methods: {
        async loadVoucher() {
            const voucherId = this.$route.params.id;
            try {
                const voucherData = await fetchVoucherById(voucherId);
                this.voucher = voucherData;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải thông tin voucher',
                });
            }
        },
        formatDateForInput(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        formatCurrency(amount) {
            if (amount === null || amount === undefined || isNaN(amount)) {
                return 'Chưa có giá trị';  // Hoặc trả về giá trị mặc định như '0 VND'
            }
            return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        },
        updateStartDate(value) {
            this.voucher.ngayBatDau = new Date(value).toISOString();
        },
        updateEndDate(value) {
            this.voucher.ngayKetThuc = new Date(value).toISOString();
        },
        goBack() {
            this.$router.go(-1);
        },
        async saveVoucher() {
            if (this.voucher) {
                try {
                    await updateVoucherById(this.voucher.id, this.voucher);
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Voucher đã được cập nhật thành công!',
                    });
                    this.$router.go(-1);
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra khi cập nhật voucher.',
                    });
                }
            }
        }
    },
};
</script>

<style src="./assets/styles.css" scoped></style>
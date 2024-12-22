<template>
<div class="create-voucher">
    <form @submit.prevent="submitVoucher">
        <div class="form-group">
            <label for="maVoucher">Mã voucher</label>
            <input v-model="voucher.maVoucher" id="maVoucher" type="text" />
        </div>

        <div class="form-group">
            <label for="giaTriDoi">Giá trị đổi</label>
            <input v-model.number="voucher.giaTriDoi" id="giaTriDoi" type="number" />
        </div>

        <div class="form-group">
            <label for="truTienPhanTram">Trừ tiền phần trăm</label>
            <input v-model.number="voucher.truTienPhanTram" id="truTienPhanTram" type="number" />
        </div>

        <div class="form-group">
            <label for="truTienSo">Trừ tiền số</label>
            <input v-model.number="voucher.truTienSo" id="truTienSo" type="number" />
        </div>

        <div class="form-group">
            <label for="soTienToiThieu">Số tiền tối thiểu</label>
            <input v-model.number="voucher.soTienToiThieu" id="soTienToiThieu" type="number" />
        </div>

        <div class="form-group">
            <label for="giamToiDa">Giảm tối đa</label>
            <input v-model.number="voucher.giamToiDa" id="giamToiDa" type="number" />
        </div>

        <div class="form-group">
            <label for="ngayBatDau">Ngày bắt đầu</label>
            <input v-model="voucher.ngayBatDau" id="ngayBatDau" type="date" />
        </div>

        <div class="form-group">
            <label for="ngayKetThuc">Ngày kết thúc</label>
            <input v-model="voucher.ngayKetThuc" id="ngayKetThuc" type="date" />
        </div>

        <div class="form-group">
            <label for="soLuong">Số lượng</label>
            <input v-model.number="voucher.soLuong" id="soLuong" type="number" />
        </div>

        <button type="submit">Tạo mới</button>
    </form>
</div>
</template>

<script>
import { createVoucher } from "@/api/invoice";
import Swal from "sweetalert2";
import { validateRequiredField } from '@/utils/validation';
export default {
    data() {
        return {
            voucher: {
                maVoucher: "",
                giaTriDoi: "",
                truTienPhanTram: "",
                truTienSo: "",
                soTienToiThieu: "",
                giamToiDa: "",
                ngayBatDau: "",
                ngayKetThuc: "",
                soLuong: "",
                trangThaiVoucher: 1,
            },
        };
    },
    methods: {
        validateVoucher() {
            const { maVoucher, giaTriDoi, truTienPhanTram, truTienSo, soTienToiThieu, giamToiDa, ngayBatDau, ngayKetThuc, soLuong } = this.voucher || {};
            const voucherError = validateRequiredField(maVoucher, "Mã Voucher");
            const giaTriDoiError = validateRequiredField(giaTriDoi, "Giá trị đổi");
            const truTienPhanTramError = validateRequiredField(truTienPhanTram, "Trừ tiền %");
            const truTienSoError = validateRequiredField(truTienSo, "Trừ tiền số");
            const soTienToiThieuError = validateRequiredField(soTienToiThieu, "Số tiền tối thiểu");
            const giamToiDaError = validateRequiredField(giamToiDa, "Giảm tối đa");
            const ngayBatDauError = validateRequiredField(ngayBatDau, "Ngày bắt đầu");
            const ngayKetThucError = validateRequiredField(ngayKetThuc, "Ngày kết thúc");
            const soLuongError = validateRequiredField(soLuong, "Số lượng");

            if (voucherError || giaTriDoiError || truTienPhanTramError || truTienSoError || soTienToiThieuError || giamToiDaError || ngayBatDauError || ngayKetThucError || soLuongError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi cập nhật thông tin',
                    text: voucherError || giaTriDoiError || truTienPhanTramError || truTienSoError || soTienToiThieuError || giamToiDaError || ngayBatDauError || ngayKetThucError || soLuongError,
                });
                return false;
            }
            return true;
        },
        async submitVoucher() {
            if (this.voucher && this.validateVoucher()) {
                // Hiển thị hộp thoại xác nhận
                const result = await Swal.fire({
                    title: 'Xác nhận tạo voucher',
                    text: "Bạn có chắc chắn muốn tạo voucher này?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                });

                // Kiểm tra xem người dùng đã xác nhận không
                if (result.isConfirmed) {
                    try {
                        const newVoucher = {
                            ...this.voucher,
                            ngayBatDau: this.formatDateForBackend(this.voucher.ngayBatDau),
                            ngayKetThuc: this.formatDateForBackend(this.voucher.ngayKetThuc),
                        };
                        await createVoucher(newVoucher);
                        Swal.fire({
                            icon: "success",
                            title: "Tạo voucher thành công",
                            text: "Voucher mới đã được tạo.",
                        });
                        setTimeout(() => {
                            window.location.href = "/quan-ly/vouchers";
                        }, 2000);
                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Lỗi tạo voucher",
                            text: "Đã có lỗi xảy ra khi tạo voucher. Vui lòng thử lại sau.",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Hủy bỏ',
                        text: 'Tạo voucher đã bị hủy.',
                    });
                }
            }
        },
        formatDateForBackend(date) {
            const d = new Date(date);
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
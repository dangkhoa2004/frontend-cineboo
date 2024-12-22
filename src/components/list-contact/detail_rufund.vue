<template>
<div class="refund-detail">
    <div class="button-container">
        <button @click="goBack">Trở về</button>
    </div>
    <div v-if="refund">
        <div class="card refund-info">
            <div>
                <label>Mã Hoàn Vé:</label>
                <input v-model="refund.maHoanVe" disabled />
            </div>
            <div>
                <label>Khách Hàng:</label>
                <input v-model="khachHangDisplay" disabled />
            </div>
            <div>
                <label>Voucher:</label>
                <input v-model="voucherDisplay" disabled />
            </div>
            <div>
                <label>Phim:</label>
                <input v-model="phimDisplay" disabled />
            </div>
            <div>
                <label>Ngày Hoàn Vé:</label>
                <input type="date" v-model="formattedRefundDate" @input="updateRefundDate($event.target.value)" />
            </div>
            <div>
                <label>Lý Do Hoàn Vé:</label>
                <input v-model="refund.lyDoHoanVe" />
            </div>
            <div>
                <label>Trạng Thái:</label>
                <select v-model="refund.trangThaiHoanVe">
                    <option value="0">Chờ xử lý</option>
                    <option value="1">Đã xử lý</option>
                </select>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin hoàn vé...</p>
    </div>
</div>
</template>

<script>
import { fetchRefundById } from "@/api/refund";


export default {
    data() {
        return {
            refund: null,
        };
    },
    async mounted() {
        this.loadRefund();
    },
    computed: {
        formattedRefundDate: {
            get() {
                return this.refund?.thoiGianHoanVe ? this.formatDateForInput(this.refund.thoiGianHoanVe) : '';
            },
            set(newValue) {
                this.refund.thoiGianHoanVe = newValue;
            }
        },
        khachHangDisplay() {
            if (this.refund?.hoaDon?.khachHang) {
                const khachHang = this.refund.hoaDon.khachHang;
                return `${khachHang.ho} ${khachHang.tenDem} ${khachHang.ten}`;
            }
            return 'Không có thông tin';
        },
        voucherDisplay() {
            return this.refund?.hoaDon?.voucher ? this.refund.hoaDon.voucher.maVoucher : 'Không có';
        },
        phimDisplay() {
            if (this.refund?.hoaDon?.chiTietHoaDonList && this.refund.hoaDon.chiTietHoaDonList.length > 0) {
                const phim = this.refund.hoaDon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim;
                return phim ? phim.tenPhim : 'Không có thông tin';
            }
            return 'Không có thông tin';
        }
    },
    methods: {
        async loadRefund() {
            const refundId = this.$route.params.id;
            try {
                const refundData = await fetchRefundById(refundId);
                this.refund = refundData;
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể tải thông tin hoàn vé",
                });
            }
        },
        formatDateForInput(dateArray) {
            const [year, month, day] = dateArray;
            const date = new Date(year, month - 1, day);
            return date.toISOString().split('T')[0];
        },
        updateRefundDate(value) {
            const date = new Date(value);
            this.refund.thoiGianHoanVe = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
        },
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>

<style scoped src="./assets/styles.css"></style>
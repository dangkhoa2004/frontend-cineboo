<template>
<div class="invoice-detail">
    <!-- Save Button -->
    <div class="button-container">
        <button @click="goBack">Trở về</button>
    </div>
    <div v-if="invoice">
        <h3>Chi tiết hoá đơn</h3>
        <section class="movie_checkout_content">
            <div class="header-ticker">
                <p>Cảm ơn bạn đã đặt vé của Cineboo!</p>
            </div>
            <div class="ticket-container">
                <div class="col-1">
                    <div class="ticket-info">
                        <p class="status">Xuất vé thành công</p>
                        <h2>{{ invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</h2>
                        <p class="movie-details">Thời lượng: {{
                            invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.thoiLuong }} phút</p>
                        <div class="row-1">
                            <p><span>Ngày:</span> {{
                                formatDate(invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu)
                            }}</p>
                            <p><span>Giờ:</span> {{
                                formatTime(invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu)
                            }}</p>
                            <p><span>Rạp:</span> {{
                                invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_Ghe.phongChieu.maPhong }}</p>
                        </div>
                        <div class="row-1">
                            <p><span>Vị trí ghế: </span>
                                <span v-for="(item, index) in invoice.chiTietHoaDonList" :key="index">
                                    {{ item.id_GheAndSuatChieu.id_Ghe.maGhe }}<span
                                        v-if="index < invoice.chiTietHoaDonList.length - 1">, </span>
                                </span>
                            </p>
                            <p>Rạp CineBoo Nguyễn Du</p>
                        </div>
                        <p class="address">Tầng 3 TTTM CineBoo Hải Phòng Lê Thánh Tông, Thành phố Hải Phòng</p>
                    </div>
                </div>
                <div class="col-1">
                    <div class="qr-section">
                        <img src="@/assets/img/qr.png" alt="QR Code">
                        <p>Đưa mã QR cho nhân viên soát vé</p>
                        <div class="ticket-code">
                            <p>Mã vé</p>
                            <span>666155985</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <h3>Thông tin khách hàng</h3>
        <div class="card customer-info">
            <div><strong>Họ và tên:</strong>
                <input v-model="invoice.khachHang.ho" placeholder="Họ" disabled />
                <input v-model="invoice.khachHang.tenDem" placeholder="Tên đệm" disabled />
                <input v-model="invoice.khachHang.ten" placeholder="Tên" disabled />
            </div>
            <div><strong>Ngày sinh:</strong>
                <input v-model="invoice.khachHang.ngaySinh" type="date" disabled />
            </div>
            <div><strong>Số điện thoại:</strong>
                <input v-model="invoice.khachHang.soDienThoai" disabled />
            </div>
            <div><strong>Email:</strong>
                <input v-model="invoice.khachHang.email" disabled />
            </div>
            <div><strong>Địa chỉ:</strong>
                <input v-model="invoice.khachHang.diaChi" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="invoice.khachHang.diem" type="number" disabled />
            </div>
        </div>
        <h3>Thông tin phim</h3>
        <div v-if="invoice && invoice.chiTietHoaDonList.length > 0 && invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim"
            class="card movie-info">
            <div><strong>Tên phim:</strong>
                <input v-model="invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim" disabled />
            </div>
            <div><strong>Quốc gia:</strong>
                <input v-model="invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.quocGia" disabled />
            </div>
            <div><strong>Nội dung:</strong>
                <input v-model="invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.noiDung" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="invoice.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.diem" type="number"
                    disabled />
            </div>
        </div>
        <h3>Phương thức thanh toán</h3>
        <div class="card payment-method">
            <div v-if="invoice.pttt">
                <div><strong>Hình thức:</strong>
                    <input v-model="invoice.pttt.tenPTTT" disabled />
                </div>
            </div>
            <div v-else>
                <p><strong>Không có phương thức thanh toán</strong></p>
            </div>
        </div>
        <h3>Thông tin hoá đơn</h3>
        <div class="card invoice-info">
            <div><strong>Mã hoá đơn:</strong>
                <input v-model="invoice.maHoaDon" disabled />
            </div>
            <div><strong>Số lượng:</strong>
                <input v-model="invoice.soLuong" type="number" disabled />
            </div>
            <div><strong>Tổng tiền:</strong>
                <input v-model="invoice.tongSoTien" type="number" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="invoice.diem" type="number" disabled />
            </div>
            <div><strong>Thời gian thanh toán:</strong>
                <input v-model="formattedTime" type="datetime-local" disabled />
            </div>
            <div><strong>Trạng thái hoá đơn:</strong>
                <input :value="getTrangThaiHoaDonText(invoice.trangThaiHoaDon)" disabled />
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin hoá đơn...</p>
    </div>
</div>
</template>

<script>
import { fetchInvoiceById } from "@/api/invoice";
export default {
    data() {
        return {
            invoice: null,
        };
    },
    computed: {

        formattedTime: {
            get() {
                if (this.invoice && this.invoice.thoiGianThanhToan) {
                    // Chuyển đổi từ mảng [2024, 1, 1, 19, 0] sang định dạng "YYYY-MM-DDTHH:mm"
                    const time = this.invoice.thoiGianThanhToan;
                    return `${time[0]}-${String(time[1]).padStart(2, '0')}-${String(time[2]).padStart(2, '0')}T${String(time[3]).padStart(2, '0')}:${String(time[4]).padStart(2, '0')}`;
                }
                return '';
            },
            set(value) {
                // Chuyển đổi từ "YYYY-MM-DDTHH:mm" sang mảng [2024, 1, 1, 19, 0]
                const date = new Date(value);
                this.invoice.thoiGianThanhToan = [
                    date.getFullYear(),
                    date.getMonth() + 1, // tháng bắt đầu từ 0, nên phải cộng thêm 1
                    date.getDate(),
                    date.getHours(),  // Giờ tự động theo chuẩn 24h
                    date.getMinutes(),
                ];
            }
        }
    },
    async mounted() {
        await this.loadInvoice();
    },
    methods: {
        formatDate(timeArray) {
            const date = new Date(timeArray[0], timeArray[1] - 1, timeArray[2]); // Chuyển mảng thành ngày tháng năm
            return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        },
        formatTime(timeArray) {
            const date = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4]); // Chuyển mảng thành giờ phút
            return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        },
        getTrangThaiHoaDonText(status) {
            switch (status) {
                case 0:
                    return "Chưa thanh toán";
                case 1:
                    return "Đã thanh toán";
                case 2:
                    return "Đã huỷ";
                case 3:
                    return "Đã thanh toán và in vé";
                case 4:
                    return "Đang chờ hoàn tiền";
                default:
                    return "Chưa xác định";
            }
        },
        async loadInvoice() {
            const invoiceId = this.$route.params.id;
            try {
                const invoiceData = await fetchInvoiceById(invoiceId);
                this.invoice = invoiceData;
                console.log(invoiceData);
            } catch (error) {
                console.error("Lỗi khi tải thông tin hoá đơn:", error);
            }
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
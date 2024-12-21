<template>
<div class="invoice-detail">
    <div class="button-container">
        <button @click="goBack">Trở về</button>
    </div>
    <!-- Invoice data -->
    <div v-if="hoadon">
        <!-- Customer Information -->
        <h3>Thông tin khách hàng</h3>
        <div class="card customer-info">
            <div>
                <strong>Họ và tên:</strong>
                <input v-model="hoadon.khachHang.ho" placeholder="Họ" disabled />
                <input v-model="hoadon.khachHang.tenDem" placeholder="Tên đệm" disabled />
                <input v-model="hoadon.khachHang.ten" placeholder="Tên" disabled />
            </div>
            <div>
                <strong>Ngày sinh:</strong>
                <input v-model="hoadon.khachHang.ngaySinh" type="date" disabled />
            </div>
            <div><strong>Số điện thoại:</strong>
                <input v-model="hoadon.khachHang.soDienThoai" disabled />
            </div>
            <div><strong>Email:</strong>
                <input v-model="hoadon.khachHang.email" disabled />
            </div>
            <div><strong>Địa chỉ:</strong>
                <input v-model="hoadon.khachHang.diaChi" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="hoadon.khachHang.diem" type="number" disabled />
            </div>
        </div>

        <!-- Movie Information -->
        <h3>Thông tin phim</h3>
        <div v-if="hoadon.chiTietHoaDonList.length && hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim"
            class="card movie-info">
            <div><strong>Tên phim:</strong>
                <input v-model="hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim" disabled />
            </div>
            <div><strong>Quốc gia:</strong>
                <input v-model="hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.quocGia" disabled />
            </div>
            <div><strong>Nội dung:</strong>
                <input v-model="hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.noiDung" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.diem" type="number"
                    disabled />
            </div>
        </div>

        <!-- Payment Method -->
        <h3>Phương thức thanh toán</h3>
        <div class="card payment-method">
            <div v-if="hoadon.pttt">
                <div><strong>Hình thức:</strong>
                    <input v-model="hoadon.pttt.tenPTTT" disabled />
                </div>
            </div>
            <div v-else>
                <p><strong>Không có phương thức thanh toán</strong></p>
            </div>
        </div>

        <!-- Invoice Information -->
        <h3>Thông tin hoá đơn</h3>
        <div class="card invoice-info">
            <div><strong>Mã hoá đơn:</strong>
                <input v-model="hoadon.maHoaDon" disabled />
            </div>
            <div><strong>Số lượng:</strong>
                <input v-model="hoadon.soLuong" type="number" disabled />
            </div>
            <div><strong>Tổng tiền:</strong>
                <input v-model="hoadon.tongSoTien" type="number" disabled />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="hoadon.diem" type="number" disabled />
            </div>
            <div><strong>Thời gian thanh toán:</strong>
                <input v-model="formattedTime" type="datetime-local" disabled />
            </div>
            <div><strong>Trạng thái hoá đơn:</strong>
                <input :value="getTrangThaiHoaDonText(hoadon.trangThaiHoaDon)" disabled />
            </div>
        </div>

        <!-- Invoice Details -->
        <h3>Chi tiết hoá đơn</h3>
        <section class="movie_checkout_content">
            <div class="header-ticker">
                <p>Cảm ơn bạn đã đặt vé của Cineboo!</p>
            </div>
            <div class="ticket-container">
                <div class="col-1">
                    <div class="ticket-info">
                        <p class="status" :class="statusClass(hoadon.trangThaiHoaDon)">
                            {{ getTrangThaiHoaDonText(hoadon.trangThaiHoaDon) }}
                        </p>
                        <h2>{{ hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</h2>
                        <p class="movie-details">Thời lượng: {{
                            hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.phim.thoiLuong }} phút</p>
                        <div class="row-1">
                            <p><span>Ngày:</span> {{
                                formatDate(hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu) }}
                            </p>
                            <p><span>Giờ:</span> {{
                                formatTime(hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu) }}
                            </p>
                            <p><span>Rạp:</span> {{
                                hoadon.chiTietHoaDonList[0].id_GheAndSuatChieu.id_Ghe.phongChieu.maPhong }}</p>
                        </div>
                        <div class="row-1">
                            <p><span>Vị trí ghế: </span>
                                <span v-for="(item, index) in hoadon.chiTietHoaDonList" :key="index">
                                    {{ item.id_GheAndSuatChieu.id_Ghe.maGhe }}<span
                                        v-if="index < hoadon.chiTietHoaDonList.length - 1">, </span>
                                </span>
                            </p>
                            <p>Rạp CineBoo Nguyễn Du</p>
                        </div>
                        <p class="address">Tầng 3 TTTM CineBoo Hải Phòng Lê Thánh Tông, Thành phố Hải Phòng</p>
                    </div>
                </div>
                <div class="col-1">
                    <div v-if="hoadon.trangThaiHoaDon === 1" class="qr-section">
                        <img :src="hoadon.qr" alt="QR Code">
                        <p>Đưa mã QR cho nhân viên soát vé</p>
                        <div class="ticket-code">
                            <p>Mã vé</p>
                            <span>666155985</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Loading state -->
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
            hoadon: null,
        };
    },
    computed: {
        formattedTime: {
            get() {
                if (this.hoadon && this.hoadon.thoiGianThanhToan) {
                    const time = this.hoadon.thoiGianThanhToan;
                    return `${time[0]}-${String(time[1]).padStart(2, '0')}-${String(time[2]).padStart(2, '0')}T${String(time[3]).padStart(2, '0')}:${String(time[4]).padStart(2, '0')}`;
                }
                return '';
            },
            set(value) {
                const date = new Date(value);
                this.hoadon.thoiGianThanhToan = [
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getHours(),
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
            const date = new Date(timeArray[0], timeArray[1] - 1, timeArray[2]);
            return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        },
        formatTime(timeArray) {
            const date = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4]);
            return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        },
        getTrangThaiHoaDonText(status) {
            const statusTexts = {
                0: "Hoá đơn chưa thanh toán",
                1: "Hoá đơn đã thanh toán",
                2: "Hoá đơn đã huỷ thanh toán",
                3: "Hoá đơn đã lấy vé thành công",
                4: "Đang có yêu cầu hoàn tiền",
            };
            return statusTexts[status] || "Hoá đơn không xác định";
        },
        statusClass(status) {
            switch (status) {
                case 0:
                case 2:
                case 3:
                case 4:
                    return 'text-red';
                case 1:
                    return 'text-green';
                default:
                    return '';
            }
        },
        async loadInvoice() {
            const invoiceId = this.$route.params.id;
            try {
                // Fetch data from API
                const response = await fetchInvoiceById(invoiceId);
                // Kiểm tra sự tồn tại của response.data và response.data.hoadon
                if (response && response.qr && response.hoadon) {
                    // Gán qr vào hoadon để sử dụng cho ảnh QR
                    this.hoadon = {
                        ...response.hoadon,
                        qr: response.qr
                    };
                } else {
                    console.error("Phản hồi từ API không có dữ liệu hoadon!");
                    this.hoadon = null;  // Gán null nếu không có dữ liệu trong response.data
                }
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error("Lỗi khi tải thông tin hoá đơn:", error);
                this.hoadon = null;  // Gán null nếu có lỗi
            }
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
<!-- list-invoice/index.vue -->
<template>
<div class="invoice-detail">
    <h2>Chi tiết hoá đơn</h2>
    <div v-if="invoice">
        <!-- Customer Information -->
        <div class="card customer-info">
            <h3>Thông tin khách hàng</h3>
            <div><strong>Họ và tên:</strong> {{ `${invoice.khachHang.ho} ${invoice.khachHang.tenDem}
                ${invoice.khachHang.ten}` }}</div>
            <div><strong>Ngày sinh:</strong> {{ formatDate(invoice.khachHang.ngaySinh) }}</div>
            <div><strong>Số điện thoại:</strong> {{ invoice.khachHang.soDienThoai }}</div>
            <div><strong>Email:</strong> {{ invoice.khachHang.email }}</div>
            <div><strong>Địa chỉ:</strong> {{ invoice.khachHang.diaChi }}</div>
            <div><strong>Điểm:</strong> {{ invoice.khachHang.diem }}</div>
            <div><strong>Loại khách hàng:</strong> {{ invoice.khachHang.phanLoaiKhachHang.tenPhanLoaiKhachHang }}</div>
            <div><strong>Trạng thái khách hàng:</strong> {{ invoice.khachHang.trangThaiKhachHang === 1 ? 'Kích hoạt' :
                'Không kích hoạt' }}</div>
        </div>

        <!-- Movie Information -->
        <div class="card movie-info">
            <h3>Thông tin phim</h3>
            <div><strong>Tên phim:</strong> {{ invoice.phim.tenPhim }}</div>
            <div><strong>Thể loại:</strong> {{ invoice.phim.danhSachTLPhims.map(item =>
                item.theLoaiPhim.tenTheLoai).join(', ') }}</div>
            <div><strong>Quốc gia:</strong> {{ invoice.phim.quocGia }}</div>
            <div><strong>Nội dung:</strong> {{ invoice.phim.noiDung }}</div>
            <div><strong>Thời gian:</strong> {{ invoice.phim.thoiLuong }} phút</div>
            <div><strong>Giới hạn độ tuổi:</strong> {{ invoice.phim.gioiHanDoTuoi.tenDoTuoi }}</div>
        </div>

        <!-- Voucher Information -->
        <div class="card voucher-info" v-if="invoice.voucher">
            <h3>Thông tin voucher</h3>
            <div><strong>Mã voucher:</strong> {{ invoice.voucher.maVoucher }}</div>
            <div><strong>Giá trị đổi:</strong> {{ invoice.voucher.giaTriDoi }} VND</div>
            <div><strong>Giảm tiền phần trăm:</strong> {{ invoice.voucher.truTienPhanTram }}%</div>
            <div><strong>Giảm tối đa:</strong> {{ invoice.voucher.giamToiDa }} VND</div>
            <div><strong>Ngày bắt đầu:</strong> {{ formatDate(invoice.voucher.ngayBatDau) }}</div>
            <div><strong>Ngày kết thúc:</strong> {{ formatDate(invoice.voucher.ngayKetThuc) }}</div>
        </div>

        <!-- Payment Method -->
        <div class="card payment-method">
            <h3>Phương thức thanh toán</h3>
            <div><strong>Mã phương thức thanh toán:</strong> {{ invoice.pttt.maPTTT }}</div>
            <div><strong>Hình thức:</strong> {{ invoice.pttt.tenPTTT }}</div>
        </div>

        <!-- Invoice Information -->
        <div class="card invoice-info">
            <h3>Thông tin hoá đơn</h3>
            <div><strong>Mã hoá đơn:</strong> {{ invoice.maHoaDon }}</div>
            <div><strong>Số lượng:</strong> {{ invoice.soLuong }}</div>
            <div><strong>Tổng tiền:</strong> {{ formatCurrency(invoice.tongSoTien) }}</div>
            <div><strong>Điểm:</strong> {{ invoice.diem }}</div>
            <div><strong>Thời gian thanh toán:</strong> {{ formatPaymentTime(invoice.thoiGianThanhToan) }}</div>
            <div><strong>Trạng thái hoá đơn:</strong>
                {{ invoice.trangThaiHoaDon === 1 ? "Đã thanh toán" : "Chưa thanh toán" }}</div>
        </div>

        <!-- Invoice Details -->
        <div class="card invoice-details">
            <h3>Chi tiết hoá đơn</h3>
            <div v-if="invoice.chiTietHoaDonList.length > 0">
                <ul>
                    <li v-for="(item, index) in invoice.chiTietHoaDonList" :key="index">{{ item }}</li>
                </ul>
            </div>
            <div v-else>
                <p><strong>Chưa có chi tiết</strong></p>
            </div>
        </div>
        <!-- Back Button -->
        <button @click="goBack">Trở về</button>
    </div>
    <div v-else>
        <p>Đang tải thông tin hoá đơn...</p>
    </div>
</div>
</template>


<script>
import { fetchInvoiceById } from "@/api/invoice"; // Assuming a function to fetch invoice by ID

export default {
    data() {
        return {
            invoice: null,
        };
    },
    async mounted() {
        await this.loadInvoice();
    },
    methods: {
        async loadInvoice() {
            const invoiceId = this.$route.params.id;
            try {
                const invoiceData = await fetchInvoiceById(invoiceId);
                this.invoice = invoiceData;
            } catch (error) {
                console.error("Lỗi khi tải thông tin hoá đơn:", error);
            }
        },
        formatDate(dateArray) {
            const [year, month, day] = dateArray;
            return new Date(year, month - 1, day).toLocaleDateString('vi-VN');
        },
        formatCurrency(amount) {
            return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
        },
        formatPaymentTime(timeArray) {
            const [year, month, day, hour, minute] = timeArray;
            const date = new Date(year, month - 1, day, hour, minute);
            const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
            return date.toLocaleString("vi-VN", options);
        },
        goBack() {
            this.$router.go(-1); // Go back to the previous page
        },
    },
};
</script>
<style scoped>
.invoice-detail {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 1.8em;
    color: #333;
}

h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

strong {
    font-weight: bold;
}

.card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card h3 {
    margin-top: 0;
}

button {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}
</style>

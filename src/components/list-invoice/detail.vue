<template>
<div class="invoice-detail">
    <h2>Chi tiết hoá đơn</h2>
    <div v-if="invoice">
        <!-- Customer Information -->
        <div class="card customer-info">
            <h3>Thông tin khách hàng</h3>
            <div><strong>Họ và tên:</strong>
                <input v-model="invoice.khachHang.ho" placeholder="Họ" />
                <input v-model="invoice.khachHang.tenDem" placeholder="Tên đệm" />
                <input v-model="invoice.khachHang.ten" placeholder="Tên" />
            </div>
            <div><strong>Ngày sinh:</strong>
                <input v-model="invoice.khachHang.ngaySinh" type="date" />
            </div>
            <div><strong>Số điện thoại:</strong>
                <input v-model="invoice.khachHang.soDienThoai" />
            </div>
            <div><strong>Email:</strong>
                <input v-model="invoice.khachHang.email" />
            </div>
            <div><strong>Địa chỉ:</strong>
                <input v-model="invoice.khachHang.diaChi" />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="invoice.khachHang.diem" type="number" />
            </div>
            <div><strong>Loại khách hàng:</strong>
                <input v-model="invoice.khachHang.phanLoaiKhachHang.tenPhanLoaiKhachHang" />
            </div>
            <div><strong>Trạng thái khách hàng:</strong>
                <input v-model="invoice.khachHang.trangThaiKhachHang" type="checkbox"
                    :checked="invoice.khachHang.trangThaiKhachHang === 1" />
            </div>
        </div>

        <!-- Movie Information -->
        <div class="card movie-info">
            <h3>Thông tin phim</h3>
            <div><strong>Tên phim:</strong>
                <input v-model="invoice.phim.tenPhim" />
            </div>
            <div><strong>Thể loại:</strong>
                <input v-model="invoice.phim.danhSachTLPhims" />
            </div>
            <div><strong>Quốc gia:</strong>
                <input v-model="invoice.phim.quocGia" />
            </div>
            <div><strong>Nội dung:</strong>
                <textarea v-model="invoice.phim.noiDung" />
            </div>
            <div><strong>Thời gian:</strong>
                <input v-model="invoice.phim.thoiLuong" type="number" />
            </div>
            <div><strong>Giới hạn độ tuổi:</strong>
                <input v-model="invoice.phim.gioiHanDoTuoi.tenDoTuoi" />
            </div>
        </div>

        <!-- Voucher Information -->
        <div class="card voucher-info" v-if="invoice.voucher">
            <h3>Thông tin voucher</h3>
            <div><strong>Mã voucher:</strong>
                <input v-model="invoice.voucher.maVoucher" />
            </div>
            <div><strong>Giá trị đổi:</strong>
                <input v-model="invoice.voucher.giaTriDoi" type="number" />
            </div>
            <div><strong>Giảm tiền phần trăm:</strong>
                <input v-model="invoice.voucher.truTienPhanTram" type="number" />
            </div>
            <div><strong>Giảm tối đa:</strong>
                <input v-model="invoice.voucher.giamToiDa" type="number" />
            </div>
            <div><strong>Ngày bắt đầu:</strong>
                <input v-model="invoice.voucher.ngayBatDau" type="date" />
            </div>
            <div><strong>Ngày kết thúc:</strong>
                <input v-model="invoice.voucher.ngayKetThuc" type="date" />
            </div>
        </div>

        <!-- Payment Method -->
        <div class="card payment-method">
            <h3>Phương thức thanh toán</h3>
            <div v-if="invoice.pttt">
                <div><strong>Mã phương thức thanh toán:</strong>
                    <input v-model="invoice.pttt.maPTTT" />
                </div>
                <div><strong>Hình thức:</strong>
                    <input v-model="invoice.pttt.tenPTTT" />
                </div>
            </div>
            <div v-else>
                <p><strong>Không có phương thức thanh toán</strong></p>
            </div>
        </div>

        <!-- Invoice Information -->
        <div class="card invoice-info">
            <h3>Thông tin hoá đơn</h3>
            <div><strong>Mã hoá đơn:</strong>
                <input v-model="invoice.maHoaDon" />
            </div>
            <div><strong>Số lượng:</strong>
                <input v-model="invoice.soLuong" type="number" />
            </div>
            <div><strong>Tổng tiền:</strong>
                <input v-model="invoice.tongSoTien" type="number" />
            </div>
            <div><strong>Điểm:</strong>
                <input v-model="invoice.diem" type="number" />
            </div>
            <div><strong>Thời gian thanh toán:</strong>
                <input v-model="invoice.thoiGianThanhToan" type="datetime-local" />
            </div>
            <div><strong>Trạng thái hoá đơn:</strong>
                <input v-model="invoice.trangThaiHoaDon" type="checkbox" :checked="invoice.trangThaiHoaDon === 1" />
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="card invoice-details">
            <h3>Chi tiết hoá đơn</h3>
            <div v-if="invoice.chiTietHoaDonList.length > 0">
                <ul>
                    <li v-for="(item, index) in invoice.chiTietHoaDonList" :key="index">
                        <strong>Mã ghế:</strong>
                        <input v-model="item.ghe.maGhe" /> <br>
                        <strong>Giá tiền:</strong>
                        <input v-model="item.ghe.giaTien" type="number" /> <br>
                        <strong>Phòng chiếu:</strong>
                        <input v-model="item.ghe.phongChieu.maPhong" />
                    </li>
                </ul>
            </div>
            <div v-else>
                <p><strong>Chưa có chi tiết</strong></p>
            </div>
        </div>

        <!-- Save Button -->
        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveMovie">Lưu lại</button>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin hoá đơn...</p>
    </div>
</div>
</template>

<script>
import { fetchInvoiceById, updateInvoice } from "@/api/invoice"; // Assuming a function to fetch and update invoice

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
        async saveInvoice() {
            try {
                await updateInvoice(this.invoice);
                alert("Hoá đơn đã được lưu thành công!");
            } catch (error) {
                console.error("Lỗi khi lưu hoá đơn:", error);
            }
        },
        goBack() {
            this.$router.go(-1); // Go back to the previous page
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
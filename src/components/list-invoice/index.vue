<template>
<div class="invoice-manager">
  <table>
    <thead>
      <tr>
        <th>Mã hoá đơn</th>
        <th>Khách hàng</th>
        <th>Phim</th>
        <th>Thể loại phim</th>
        <th>Số lượng</th>
        <th>Tổng tiền</th>
        <th>Thời gian thanh toán</th>
        <th>Trạng thái</th>
        <!-- <th>Chi tiết hoá đơn</th> -->
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in this.invoices" :key="invoice.id">
        <td>{{ invoice.maHoaDon }}</td>
        <td>{{ `${invoice.khachHang.ho} ${invoice.khachHang.ten} ${invoice.khachHang.tenDem}` }}</td>
          <td>{{ invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</td>
        <td>
          {{ invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai).join(', ') }}
        </td> 
        <td>{{ invoice.soLuong }}</td>
        <td>{{ formatCurrency(invoice.tongSoTien) }}</td>
        <td>{{ formatPaymentTime(invoice.thoiGianThanhToan) }}</td>
        <td>
          <span>{{ invoice.trangThaiHoaDon === 1 ? "Đã thanh toán" : "Chưa thanh toán" }}</span>
        </td>
        <!-- <td>
          <span v-if="invoice.chiTietHoaDonList.length > 0">
            {{ invoice.chiTietHoaDonList.join(', ') }}
          </span>
          <span v-else>
            < trống>
          </span>
        </td> -->
        <td>
          <button @click="viewInvoiceDetails(invoice)">Xem</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchInvoices } from "@/api/invoice";

export default {
  data() {
    return {
      invoices: [],
    };
  },
  async mounted() {
    await this.loadInvoices();
  },
  methods: {
    async loadInvoices() {
      try {
        const invoiceData = await fetchInvoices();
        this.invoices = invoiceData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hoá đơn:", error);
      }
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
    viewInvoiceDetails(invoice) {
      this.$router.push({ name: 'thay-doi-thong-tin-hoa-don', params: { id: invoice.id } });
    },
  },
};
</script>
<style src="./assets/styles.css" scoped></style>
<template>
<div class="invoice-manager">
  <div class="button-container">
    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm hoá đơn..." class="search-input" />
  </div>
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
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in filteredInvoices" :key="invoice.id">
        <td>{{ invoice.maHoaDon }}</td>
        <td>{{ `${invoice.khachHang.ho} ${invoice.khachHang.tenDem} ${invoice.khachHang.ten}` }}</td>
        <td>{{ invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</td>
        <td>
          {{ invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.danhSachTLPhims.map(item =>
            item.theLoaiPhim.tenTheLoai).join(', ') }}
        </td>
        <td>{{ invoice.soLuong }}</td>
        <td>{{ formatCurrency(invoice.tongSoTien) }}</td>
        <td>{{ formatPaymentTime(invoice.thoiGianThanhToan) }}</td>
        <td>
          <span>{{ invoice.trangThaiHoaDon === 1 ? "Đã thanh toán" : "Chưa thanh toán" }}</span>
        </td>
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
      searchQuery: "", // Từ khoá tìm kiếm
    };
  },
  computed: {
    filteredInvoices() {
      const query = this.searchQuery.toLowerCase();
      return this.invoices.filter(invoice =>
        invoice.maHoaDon.toLowerCase().includes(query) ||
        `${invoice.khachHang.ho} ${invoice.khachHang.tenDem} ${invoice.khachHang.ten}`.toLowerCase().includes(query) ||
        invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim.toLowerCase().includes(query)
      );
    },
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
<style src="./assets/styles.css" scoped>
.search-input {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>

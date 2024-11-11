<template>
<div class="invoice-container">
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
        <th>Chi tiết hoá đơn</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.maHoaDon }}</td>
        <td>{{ `${invoice.khachHang.ho} ${invoice.khachHang.ten} ${invoice.khachHang.tenDem}` }}</td>
        <td>{{ invoice.phim.tenPhim }}</td>
        <td>
          {{ invoice.phim.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai).join(', ') }}
        </td>
        <td>{{ invoice.soLuong }}</td>
        <td>{{ formatCurrency(invoice.tongSoTien) }}</td>
        <td>{{ formatPaymentTime(invoice.thoiGianThanhToan) }}</td>
        <td>
          <span>{{ invoice.trangThaiHoaDon === 1 ? "Đã thanh toán" : "Chưa thanh toán" }}</span>
        </td>
        <td>
          <!-- Display invoice details or "Chưa có chi tiết" if empty -->
          <span v-if="invoice.chiTietHoaDonList.length > 0">
            {{ invoice.chiTietHoaDonList.join(', ') }}
          </span>
          <span v-else>
            < trống >
          </span>
        </td>
        <td>
          <button @click="viewInvoiceDetails(invoice)">Xem chi tiết</button>
          <button @click="deleteInvoice(invoice.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchInvoices, deleteInvoiceById } from "@/api/invoice";

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
    async deleteInvoice(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá hoá đơn này?");
      if (confirmDelete) {
        try {
          await deleteInvoiceById(id);
          this.invoices = this.invoices.filter(invoice => invoice.id !== id);
          alert("Hoá đơn đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá hoá đơn:", error);
          alert("Có lỗi xảy ra khi xoá hoá đơn.");
        }
      }
    },
  },
};
</script>

<style src="./assets/styles.css" scoped></style>
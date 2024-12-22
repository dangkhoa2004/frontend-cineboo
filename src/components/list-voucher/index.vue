<template>
<div class="voucher-manager">
  <div class="button-container">
    <input v-model="startDate" type="date" placeholder="Từ ngày" class="search-input" @input="filterByDateRange" />
  </div>
  <div class="button-container">
    <button >Thêm mới</button>
    <!-- <button >Quản lý lịch chiếu</button> -->
  </div>
  <table>
    <thead>
      <tr>
        <th>Mã voucher</th>
        <th>Giá trị đổi</th>
        <th>Trừ tiền phần trăm</th>
        <th>Trừ tiền số</th>
        <th>Số tiền tối thiểu</th>
        <th>Giảm tối đa</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
        <th>Số lượng</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="voucher in filteredVouchers" :key="voucher.id">
        <td>{{ voucher.maVoucher }}</td>
        <td>{{ formatCurrency(voucher.giaTriDoi) }}</td>
        <td>{{ voucher.truTienPhanTram }}%</td>
        <td>{{ formatCurrency(voucher.truTienSo) }}</td>
        <td>{{ formatCurrency(voucher.soTienToiThieu) }}</td>
        <td>{{ formatCurrency(voucher.giamToiDa) }}</td>
        <td>{{ formatDate(voucher.ngayBatDau) }}</td>
        <td>{{ formatDate(voucher.ngayKetThuc) }}</td>
        <td>{{ voucher.soLuong }}</td>
        <td>
          <span>{{ voucher.trangThaiVoucher === 1 ? "Đang áp dụng" : "Hết hạn" }}</span>
        </td>
        <td>
          <button @click="viewVoucherDetails(voucher)">Xem chi tiết</button>
          <button @click="deleteVoucher(voucher.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import { fetchVouchers, deleteVoucherById } from "@/api/invoice";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      vouchers: [],
      startDate: "",
      filteredVouchers: [],
    };
  },
  async mounted() {
    await this.loadVouchers();
  },
  methods: {
    async loadVouchers() {
      try {
        const voucherData = await fetchVouchers();
        this.vouchers = voucherData;
        this.filteredVouchers = voucherData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu voucher:", error);
      }
    },
    formatCurrency(amount) {
      if (amount === null || amount === undefined || isNaN(amount)) {
        return 'Invalid amount';
      }
      return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
    formatDate(dateArray) {
      const [year, month, day] = dateArray;
      const date = new Date(year, month - 1, day);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("vi-VN", options);
    },
    filterByDateRange() {
      const start = new Date(this.startDate);
      this.filteredVouchers = this.vouchers.filter(voucher => {
        const voucherStartDate = new Date(...voucher.ngayBatDau);
        return voucherStartDate >= start;
      });
    },
    viewVoucherDetails(voucher) {
      this.$router.push({ name: 'thay-doi-thong-tin-voucher', params: { id: voucher.id } });
    },
    async deleteVoucher(id) {
      Swal.fire({
        icon: 'warning',
        title: 'Xác nhận xoá voucher',
        text: 'Bạn có chắc chắn muốn xoá voucher này?',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Hủy',
      }).then(async (confirmDelete) => {
        if (confirmDelete.isConfirmed) {
          try {
            await deleteVoucherById(id);
            this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
            this.filteredVouchers = this.filteredVouchers.filter(voucher => voucher.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Xoá voucher thành công',
              text: 'Voucher đã được xoá thành công.',
            });
          } catch (error) {
            console.error("Lỗi khi xoá voucher:", error);
            Swal.fire({
              icon: 'error',
              title: 'Lỗi xoá voucher',
              text: 'Đã có lỗi xảy ra khi xoá voucher. Vui lòng thử lại sau.',
            });
          }
        }
      });
    },
  },
};
</script>

<style src="./assets/styles.css" scoped></style>

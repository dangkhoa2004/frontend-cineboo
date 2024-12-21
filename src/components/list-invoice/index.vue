<template>
<div class="invoice-manager">
  <div class="button-container">
    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm hoá đơn..." class="search-input" />
  </div>
  <table>
    <thead>
      <tr>
        <th>
          Mã hoá đơn
        </th>
        <th @click="sortTable('khachHang')">
          Khách hàng
          <span v-if="sortKey === 'khachHang'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortTable('tenPhim')">
          Phim
          <span v-if="sortKey === 'tenPhim'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th>Thể loại phim</th>
        <th @click="sortTable('soLuong')">
          Số lượng
          <span v-if="sortKey === 'soLuong'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortTable('tongSoTien')">
          Tổng tiền
          <span v-if="sortKey === 'tongSoTien'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th @click="sortTable('thoiGianThanhToan')">
          Thời gian thanh toán
          <span v-if="sortKey === 'thoiGianThanhToan'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
        </th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in sortedInvoices" :key="invoice.id">
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
import { fetchInvoices, fetchInvoicesByUserID } from "@/api/invoice";
import { getUserData } from "@/api/authService";

export default {
  data() {
    return {
      invoices: [],
      searchQuery: "",
      user: null,
      sortKey: "", // Thuộc tính sắp xếp hiện tại
      sortOrder: "asc", // Hướng sắp xếp: 'asc' hoặc 'desc'
    };
  },
  computed: {
    sortedInvoices() {
      const query = this.searchQuery.toLowerCase();

      // Lọc hoá đơn theo từ khoá tìm kiếm
      let filteredInvoices = this.invoices.filter(invoice =>
        invoice.maHoaDon.toLowerCase().includes(query) ||
        `${invoice.khachHang.ho} ${invoice.khachHang.tenDem} ${invoice.khachHang.ten}`.toLowerCase().includes(query) ||
        invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim.toLowerCase().includes(query)
      );

      // Sắp xếp hoá đơn theo cột và hướng sắp xếp
      if (this.sortKey) {
        filteredInvoices.sort((a, b) => {
          let valA, valB;

          switch (this.sortKey) {
            case "maHoaDon":
              valA = a.maHoaDon;
              valB = b.maHoaDon;
              break;
            case "khachHang":
              valA = `${a.khachHang.ho} ${a.khachHang.tenDem} ${a.khachHang.ten}`;
              valB = `${b.khachHang.ho} ${b.khachHang.tenDem} ${b.khachHang.ten}`;
              break;
            case "tenPhim":
              valA = a?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim || "";
              valB = b?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim || "";
              break;
            case "soLuong":
              valA = a.soLuong;
              valB = b.soLuong;
              break;
            case "tongSoTien":
              valA = a.tongSoTien;
              valB = b.tongSoTien;
              break;
            case "thoiGianThanhToan":
              valA = new Date(...a.thoiGianThanhToan);
              valB = new Date(...b.thoiGianThanhToan);
              break;
            default:
              return 0;
          }

          if (this.sortOrder === "asc") {
            return valA > valB ? 1 : valA < valB ? -1 : 0;
          } else {
            return valA < valB ? 1 : valA > valB ? -1 : 0;
          }
        });
      }

      return filteredInvoices;
    },
  },
  async mounted() {
    await this.loadInvoices();
  },
  methods: {
    async loadInvoices() {
      try {
        const userData = await getUserData();
        this.user = userData;

        let invoiceData = [];

        if (userData.khachHang) {
          invoiceData = await fetchInvoicesByUserID(userData.khachHang.id);
        } else if (userData.nhanVien) {
          invoiceData = await fetchInvoices();
        } else {
          console.error("Người dùng không xác định");
        }

        if (Array.isArray(invoiceData)) {
          this.invoices = invoiceData;
        } else {
          console.error("Dữ liệu hóa đơn không hợp lệ:", invoiceData);
          this.invoices = [];
        }
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
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
  },
};
</script>

<style src="./assets/styles.css" scoped></style>
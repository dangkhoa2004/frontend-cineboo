<template>
<div class="invoice-manager">
  <div class="filter-container">
    <div>
      <label for="status-filter">Trạng thái:</label>
      <select v-model="filters.trangThai">
        <option value="">Tất cả</option>
        <option value="1">Đã thanh toán</option>
        <option value="0">Chưa thanh toán</option>
      </select>
    </div>
    <div>
      <label for="genre-filter">Thể loại phim:</label>
      <select v-model="filters.theLoai">
        <option value="">Tất cả</option>
        <option v-for="genre in uniqueGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>
    <div>
      <label for="movie-filter">Phim:</label>
      <select v-model="filters.tenPhim">
        <option value="">Tất cả</option>
        <option v-for="movie in uniqueMovies" :key="movie" :value="movie">
          {{ movie }}
        </option>
      </select>
    </div>
    <div>
      <label for="customer-filter">Khách hàng:</label>
      <input v-model="filters.khachHang" type="text" placeholder="Tên khách hàng..." style="margin: 0px;" />
    </div>
  </div>

  <div class="button-container">
    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm hoá đơn..." class="search-input" />
  </div>

  <table>
    <thead>
      <tr>
        <th>Mã hoá đơn</th>
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
          <span :class="getStatusClass(invoice.trangThaiHoaDon)">
            {{ getStatusText(invoice.trangThaiHoaDon) }}
          </span>
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
import { fetchInvoices, fetchInvoicesByUserID, approvePayment } from "@/api/invoice";
import { getUserData } from "@/api/authService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      invoices: [],
      searchQuery: "",
      filters: {
        trangThai: "",
        theLoai: "",
        tenPhim: "",
        khachHang: "",
      },
      user: null,
      sortKey: "",
      sortOrder: "asc",
    };
  },
  computed: {
    uniqueGenres() {
      const genres = new Set();
      this.invoices.forEach(invoice => {
        const phim = invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim;
        if (phim) {
          phim.danhSachTLPhims.forEach(item => genres.add(item.theLoaiPhim.tenTheLoai));
        }
      });
      return Array.from(genres);
    },
    uniqueMovies() {
      const movies = new Set();
      this.invoices.forEach(invoice => {
        const phim = invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim;
        if (phim) {
          movies.add(phim.tenPhim);
        }
      });
      return Array.from(movies);
    },
    sortedInvoices() {
      const query = this.searchQuery.toLowerCase();

      let filteredInvoices = this.invoices.filter(invoice => {
        const phim = invoice?.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim;
        const customerName = `${invoice.khachHang.ho} ${invoice.khachHang.tenDem} ${invoice.khachHang.ten}`.toLowerCase();
        const genres = phim?.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai) || [];

        return (
          (this.filters.trangThai === "" || invoice.trangThaiHoaDon.toString() === this.filters.trangThai) &&
          (this.filters.theLoai === "" || genres.includes(this.filters.theLoai)) &&
          (this.filters.tenPhim === "" || (phim && phim.tenPhim === this.filters.tenPhim)) &&
          (this.filters.khachHang === "" || customerName.includes(this.filters.khachHang.toLowerCase())) &&
          (query === "" || invoice.maHoaDon.toLowerCase().includes(query) || customerName.includes(query) || (phim && phim.tenPhim.toLowerCase().includes(query)))
        );
      });

      // Sắp xếp hóa đơn theo thời gian thanh toán từ mới nhất đến cũ nhất
      filteredInvoices.sort((a, b) => {
        const dateA = new Date(...a.thoiGianThanhToan);
        const dateB = new Date(...b.thoiGianThanhToan);
        return dateB - dateA; // Sắp xếp giảm dần
      });

      return filteredInvoices;
    }
  },
  async mounted() {
    await this.loadInvoices();
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 0: return 'sap-chieu';
        case 1: return 'da-chieu';
        case 2: return 'loi';
        case 3: return 'ra-mat';
        case 4: return 'dang-chieu';
        default: return '';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 0: return 'Chưa thanh toán';
        case 1: return 'Đã thanh toán';
        case 2: return 'Đã huỷ';
        case 3: return 'Đã thanh toán và in vé';
        case 4: return 'Đang chờ hoàn tiền';
        default: return '';
      }
    },
    async loadInvoices() {
      try {
        const userData = await getUserData();
        this.user = userData;
        let invoiceData = [];

        // Kiểm tra nếu người dùng là khách hàng
        if (userData.khachHang) {
          invoiceData = await fetchInvoicesByUserID(userData.khachHang.id);

          // Kiểm tra nếu không có hóa đơn nào
          if (invoiceData === null || invoiceData.length === 0) {
            Swal.fire({
              icon: "error",
              title: "Tài khoản chưa có hoá đơn",
              text: "Tài khoản của bạn chưa có hoá đơn nào. Vui lòng thử lại sau.",
            });
          }
        }
        // Kiểm tra nếu người dùng là nhân viên
        else if (userData.nhanVien) {
          invoiceData = await fetchInvoices();
        }

        // Gán dữ liệu hóa đơn vào biến invoices
        this.invoices = Array.isArray(invoiceData) ? invoiceData : [];
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi khi tải dữ liệu hoá đơn",
          text: "Đã xảy ra lỗi khi tải dữ liệu hoá đơn. Vui lòng thử lại sau.",
        });
      }
    },
    formatCurrency(amount) {
      return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
    formatPaymentTime(timeArray) {
      const [year, month, day, hour, minute] = timeArray;
      const date = new Date(year, month - 1, day, hour, minute);
      return date.toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    },
    viewInvoiceDetails(invoice) {
      this.$router.push({ name: "thay-doi-thong-tin-hoa-don", params: { id: invoice.id } });
    },
    sortTable(key) {
      this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
      this.sortKey = key;
    },
  },
};
</script>
<style src="./assets/styles.css" scoped></style>
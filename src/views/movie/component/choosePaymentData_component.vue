<template>
<div id="thong-tin">
  <section class="movie_checkout_content">
    <div class="movie_checkout_details shadow">
      <div class="movie_checkout_details__item">
        <div class="movie_checkout_item__image">
          <img class="movie_checkout_iphone" :src="movieDetails.anhPhim" alt="" />
        </div>
        <div class="movie_checkout_item__details">
          <div class="movie_checkout_item__title">
            <h1>{{ movieDetails.tenPhim }}</h1>
          </div>
          <div class="ticket">
            <div class="movie-info">
              <p><strong>CineBoo Hải Phòng</strong> - RẠP 6</p>
              <p>Suất: <strong>10:45</strong> - Thứ Sáu, 16/10/2024</p>
            </div>
            <hr class="dotted-line" />
            <div class="seat-info">
              <p>
                {{ ticketCount }}x Ghế
                <span class="price">{{ ticketPrice }} ₫</span>
              </p>
              <p>Ghế: {{ getSelectedSeats }}</p>
            </div>
            <hr class="dotted-line" />
            <div class="total-info">
              <p>
                <strong>Tổng cộng</strong><span class="total-price">{{ totalAmount }} ₫</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component hiển thị thông tin khách hàng -->
    <infoCustomerData_component v-model="customerInfo" /> <!-- Truyền và nhận thông tin người dùng -->

    <div class="movie_checkout_container">
      <div class="movie_checkout_actions">
        <a href="#" class="btn draw-border" @click.prevent="handlePayment">TIẾP TỤC THANH TOÁN</a>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import infoCustomerData_component from "./infoCustomerData_component.vue";
import EventBus from "@/store/eventBus.ts"; // Nếu cần dùng EventBus để lưu trữ thông tin
import { createInvoice } from "@/api/invoice"; // Giả sử bạn đã có hàm tạo hóa đơn từ API
import { format } from 'date-fns'; // Định dạng ngày giờ
import { getUserInfo } from "@/api/authService"; // Import hàm lấy thông tin người dùng

export default {
  components: { infoCustomerData_component },
  data() {
    return {
      customerInfo: {}, // Thông tin khách hàng
      ticketPrice: 0, // Giá vé
      selectedSeats: [], // Ghế đã chọn
      movieDetails: {}, // Thông tin phim
      userInfo: {}, // Thông tin người dùng
    };
  },
  computed: {
    getSelectedSeats() {
      return Array.isArray(EventBus.selectedSeats)
        ? EventBus.selectedSeats.join(", ")
        : "";
    },
    totalAmount() {
      return EventBus.totalAmount;
    },
    ticketCount() {
      return EventBus.ticketCount;
    },
  },
  created() {
    this.loadMovieData();
    this.loadSeats();
    this.loadUserInfo(); // Load thông tin người dùng khi component được tạo
  },
  methods: {
    // Nạp dữ liệu phim
    async loadMovieData() {
      const movieId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:8080/phim/find/${movieId}`);
        const movieData = await response.json();
        this.movieDetails = movieData;
      } catch (error) {
        console.error("Lỗi khi nạp dữ liệu phim:", error);
      }
    },

    // Nạp dữ liệu ghế và giá vé
    async loadSeats() {
      const showtimeId = this.$route.params.idSuatChieu;
      try {
        const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`);
        const seatsData = await response.json();
        if (seatsData.length > 0) {
          this.ticketPrice = seatsData[0].giaTien;
        }
      } catch (error) {
        console.error("Lỗi khi nạp dữ liệu ghế:", error);
      }
    },

    // Tải thông tin người dùng
    loadUserInfo() {
      const user = getUserInfo();
      if (user && user.maKhachHang) {
        this.userInfo = user; // Cập nhật thông tin người dùng vào state
        this.customerInfo = user; // Truyền thông tin khách hàng vào component con
      } else {
        console.log("Không có thông tin người dùng.");
        this.$router.push("/login"); // Nếu không có thông tin người dùng, chuyển hướng tới trang đăng nhập
      }
    },

    // Xử lý thanh toán
    async handlePayment() {
      if (!this.userInfo || !this.userInfo.maKhachHang) {
        console.error('Không có thông tin khách hàng');
        return;
      }

      const customerInfo = this.userInfo; // Lấy thông tin từ userInfo đã được cập nhật
      const movieInfo = this.movieDetails;
      if (!movieInfo) {
        console.error('Không có thông tin phim');
        return;
      }

      const currentTime = new Date();
      const formattedTime = format(currentTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

      const invoiceData = {
        D_KhachHang: customerInfo.maKhachHang, // Mã khách hàng
        ID_Phim: movieInfo.id, // ID phim
        ID_PTTT: 1, // ID phương thức thanh toán mặc định là 1
        MaHoaDon: `HD-${formattedTime.replace(/[-T:]/g, '')}`, // Mã hóa đơn, sử dụng thời gian để tạo mã duy nhất
        SoLuong: EventBus.ticketCount, // Số lượng vé
        ThoiGianThanhToan: formattedTime, // Thời gian thanh toán
        TongSoTien: EventBus.totalAmount // Tổng số tiền
      };

      try {
        const invoice = await createInvoice(invoiceData);
        console.log("Hóa đơn đã được tạo:", invoice);
        this.$router.push("/thanh-toan"); // Chuyển hướng đến trang thanh toán
      } catch (error) {
        console.error("Lỗi khi tạo hóa đơn:", error);
      }
    }
  }
};
</script>

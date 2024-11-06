<template>
<div id="thong-tin">
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>THÔNG TIN</h2>
      <div class="date-selector"></div>
    </div>
    <section class="movie_checkout_content">
      <div class="movie_checkout_details shadow">
        <div class="movie_checkout_details__item">
          <div class="movie_checkout_item__image">
            <img class="movie_checkout_iphone" src="@/assets/img/joker.webp" alt="" />
          </div>
          <div class="movie_checkout_item__details">
            <div class="movie_checkout_item__title">
              <h1>Joker: Folie à Deux Điên Có Đôi</h1>
            </div>
            <div class="ticket">
              <div class="movie-info">
                <p><strong>CineBoo Hải Phòng</strong> - RẠP 6</p>
                <p>Suất: <strong>10:45</strong> - Thứ Sáu, 16/10/2024</p>
              </div>
              <hr class="dotted-line" />
              <div class="seat-info">
                <!-- Hiển thị số lượng ghế và giá vé -->
                <p>
                  {{ ticketCount }}x Ghế
                  <span class="price">{{ ticketPrice }} ₫</span>
                </p>
                <p>Ghế: {{ getSelectedSeats }}</p>
              </div>
              <hr class="dotted-line" />
              <div class="total-info">
                <!-- Tính tổng tiền -->
                <p>
                  <strong>Tổng cộng</strong><span class="total-price">{{ totalAmount }} ₫</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infoCustomerData_component />
      <div class="movie_checkout_container">
        <div class="movie_checkout_actions">
          <a href="" class="btn nav_btn draw-border">TIẾP TỤC THANH TOÁN</a>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import infoCustomerData_component from "./infoCustomerData_component.vue";
import EventBus from "@/store/eventBus.ts";

export default {
  components: { infoCustomerData_component },
  data() {
    return {
      ticketPrice: 0,  // Giá vé sẽ được tải từ API
    };
  },
  computed: {
    // Lấy danh sách ghế đã chọn và hiển thị chúng
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
  watch: {
    // Theo dõi sự thay đổi của số lượng ghế và cập nhật ticketCount
    'EventBus.ticketCount': function (newCount) {
      this.ticketCount = newCount;
    },
    // Cập nhật ticketCount khi danh sách ghế thay đổi
    'EventBus.selectedSeats': function () {
      this.ticketCount = EventBus.selectedSeats.length;
    },
  },
  created() {
    this.loadSeats(); // Nạp giá vé khi component được tạo
  },
  methods: {
    async loadSeats() {
      try {
        const showtimeId = this.$route.params.idSuatChieu;
        const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`);
        const seatsData = await response.json();

        // Nếu dữ liệu ghế có trả về giá vé, thì cập nhật ticketPrice
        if (seatsData.length > 0) {
          this.ticketPrice = seatsData[0].giaTien;
        }
      } catch (error) {
        console.error("Lỗi khi nạp dữ liệu ghế từ suất chiếu", error);
      }
    },
  },
};
</script>

<template>
  <div id="chon-ghe"></div>
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>CHỌN GHẾ</h2>
      <div class="date-selector">
        <button>TẤT CẢ</button>
        <button class="inactive">GHẾ VIP</button>
        <button class="inactive">GHẾ THƯỜNG</button>
      </div>
    </div>
    <div class="movie_seat-center">
      <div class="movie_seat-tickets">
        <div class="movie_seat-selector">
          <div class="movie_seat-seats">
            <div class="movie_seat-status">
              <div class="movie_seat-item">Có thể chọn</div>
              <div class="movie_seat-item">Đã chọn</div>
              <div class="movie_seat-item">Đang chọn</div>
              <div class="movie_seat-item">Màn hình</div>
            </div>
            <div class="movie_seat-all-seats">
              <div v-for="(seat, index) in prebookedSeats" :key="index">
                <input
                  type="checkbox"
                  :id="'s' + (index + 1)"
                  v-model="selectedSeats[index]"
                  :disabled="seat.booked"
                />
                <label
                  :for="'s' + (index + 1)"
                  class="movie_seat-seat"
                  :class="{
                    booked: seat.booked,
                    selected: selectedSeats[index],
                  }"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <div class="movie_seat-price">
          <div class="movie_seat-total">
            <span
              ><span class="movie_seat-count">{{ ticketCount }}</span> Vé</span
            >
            <span>Ghế: {{ getSelectedSeats().join(", ") }}</span>
            <div class="movie_seat-amount">Giá: {{ totalAmount }}</div>
          </div>
          <button class="btn nav_btn draw-border">
            <a href="#thong-tin">ĐẶT NGAY</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchSeatsByShowtimeId } from "@/api/movie"; // Import API
import EventBus from "@/store/eventBus";

export default {
  data() {
    return {
      prebookedSeats: [], // Danh sách ghế đã đặt
      selectedSeats: Array(60).fill(false), // Danh sách ghế đã chọn
      ticketCount: 0,
      totalAmount: 0,
      showtimeId: null, // ID của suất chiếu
    };
  },
  created() {
    // Gọi hàm loadSeats nếu showtimeId đã được xác định
    if (this.showtimeId) {
      this.loadSeats(this.showtimeId);
    }
  },
  methods: {
    async loadSeats(showtimeId) {
      try {
        const seatsData = await fetchSeatsByShowtimeId(showtimeId);
        this.prebookedSeats = seatsData.map((seat) => ({ booked: seat.booked })); // Cập nhật ghế đã đặt
      } catch (error) {
        console.error("Component: [Lỗi khi nạp dữ liệu ghế từ suất chiếu]", error);
      }
    },
    updateTicketCountAndAmount() {
      this.ticketCount = this.selectedSeats.filter((seat) => seat).length;
      EventBus.ticketCount = this.ticketCount;
      const ticketPrice = 160000; // Giá vé
      this.totalAmount = this.ticketCount * ticketPrice;
      EventBus.selectedSeats = this.getSelectedSeats();
    },
    getSelectedSeats() {
      return this.selectedSeats
        .map((selected, index) => (selected ? `S${index + 1}` : null))
        .filter((seat) => seat !== null);
    },
  },
  watch: {
    selectedSeats: {
      handler: function () {
        this.updateTicketCountAndAmount();
        EventBus.selectedSeats = this.getSelectedSeats();
      },
      deep: true,
    },
  },
};
</script>

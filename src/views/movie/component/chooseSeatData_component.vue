<template>
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
                <input type="checkbox" :id="'S' + (index + 1)" v-model="selectedSeats[index]" :disabled="seat.booked" />
                <label :for="'S' + (index + 1)" class="movie_seat-seat" :class="{
                  booked: seat.booked,
                  selected: selectedSeats[index],
                }"></label>
              </div>
            </div>
          </div>
        </div>
        <div class="movie_seat-price">
          <div class="movie_seat-total">
            <span><span class="movie_seat-count">{{ ticketCount }}</span> Vé</span>
            <span>Ghế: {{ getSelectedSeats().join(", ") }}</span>
            <div class="movie_seat-amount">Giá: {{ totalAmount }} ₫</div>
          </div>
          <button class="btn nav_btn draw-border" @click="handlePayNow">
            <a id="pay-now">ĐẶT NGAY</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/store/eventBus";
export default {
  data() {
    return {
      prebookedSeats: [],
      selectedSeats: Array(60).fill(false),
      ticketCount: 0,
      totalAmount: 0,
      showtimeId: this.$route.params.idSuatChieu,
    };
  },
  created() {
    if (this.showtimeId) {
      this.loadSeats(this.showtimeId);
    }
  },
  methods: {
    handlePayNow() {
      this.saveSelectedSeats();
      this.$router.push({ name: 'payment' });
    },
    async loadSeats(showtimeId) {
      try {
        const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`);
        const seatsData = await response.json();
        this.prebookedSeats = seatsData.map((seat) => ({
          maGhe: seat.maGhe,
          booked: seat.trangThaiGhe === 1,
        }));
        if (seatsData.length > 0) {
          this.ticketPrice = seatsData[0].giaTien;
        }
      } catch (error) {
        console.error("Component: [Lỗi khi nạp dữ liệu ghế từ suất chiếu]", error);
      }
    },
    updateTicketCountAndAmount() {
      EventBus.ticketCount = this.ticketCount;
      this.ticketCount = this.selectedSeats.filter((seat) => seat).length;
      this.totalAmount = this.ticketCount * this.ticketPrice;
      EventBus.selectedSeats = this.getSelectedSeats();
      EventBus.totalAmount = this.totalAmount;
      EventBus.ticketCount = this.ticketCount;
    },

    getSelectedSeats() {
      return this.selectedSeats
        .map((selected, index) => (selected ? `S${index + 1}` : null))
        .filter((seat) => seat !== null);
    },
  },
  watch: {
    selectedSeats: {
      handler() {
        this.updateTicketCountAndAmount();
      },
      deep: true,
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.showtimeId = to.params.idSuatChieu;
    this.loadSeats(this.showtimeId);
    next();
  },
};
</script>

<!-- chooseSeatData_component.vue -->
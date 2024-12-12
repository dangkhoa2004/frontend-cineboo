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
            <div class="movie_seat-item available">Có thể chọn</div>
            <div class="movie_seat-item selected">Đã chọn</div>
            <div class="movie_seat-item booked">Đã đặt</div>
            <div class="movie_seat-item screen">Màn hình</div>
          </div>
          <div class="movie_seat-all-seats">
            <div v-for="(seat, index) in prebookedSeats" :key="index">
              <input type="checkbox" :id="seat.maGhe" v-model="selectedSeats[index]" :disabled="seat.booked"
                @change="handleSeatChange($event, seat, index)" />
              <label :for="seat.maGhe" class="movie_seat-seat"
                :class="{ booked: seat.booked, selected: selectedSeats[index] }">
                <!-- {{ seat.maGhe }} -->
              </label>
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
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import EventBus from "@/store/eventBus";
import { useRoute } from 'vue-router';
import swal from 'sweetalert';
import { requestWithJWT } from "@/api/api.ts"

const prebookedSeats = ref([]); // Dynamic seat data
const selectedSeats = ref([]); // Seat selection array
const ticketCount = ref(0); // Total selected tickets
const totalAmount = ref(0); // Total price
const ticketPrice = ref(0); // Price per ticket
const showtimeId = ref(useRoute().params.idSuatChieu); // Access the showtime ID from route

// Mock data for 60 seats before fetching real data
const mockSeats = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  maGhe: `S${index + 1}`,
  giaTien: 50000, // Giả sử mỗi ghế có giá 50,000
  id_PhongChieu: 1,
  trangThaiGhe: "AVAILABLE", // Tình trạng ghế có thể thay đổi
  booked: false,
}));

// Load seat data from the database
const loadSeats = async (showtimeId) => {
  try {
    // Temporarily use mock data
    prebookedSeats.value = mockSeats;
    selectedSeats.value = Array(mockSeats.length).fill(false); // Reset selected seats

    const token = sessionStorage.getItem("token").slice(1, -1);
    const response = await requestWithJWT("get", `http://localhost:8080/ghe/findWithBooking/${showtimeId}`);
    const seatsData = response.data;

    if (seatsData.length == 0) {
      return;
    }

    // Update with real data
    prebookedSeats.value = seatsData
      .map((seat) => ({
        id: seat.id,
        maGhe: seat.maGhe,
        giaTien: seat.giaTien,
        id_PhongChieu: seat.id_PhongChieu,
        trangThaiGhe: seat.trangThaiGhe,
        booked: seat.trangThaiGheAndSuatChieu === 1 || seat.trangThaiGheAndSuatChieu == 2,
      }))
      .sort((a, b) => {
        const numA = parseInt(a.maGhe.replace(/\D/g, ""), 10);
        const numB = parseInt(b.maGhe.replace(/\D/g, ""), 10);
        return numA - numB;
      });

    ticketPrice.value = seatsData[0].giaTien;
  } catch (error) {
    console.error("Error loading seats:", error);
  }
};

// Method to (un)check inputs and dealing with lists
const handleSeatChange = (event, seat, index) => {
  if (!validateSeatSelection()) {
    event.target.checked = !event.target.checked;
    selectedSeats.value[index] = !selectedSeats.value[index];
  }
};

// Method to check seat selection logic
const validateSeatSelection = () => {
  const selectedList = getSelectedSeats();
  if (selectedList.length == 1) {
    let numberPart = selectedList[0].replace(/\D/g, '');
    numberPart++;
    if (numberPart % 10 === 0) {
      swal("Oops", "Bạn không thể bỏ trống một ghế ở đầu dãy", "error");
      return false;
    }
    numberPart--;
    numberPart--;
    numberPart--;
    if (numberPart % 10 === 0) {
      swal("Oops", "Bạn không thể bỏ trống một ghế ở đầu dãy", "error");
      return false;
    }
  }
  if (selectedList.length == 2) {
    const previous = selectedList[selectedList.length - 1].replace(/\D/g, '');
    const next = selectedList[selectedList.length - 2].replace(/\D/g, '');
    if (Math.abs(previous - next) == 2) {
      swal("Oops", "Bạn không thể để trống một ghế ở giữa", "error");
      return false;
    }
  }
  return true;
};

// Update ticket count and total amount
const updateTicketCountAndAmount = () => {
  ticketCount.value = selectedSeats.value.filter((seat) => seat).length;
  totalAmount.value = ticketCount.value * ticketPrice.value;

  // Sync with EventBus
  EventBus.selectedSeats = getSelectedSeats();
  EventBus.ticketCount = ticketCount.value;
  EventBus.totalAmount = totalAmount.value;
};

// Get selected seat codes
const getSelectedSeats = () => {
  return selectedSeats.value
    .map((isSelected, index) => (isSelected ? prebookedSeats.value[index].maGhe : null))
    .filter((seat) => seat !== null);
};

// Watch for changes in seat selection
watch(selectedSeats, (newSelectedSeats) => {
  // Update ticket count and amount
  updateTicketCountAndAmount();
}, { deep: true });

// Fetch seat data on mount
onMounted(() => {
  if (showtimeId.value) {
    loadSeats(showtimeId.value);
  }
});
</script>


<style scoped>
.movie_seat-seat {
  user-select: none;
  /* Disable text selection */
  -webkit-user-select: none;
  /* For WebKit browsers */
  -ms-user-select: none;
  /* For older IE versions */
}

input[type="checkbox"] {
  display: none;
  /* Hide the checkbox to make the label the clickable area */
}
</style>

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
        </div>
      </div>
    </div>
  </div>
</template>

<<script setup>
import { ref, watch, onMounted } from 'vue';
import EventBus from "@/store/eventBus";
import { useRoute } from 'vue-router';
// State variables using `ref`
const prebookedSeats = ref([]);
const selectedSeats = ref(Array(60).fill(false));
const ticketCount = ref(0);
const totalAmount = ref(0);
const ticketPrice = ref(0);
const showtimeId = ref(useRoute().params.idSuatChieu); // Accessing the route params directly
 // Access the route params directly

// Function to load seats data
const loadSeats = async (showtimeId) => {
  try {
	  let token = sessionStorage.getItem('token');
	  token = token.substring(1,token.length-1);
	  
   // const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0azEiLCJleHAiOjE3MzI4NzI0MDAsImlhdCI6MTczMjg2ODgwMH0.NKSBsbLc6RgKQozMHl_q3mh6gbUsYfOg7Kk4Xgl_45-Z1ONRAGjl34mPoZtION5lArqLs9MRK_BhfQy1t9P6Lw"; // Replace with actual token
    const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });

    const seatsData = await response.json();
    prebookedSeats.value = seatsData.map((seat) => ({
      maGhe: seat.maGhe,
      booked: seat.trangThaiGhe === 1,
    }));

    if (seatsData.length > 0) {
      ticketPrice.value = seatsData[0].giaTien;
    }
  } catch (error) {
    console.error("Component: [Lỗi khi nạp dữ liệu ghế từ suất chiếu]", error);
  }
};

// Update ticket count and total amount
const updateTicketCountAndAmount = () => {
  EventBus.ticketCount = ticketCount.value;
  ticketCount.value = selectedSeats.value.filter((seat) => seat).length;
  totalAmount.value = ticketCount.value * ticketPrice.value;
  EventBus.selectedSeats = getSelectedSeats();
  EventBus.totalAmount = totalAmount.value;
  EventBus.ticketCount = ticketCount.value;
};

// Get selected seats as an array of seat codes
const getSelectedSeats = () => {
  return selectedSeats.value
    .map((selected, index) => (selected ? `S${index + 1}` : null))
    .filter((seat) => seat !== null);
};

// Watch for changes in selected seats and update ticket count and amount
watch(selectedSeats, updateTicketCountAndAmount, { deep: true });

// Fetch seats when the component is mounted
onMounted(() => {
  if (showtimeId.value) {
    loadSeats(showtimeId.value);
  }
});

// Handle route updates and reload seats based on new showtimeId
const beforeRouteUpdate = (to, from, next) => {
  showtimeId.value = to.params.idSuatChieu;
  loadSeats(showtimeId.value);
  next();
};
</script>

<!-- chooseSeatData_component.vue -->
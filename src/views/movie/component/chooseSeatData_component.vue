<!--
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

<script setup>
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
-->
<!-- chooseSeatData_component.vue -->

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
                <input
                  type="checkbox"
                  :id="seat.maGhe"
                  v-model="selectedSeats[index]"
                  :disabled="seat.booked"
                />
                <label
                  :for="seat.maGhe"
                  class="movie_seat-seat"
                  :class="{ booked: seat.booked, selected: selectedSeats[index] }"
                >
                  {{ seat.maGhe }}
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

const prebookedSeats = ref([]); // Dynamic seat data
const selectedSeats = ref([]); // Seat selection array
const ticketCount = ref(0); // Total selected tickets
const totalAmount = ref(0); // Total price
const ticketPrice = ref(0); // Price per ticket
const showtimeId = ref(useRoute().params.idSuatChieu); // Access the showtime ID from route

// Load seat data from the database
const loadSeats = async (showtimeId) => {
  try {
    const token = sessionStorage.getItem("token").slice(1, -1);
    const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const seatsData = await response.json();
    prebookedSeats.value = seatsData
      .map((seat) => ({
        maGhe: seat.maGhe,
        booked: seat.trangThaiGhe === 1,
      }))
      .sort((a, b) => {
        const numA = parseInt(a.maGhe.replace(/\D/g, ""), 10); // Extract numeric part
        const numB = parseInt(b.maGhe.replace(/\D/g, ""), 10); // Extract numeric part
        return numA - numB; // Sort numerically
      });

    selectedSeats.value = Array(prebookedSeats.value.length).fill(false);

    if (seatsData.length > 0) {
      ticketPrice.value = seatsData[0].giaTien;
    }
  } catch (error) {
    console.error("Error loading seats:", error);
  }
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
watch(selectedSeats, updateTicketCountAndAmount, { deep: true });

// Fetch seat data on mount
onMounted(() => {
  if (showtimeId.value) {
    loadSeats(showtimeId.value);
  }
});
</script>

<style scoped>
.movie_seat-seat {
  user-select: none; /* Disable text selection */
  -webkit-user-select: none; /* For WebKit browsers */
  -ms-user-select: none; /* For older IE versions */
}



input[type="checkbox"] {
  display: none; /* Hide the checkbox to make the label the clickable area */
}
</style>



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
  @change="handleSeatChange($event, seat,index)"
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
import swal from 'sweetalert';

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

//Method to (un)check inputs and dealing with lists
const handleSeatChange = (event, seat, index) => {
 

  if (!validateSeatSelection()) {//Say user select S24,25,26 and unselect S25. S25 will magically(?) uncheck itself
  //which i dunno how to fix, so i will just check the checkbox again
  //Which equally makes the input go back to the state before user input(removing S25)
	event.target.checked = !event.target.checked; 
	selectedSeats.value[index] = !selectedSeats.value[index]; 
  }
};

//Method to check seat selection logic
const validateSeatSelection = () => {
	//All of this will assume that all seats are distributed in 10 columns
	const selectedList = getSelectedSeats(); 
	console.log(selectedList);
	if(selectedList.length==1){
		//Check edge
		//get number part
		let numberPart = selectedList[0].replace(/\D/g,'');
		numberPart++;
		if(numberPart % 10 === 0){// If the selected seat is next to right edge and is the only one selected
		swal ( "Oops" ,  "Bạn không thể bỏ trống một ghế ở đầu dãy" ,  "error" )
			return false;
		}
		numberPart--;
		numberPart--;
		numberPart--;
		console.log("AFTER DECREASE" +numberPart);
		if(numberPart % 10 === 0){// If the selected seat is next to right edge and is the only one selected
		swal ( "Oops" ,  "Bạn không thể bỏ trống một ghế ở đầu dãy" ,  "error" )
			return false;
		}
	} 
	if( selectedList.length==2){
		console.log(" 2 seats");
		const previous = selectedList[selectedList.length-1].replace(/\D/g,'');
		const next = selectedList[selectedList.length-2].replace(/\D/g,'');
		console.log(Math.abs(previous-next));
		if(Math.abs(previous-next)==2){// Allow two seats inbetween, but not one
			swal ( "Oops" ,  "Bạn không thể để trống một ghế ở giữa" ,  "error" )
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
  user-select: none; /* Disable text selection */
  -webkit-user-select: none; /* For WebKit browsers */
  -ms-user-select: none; /* For older IE versions */
}



input[type="checkbox"] {
  display: none; /* Hide the checkbox to make the label the clickable area */
}
</style>


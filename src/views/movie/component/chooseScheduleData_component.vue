<template>
  <div id="lich-chieu"></div>
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>Lịch Chiếu</h2>
      <div class="date-selector">
        <button @click="fetchShowtimes(selectedMovieId, currentDate)">
          Hôm Nay <br />
          {{ currentDate }}
        </button>
        <button
          v-for="date in availableDates"
          :key="date"
          @click="fetchShowtimes(selectedMovieId, date)"
        >
          {{ formatDate(date) }} <br />
          {{ getDayOfWeek(date) }}
        </button>
      </div>
      <div class="filter-options">
        <select
          v-model="selectedStreet"
          @change="fetchShowtimes(selectedMovieId, currentDate)"
        >
          <option>Toàn quốc</option>
          <option>Hải Phòng</option>
          <option>Hà Nội</option>
        </select>
        <select
          v-model="selectedTheater"
          @change="fetchShowtimes(selectedMovieId, currentDate)"
        >
          <option>Tất cả rạp</option>
          <option>CineBoo Nguyễn Du</option>
          <option>CineBoo Sala</option>
        </select>
      </div>
    </div>
    <div v-for="theater in showtimes" :key="theater.name" class="theater-section">
      <div class="theater-name">{{ theater.name }}</div>
      <div class="movie-format">{{ theater.format }}</div>
      <div class="time-buttons">
        <button
          v-for="time in theater.showtimes"
          :key="time"
          @click="bookTicket(theater.id, time)"
        >
          {{ time }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchShowtimesByMovieIdForWeek, fetchSeatsByShowtimeId } from "@/api/movie";

export default {
  setup() {
    const showtimes = ref([]);
    const availableDates = ref([]); // Danh sách các ngày có lịch chiếu
    const selectedStreet = ref("Toàn quốc");
    const selectedTheater = ref("Tất cả rạp");
    const selectedMovieId = ref(""); // ID của phim được truyền vào
    const currentDate = new Date().toISOString().split("T")[0]; // Ngày hiện tại

    const fetchShowtimes = async (movieId, date) => {
      selectedMovieId.value = movieId;
      try {
        const response = await fetchShowtimesByMovieIdForWeek(movieId);
        showtimes.value = response.showtimes; // Cập nhật lịch chiếu
        availableDates.value = response.availableDates; // Lưu các ngày có lịch chiếu
      } catch (error) {
        console.error("Component [Lỗi khi xử lý dữ liệu lịch chiếu]:", error);
      }
    };

    const fetchSeats = async (showtimeId) => {
      try {
        const seatsData = await fetchSeatsByShowtimeId(showtimeId); // Gọi hàm fetch ghế
        // Bạn có thể thực hiện các thao tác cần thiết với dữ liệu ghế
        console.log("Ghế cho suất chiếu:", seatsData);
      } catch (error) {
        console.error("Lỗi khi fetch ghế:", error);
      }
    };

    const bookTicket = (theaterId, showtime) => {
      // Giả sử bạn đã có cách để lấy showtimeId từ theaterId và showtime
      const showtimeId = `${theaterId}-${showtime}`; // Ví dụ, bạn cần định nghĩa cách này
      fetchSeats(showtimeId); // Fetch ghế sau khi đặt vé
    };

    // Hàm định dạng ngày tháng
    const formatDate = (date) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    };

    // Hàm lấy ngày trong tuần
    const getDayOfWeek = (date) => {
      const dayNames = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];
      return dayNames[new Date(date).getDay()];
    };

    onMounted(() => {
      fetchShowtimes(selectedMovieId.value, currentDate); // Lấy lịch chiếu khi component được mount
    });

    return {
      showtimes,
      availableDates,
      selectedStreet,
      selectedTheater,
      fetchShowtimes,
      currentDate,
      formatDate,
      getDayOfWeek,
      bookTicket, // Đừng quên trả về bookTicket
    };
  },
};
</script>

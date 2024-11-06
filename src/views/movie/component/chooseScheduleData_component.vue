<template>
<div class="schedule-container">
  <div class="schedule-header">
    <h2>Lịch Chiếu</h2>
    <div class="date-selector">
      <button v-for="(date, index) in sevenDays" :key="date" @click="updateSelectedDate(date)"
        :disabled="new Date(date) < new Date(currentDate)">
        <div>{{ formatDate(date) }}</div>
        <div v-if="date !== currentDate">{{ getDayOfWeek(date) }}</div>
        <div v-else>{{ `Hôm nay` }}</div>
      </button>
    </div>
    <div class="filter-options">
      <select v-model="selectedStreet" @change="filterShowtimes">
        <option>Toàn quốc</option>
        <option>Hải Phòng</option>
        <option>Hà Nội</option>
      </select>
      <select v-model="selectedTheater" @change="filterShowtimes">
        <option>Tất cả rạp</option>
        <option>CineBoo Nguyễn Du</option>
        <option>CineBoo Sala</option>
      </select>
    </div>
  </div>
  <div v-if="filteredShowtimes.length === 0">
    <p>Chưa có dữ liệu suất chiếu.</p>
  </div>
  <div v-for="theater in filteredShowtimes" :key="theater.phongChieu?.id || 'unknown'" class="date-selector">
    <button class="theater-info-button" style="margin-top: 20px; gap: 20px;" @click="logTheaterInfo(theater)">
      <div class="theater-name">Phòng Chiếu: {{ theater.phongChieu?.maPhong || '(chưa có)' }}</div>
      <div class="movie-format">Suất Chiếu: {{ theater.maSuatChieu || '(chưa có)' }}</div>
      <div class="movie-format">Thời gian chiếu: {{ formatTime(theater.thoiGianChieu) }}</div>
      <div class="movie-format">Ngày chiếu: {{ formatDate(theater.thoiGianChieu) }}</div>
    </button>
  </div>
</div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // import useRouter
import { fetchShowtimesByMovieId } from "@/api/movie";

export default {
  setup() {
    const showtimes = ref([]);
    const filteredShowtimes = ref([]);
    const selectedStreet = ref("Toàn quốc");
    const selectedTheater = ref("Tất cả rạp");
    const selectedMovieId = ref("");
    const currentDate = new Date().toISOString().split("T")[0];
    const selectedDate = ref(currentDate);

    const route = useRoute();
    const router = useRouter(); // initialize router
    selectedMovieId.value = route.params.id;

    const sevenDays = computed(() => {
      const dates = [];
      const today = new Date();
      for (let i = -2; i <= 2; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    });

    const fetchShowtimes = async (movieId) => {
      try {
        const response = await fetchShowtimesByMovieId(movieId);
        if (Array.isArray(response) && response.length) {
          showtimes.value = response.map(theater => {
            if (Array.isArray(theater.thoiGianChieu)) {
              const [year, month, day, hour, minute] = theater.thoiGianChieu;
              theater.thoiGianChieu = new Date(year, month - 1, day, hour, minute).toISOString();
            }
            return theater;
          });
          filteredShowtimes.value = showtimes.value;
        } else {
          showtimes.value = [];
          console.error("Không tìm thấy dữ liệu suất chiếu.");
        }
      } catch (error) {
        showtimes.value = [];
        console.error("Lỗi khi xử lý dữ liệu lịch chiếu:", error);
      }
    };

    const filterShowtimes = () => {
      filteredShowtimes.value = showtimes.value.filter(theater => {
        const showtimeDate = new Date(theater.thoiGianChieu).toISOString().split("T")[0];
        return showtimeDate === selectedDate.value;
      });
    };

    const updateSelectedDate = (date) => {
      if (date === selectedDate.value) {
        filteredShowtimes.value = showtimes.value;
      } else {
        selectedDate.value = date;
        filterShowtimes();
      }
    };

    const logTheaterInfo = (theater) => {
      const suatChieuId = theater.id;
      if (suatChieuId) {
        router.push(`/phim/${selectedMovieId.value}/suat-chieu/${suatChieuId}`);
      } else {
        console.error("Không tìm thấy mã suất chiếu.");
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });
    };

    const formatTime = (date) => {
      const time = new Date(date);
      return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
    };

    const getDayOfWeek = (date) => {
      const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      return dayNames[new Date(date).getDay()];
    };

    onMounted(() => {
      if (selectedMovieId.value) {
        fetchShowtimes(selectedMovieId.value);
      } else {
        console.error("Không tìm thấy ID phim.");
      }
    });

    return {
      showtimes,
      filteredShowtimes,
      selectedStreet,
      selectedTheater,
      selectedDate,
      fetchShowtimes,
      filterShowtimes,
      currentDate,
      sevenDays,
      formatDate,
      formatTime,
      getDayOfWeek,
      logTheaterInfo,
      updateSelectedDate,
    };
  },
};
</script>
<style scoped>
button:disabled {
  background-color: #ffffff;
  color: black;
  cursor: not-allowed;
}
</style>
<!-- chooseScheduleData_component.vue -->
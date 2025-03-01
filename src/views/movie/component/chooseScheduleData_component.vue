<template>
<div class="schedule-container">
  <div class="schedule-header">
    <h2>Lịch Chiếu</h2>
    <div class="date-selector">
      <button v-for="(date, index) in sevenDays" :key="index" @click="updateSelectedDate(date)"
        :disabled="new Date(date) < new Date(currentDate)" :class="{ active: date === selectedDate.value }">
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
  <div v-for="theater in filteredShowtimes" :key="theater.id || theater.phongChieu?.id || 'unknown'">
    <button class="showTime_button" @click="logTheaterInfo(theater)">
      <div class="showTime_room">Phòng Chiếu: {{ theater.phongChieu?.maPhong }}</div>
      <div class="showTime_code">Suất Chiếu: {{ theater.maSuatChieu }}</div>
      <div class="showTime_time">Thời gian chiếu: {{ formatTime(theater.thoiGianChieu) }}</div>
    </button>
  </div>
</div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchShowtimesByMovieIdApiClient } from "@/api/movie";
import { requestWithJWT } from "@/api/api";
import { isLoggedIn } from "@/api/authService";
import Swal from "sweetalert2";

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
    const router = useRouter();
    selectedMovieId.value = route.params.id;

    const sevenDays = computed(() => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    });

    const fetchShowtimes = async (movieId) => {
      try {
        const response = await fetchShowtimesByMovieIdApiClient(movieId);
        if (Array.isArray(response) && response.length) {
          showtimes.value = response.map(theater => {
            if (typeof theater.thoiGianChieu === 'string') {
              theater.thoiGianChieu = new Date(new Date(theater.thoiGianChieu).getTime() + 7 * 60 * 60 * 1000);
            } else if (Array.isArray(theater.thoiGianChieu)) {
              const [year, month, day, hour, minute] = theater.thoiGianChieu;
              theater.thoiGianChieu = new Date(year, month - 1, day, hour, minute);
              theater.thoiGianChieu.setHours(theater.thoiGianChieu.getHours());
            }
            return theater;
          });

          const phongChieuPromises = showtimes.value.map(async (theater) => {
            const tempSuatChieuId = theater.id;
            if (tempSuatChieuId) {
              try {
                const phongChieuResponse = await requestWithJWT(
                  'get',
                  `http://localhost:8080/phongchieu/find/suatchieu/${tempSuatChieuId}`
                );
                if (phongChieuResponse && phongChieuResponse.status === 200) {
                  const data = phongChieuResponse.data;
                  theater.phongChieu = {
                    id: data.id || -1,
                    maPhong: data.maPhong || "",
                    tongSoGhe: data.tongSoGhe || 0,
                    trangThaiPhongChieu: data.trangThaiPhongChieu || 0,
                  };
                } else {
                }
              } catch (error) {
                theater.phongChieu = {
                  id: -1,
                  maPhong: "",
                  tongSoGhe: 0,
                  trangThaiPhongChieu: 0,
                };
              }
            }
            return theater;
          });

          showtimes.value = await Promise.all(phongChieuPromises);
          filterShowtimes();
        } else {
          showtimes.value = [];
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không tìm thấy suất chiếu.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải lịch chiếu.",
        });
      }
    };
    const filterShowtimes = () => {
      const currentTime = new Date();
      filteredShowtimes.value = showtimes.value
        .filter(theater => {
          const showtimeDate = new Date(theater.thoiGianChieu);
          // Kiểm tra xem suất chiếu có sau thời gian hiện tại không
          return showtimeDate > currentTime && showtimeDate.toISOString().split("T")[0] === selectedDate.value;
        })
        .sort((a, b) => new Date(a.thoiGianChieu) - new Date(b.thoiGianChieu)); // Sắp xếp theo thời gian tăng dần
    };
    const updateSelectedDate = (date) => {
      selectedDate.value = date;
      filterShowtimes();
    };

    const logTheaterInfo = (theater) => {
      if (!isLoggedIn()) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Bạn cần đăng nhập để xem được suất chiếu.",
          showCancelButton: true,
          confirmButtonText: "Đăng nhập",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/dang-nhap';
          }
        });
        return;
      } const suatChieuId = theater.id;
      if (suatChieuId) {
        router.push(`/phim/${selectedMovieId.value}/suat-chieu/${suatChieuId}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không tìm thấy suất chiếu.",
        });
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
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Lỗi khi tìm thông tin phim.",
        });
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
.showTime_button {
  background-color: var(--first-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.showTime_room,
.showTime_code,
.showTime_time {
  font-size: 13.33px;
  margin-bottom: 10px;
  color: white;
}
</style>
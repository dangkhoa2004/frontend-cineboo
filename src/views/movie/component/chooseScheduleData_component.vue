<template>
<div class="schedule-container">
  <div class="schedule-header">
    <h2>Lịch Chiếu</h2>
    <div class="date-selector">
      <button v-for="(date, index) in sevenDays" :key="index" @click="updateSelectedDate(date)"
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
  <div v-for="theater in filteredShowtimes" :key="theater.id || theater.phongChieu?.id || 'unknown'"
    class="date-selector">
    <button class="theater-info-button" style="margin-top: 20px; gap: 20px;" @click="logTheaterInfo(theater)">
      <div class="theater-name">Phòng Chiếu: {{ theater.phongChieu?.maPhong || '(chưa có)' }}</div>
      <div class="movie-format">Suất Chiếu: {{ theater.maSuatChieu || '(chưa có)' }}</div>
      <div class="movie-format">Thời gian chiếu: {{ formatTime(theater.thoiGianChieu) }}</div>
    </button>
  </div>
</div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchShowtimesByMovieId } from "@/api/movie";
import { requestWithJWT } from "@/api/api";
import { isLoggedIn } from "@/api/authService";

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
        const response = await fetchShowtimesByMovieId(movieId);
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
          // Fetch and append specific PhongChieu fields
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
                  throw new Error("PhongChieu fetch failed");
                }
              } catch (error) {
                // Fallback values in case of failure
                theater.phongChieu = {
                  id: -1,
                  maPhong: "(chưa có)",
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
          console.error("Không tìm thấy dữ liệu suất chiếu.");
        }
      } catch (error) {
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
      selectedDate.value = date;
      filterShowtimes();
    };

    const logTheaterInfo = (theater) => {
      if (!isLoggedIn()) {
        alert("Bạn cần đăng nhập để xem chi tiết suất chiếu.");
        router.push("/dang-nhap");  // Navigate to the login page
        return;
      }

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

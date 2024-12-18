<template>
<section class="section booking_section">
  <form class="booking_form" @submit.prevent="bookTicket">
    <div class="input_box">
      <div class="input_with_icon">
        <i class="fas fa-film"></i>
        <select id="input_movie" v-model="selectedMovie">
          <option value="" disabled>CHỌN PHIM</option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.tenPhim }}
          </option>
        </select>
      </div>
    </div>
    <div class="input_box">
      <div class="input_with_icon">
        <i class="fa-solid fa-clock"></i>
        <select class="input_movie" id="input_showtime" v-if="filteredShowtimes.length" v-model="selectedShowtime">
          <option value="" disabled>CHỌN GIỜ CHIẾU</option>
          <option v-for="time in filteredShowtimes" :key="time.id" :value="time.id">
            {{ formatDate(time.thoiGianChieu) }}
          </option>
        </select>
        <p v-else class="">Không có suất chiếu khả dụng.</p>
      </div>
    </div>
    <div class="input_box">
      <div class="input_with_icon">
        <i class="fa-solid fa-ticket"></i>
        <input type="text" id="input_theater" placeholder="CHỌN RẠP" value="CineBoo Cinema Hải Phòng" readonly />
      </div>
    </div>
    <div class="input_box">
      <button type="submit" class="btn">Đặt vé ngay</button>
    </div>
  </form>
</section>
</template>

<script>
import { fetchMoviesApiClient } from "@/api/movie";
import axios from "axios";

export default {
  data() {
    return {
      movies: [],
      selectedMovie: "",
      showtimes: [],
      selectedShowtime: "",
    };
  },
  computed: {
    filteredShowtimes() {
      const now = new Date();
      return this.showtimes
        .filter(showtime => {
          const [year, month, day, hours, minutes] = showtime.thoiGianChieu;
          const showtimeDate = new Date(year, month - 1, day, hours, minutes);
          return showtimeDate >= now;
        })
        .sort((a, b) => {
          const [yearA, monthA, dayA, hoursA, minutesA] = a.thoiGianChieu;
          const [yearB, monthB, dayB, hoursB, minutesB] = b.thoiGianChieu;
          const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA);
          const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB);
          return dateA - dateB;
        });
    }
  },
  async mounted() {
    await this.loadMovies();
  },
  watch: {
    async selectedMovie(newMovieId) {
      if (newMovieId) {
        await this.fetchShowtimes(newMovieId);
      } else {
        this.showtimes = [];
      }
    },
  },
  methods: {
    async loadMovies() {
      try {
        const movieData = await fetchMoviesApiClient();
        this.movies = movieData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      }
    },
    async fetchShowtimes(movieId) {
      try {
        const response = await axios.get(`http://localhost:8080/suatchieu/find/ID_Phim/${movieId}`);
        this.showtimes = response.data;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu suất chiếu:", error);
        this.showtimes = [];
      }
    },
    formatDate(dateArray) {
      const [year, month, day, hours, minutes] = dateArray;
      return `ngày ${day} - ${month} - ${year} chiếu ${hours}:${minutes.toString().padStart(2, '0')}`;
    },
    bookTicket() {
      if (this.selectedMovie && this.selectedShowtime) {
        const movieId = this.selectedMovie;
        const showtimeId = this.selectedShowtime;

        // Chuyển hướng đến trang đặt vé với ID phim và ID suất chiếu
        this.$router.push(`/phim/${movieId}/suat-chieu/${showtimeId}`);
      } else {
        alert("Vui lòng chọn phim và suất chiếu!");
      }
    },
  },
};
</script>
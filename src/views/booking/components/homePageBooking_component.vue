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
        <select class="input_movie" id="input_showtime" v-if="showtimes.length" v-model="selectedShowtime">
          <option value="" disabled>CHỌN GIỜ CHIẾU</option>
          <option v-for="time in showtimes" :key="time.id" :value="time.id">
            {{ time.thoiGianChieu }}
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
import { fetchMovies } from "@/api/movie";
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
        const movieData = await fetchMovies();
        this.movies = movieData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      }
    },
    async fetchShowtimes(movieId) {
      try {
        const response = await axios.get(`http://localhost:8080/suatchieu/find/phim.maPhim/${movieId}`);
        this.showtimes = response.data;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu suất chiếu:", error);
        this.showtimes = [];
      }
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

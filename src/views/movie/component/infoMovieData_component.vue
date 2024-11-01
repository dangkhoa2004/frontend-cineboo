<template>
  <div class="booking-movie-info">
    <div class="booking-container" v-if="movie">
      <div class="booking-movie-poster">
        <img :src="movie.posterUrl" alt="Movie Poster" />
        <button class="btn nav_btn draw-border">
          <a href="#lich-chieu">ĐẶT NGAY</a>
        </button>
      </div>
      <div class="booking-movie-info">
        <h1 class="booking-movie-title">
          <span>{{ movie.title }}</span>
        </h1>
        <div class="booking-movie-meta">
          <span class="booking-duration">{{ movie.duration }} Phút</span>
          <span class="booking-release-date">{{ movie.releaseDate }}</span>
          <span class="booking-rating"
            >{{ movie.rating }} <span>({{ movie.votes }} votes)</span></span
          >
        </div>
        <div class="booking-movie-details">
          <p>
            <strong>Quốc gia:</strong>
            <span>{{ movie.country }}</span>
          </p>
          <p>
            <strong>Nhà sản xuất:</strong>
            <span>{{ movie.producer.join(", ") }}</span>
          </p>
          <p>
            <strong>Thể loại:</strong>
            <span>{{ movie.genres.join(", ") }}</span>
          </p>
          <p>
            <strong>Đạo diễn:</strong>
            <span>{{ movie.director }}</span>
          </p>
          <p>
            <strong>Diễn viên:</strong> <span>{{ movie.cast.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="booking-movie-desc" v-if="movie">
      <h2>Nội dung</h2>
      <p>{{ movie.description }}</p>
    </div>
  </div>
</template>

<script>
import { fetchMovieById } from "@/api/movie.ts";

export default {
  data() {
    return {
      movie: null,
    };
  },
  mounted() {
    this.fetchMovieData(this.$route.params.id);
  },
  methods: {
    async fetchMovieData(movieId) {
      try {
        this.movie = await fetchMovieById(movieId);
      } catch (error) {
        console.error("Component [Lỗi khi xử lý dữ liệu]:", error);
      }
    },
  },
};
</script>

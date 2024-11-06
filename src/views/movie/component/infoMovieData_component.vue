<template>
  <div class="booking-movie-info">
    <div class="booking-container" v-if="movie">
      <div class="booking-movie-poster">
        <img :src="movie.anhPhim" alt="Movie Poster" />
        <button class="btn draw-border">
          <a>ĐẶT NGAY</a>
        </button>
      </div>
      <div class="booking-movie-info">
        <h1 class="booking-movie-title">
          <span>{{ movie.tenPhim }}</span>
        </h1>
        <div class="booking-movie-meta">
          <span class="booking-duration">{{ movie.thoiLuong }} Phút</span>
          <span class="booking-release-date">{{ formattedReleaseDate }}</span>
          <span class="booking-rating">{{ movie.danhGia || 'Chưa có đánh giá' }}</span>
        </div>
        <div class="booking-movie-details">
          <p><strong>Quốc gia:</strong> <span>{{ movie.quocGia }}</span></p>
          <p><strong>Thể loại:</strong> <span>{{ genres }}</span></p>
          <p><strong>Đạo diễn:</strong> <span>{{ movie.daoDien }}</span></p>
          <p><strong>Diễn viên:</strong> <span>{{ movie.dienVien }}</span></p>
        </div>
      </div>
    </div>
    <div class="booking-movie-desc" v-if="movie">
      <h2>Nội dung</h2>
      <p>{{ movie.noiDung }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchMovieById } from "@/api/movie";

export default {
  name: "BookingMovieInfo",
  setup() {
    const route = useRoute();
    const movie = ref(null);
    const genres = computed(() => {
      if (movie.value) {
        return movie.value.danhSachTLPhims
          .map((item) => item.theLoaiPhim.tenTheLoai)
          .join(", ");
      }
      return "";
    });

    const formattedReleaseDate = computed(() => {
      if (movie.value && movie.value.ngayRaMat) {
        return new Date(movie.value.ngayRaMat).toLocaleDateString();
      }
      return "";
    });

    const fetchMovieData = async (movieId) => {
      try {
        const data = await fetchMovieById(movieId);
        movie.value = data;
      } catch (error) {
        console.error("Component [Lỗi khi xử lý dữ liệu]:", error);
      }
    };

    onMounted(() => {
      const movieId = route.params.id;
      if (movieId) {
        fetchMovieData(movieId);
      } else {
        console.error("No movie ID found in route parameters.");
      }
    });

    return {
      movie,
      genres,
      formattedReleaseDate,
    };
  },
};
</script>

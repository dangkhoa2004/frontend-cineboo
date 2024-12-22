<template>
<div class="booking-movie-info">
  <div class="booking-container" v-if="movie">
    <div class="booking-movie-poster">
      <img :src="movie.anhPhim" alt="Movie Poster" />
    </div>
    <div class="booking-movie-info">
      <h1 class="booking-movie-title">
        <span>&#8203;{{ movie.tenPhim }}</span>
      </h1>
      <div class="booking-movie-meta">
        <span class="booking-duration">&#8203;{{ movie.thoiLuong }} Phút</span>
        <span class="booking-release-date">Ngày ra mắt: {{ formattedReleaseDate }}</span>
        <span class="booking-rating">{{ movie.danhGia || 'Chưa có đánh giá' }}</span>
      </div>
      <div class="booking-movie-details">
        <p><strong>Quốc gia: </strong> <span>{{ movie.quocGia }}</span></p>
        <p><strong>Thể loại: &#8203;</strong> <span>{{ genres }}</span></p>
        <p><strong>Rating : &#8203; </strong> <span>{{ movie.diem }}</span></p>
        <p><strong>Diễn viên:</strong> <span>{{ movie.dienVien }}</span></p>
      </div>
      <div class="booking-movie-desc" v-if="movie">
        <p>{{ movie.noiDung }}</p>
      </div>
    </div>
  </div>
  <div class="movie-trailer" v-if="movie && movie.trailer">
    <iframe width="100%" height="600" :src="getEmbedUrl(movie.trailer)" title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>
  </div>
</div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchMovieByIdApiClient } from "@/api/movie";

export default {
  name: "BookingMovieInfo",
  setup() {
    const route = useRoute();
    const movie = ref(null);

    // Hàm chuyển đổi URL từ dạng xem sang dạng nhúng
    const getEmbedUrl = (url) => {
      const videoId = url.split('v=')[1]?.split('&')[0]; // Lấy video ID
      return `https://www.youtube.com/embed/${videoId}`; // Trả về URL nhúng
    };

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
        const data = await fetchMovieByIdApiClient(movieId);
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
      getEmbedUrl, // Đảm bảo hàm này được trả về để có thể sử dụng trong template
    };
  },
};
</script>
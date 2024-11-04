<template>
  <div class="scroll-to-top" id="scrollToTop" @click="scrollToTop" :class="{ show: isScrollButtonVisible }">
    <span class="fas fa-arrow-up"></span>
  </div>
  <div id="stars"></div>
  <onlyPageHeader_component />
  <div class="movie-container">
    <div class="one">
      <h1>PHIM ĐANG CHIẾU</h1>
    </div>
    <div class="movie-content">
      <div class="movie-grid-container section">
        <movieCardData_component
          v-if="movies.length"
          v-for="(movie, index) in movies"
          :key="index"
          :movieImage="movie.anhPhim"
          :movieTitle="movie.tenPhim"
          :movieDescription="movie.noiDungMoTa"
          :movieRating="movie.danhGia || 'Chưa đánh giá'"
          :movieVotes="movie.luotXem || 0"
          :movieCast="movie.dienVien"
          :movieReleaseYear="movie.nam"
          :movieDuration="movie.thoiLuong"
          :movieCountry="movie.quocGia"
          :movieAgeRating="movie.gioiHanDoTuoi.tenDoTuoi"
          :movieReleaseDate="new Date(movie.ngayRaMat).toLocaleDateString()"
          :movieTrailer="movie.trailer"
          :movieId="movie.id"
        />
        <div v-else class="no-movies">Không có phim nào đang chiếu.</div>
      </div>
    </div>
  </div>
  <onlyPageFooter_component />
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { fetchMovies } from "@/api/movie";
import movieCardData_component from "./component/movieCardData_component.vue";
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";

export default {
  name: "moviePageData_component",
  components: {
    onlyPageHeader_component,
    onlyPageFooter_component,
    movieCardData_component,
  },
  setup() {
    const movies = ref<any[]>([]);
    const isScrollButtonVisible = ref(false);

    const handleScroll = () => {
      isScrollButtonVisible.value = window.scrollY > 100;
    };

    onMounted(async () => {
      try {
        movies.value = await fetchMovies();
      } catch (error) {
        console.error("Component [Lỗi khi xử lý dữ liệu phim]:", error);
      }
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
      movies,
      isScrollButtonVisible,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
.no-movies {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>

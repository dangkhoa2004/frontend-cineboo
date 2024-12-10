<template>
<div>
  <onlyPageHeader_component />
  <div class="tab-container">
    <div class="tab" :class="{ active: currentTab === 'now-playing' }" @click="currentTab = 'now-playing'">
      Đang chiếu
    </div>
    <div class="tab" :class="{ active: currentTab === 'upcoming' }" @click="currentTab = 'upcoming'">
      Sắp chiếu
    </div>
  </div>
  <!-- Nội dung phim -->
  <div v-if="currentTab === 'now-playing'" class="movie-container">
    <div class="movie-content">
      <div class="movie-grid-container section">
        <movieCardData_component v-if="movies.length" v-for="(movie, index) in movies" :key="index"
          :movieImage="movie.anhPhim" :movieTitle="movie.tenPhim" :movieDescription="movie.noiDungMoTa"
          :movieRating="movie.danhGia || 'Chưa đánh giá'" :movieVotes="movie.luotXem || 0" :movieCast="movie.dienVien"
          :movieReleaseYear="movie.nam" :movieDuration="movie.thoiLuong" :movieCountry="movie.quocGia"
          :movieAgeRating="movie.gioiHanDoTuoi.tenDoTuoi"
          :movieReleaseDate="new Date(movie.ngayRaMat).toLocaleDateString()" :movieTrailer="movie.trailer"
          :movieId="movie.id" />
        <div v-else class="no-movies">Không có phim nào đang chiếu.</div>
      </div>
    </div>
  </div>

  <div v-if="currentTab === 'upcoming'" class="movie-container">
    <div class="movie-content">
      <div class="movie-grid-container section">
        <movieCardData_component v-if="upcomingMovies.length" v-for="(movie, index) in upcomingMovies" :key="index"
          :movieImage="movie.anhPhim" :movieTitle="movie.tenPhim" :movieDescription="movie.noiDungMoTa"
          :movieRating="movie.danhGia || 'Chưa đánh giá'" :movieVotes="movie.luotXem || 0" :movieCast="movie.dienVien"
          :movieReleaseYear="movie.nam" :movieDuration="movie.thoiLuong" :movieCountry="movie.quocGia"
          :movieAgeRating="movie.gioiHanDoTuoi.tenDoTuoi"
          :movieReleaseDate="new Date(movie.ngayRaMat).toLocaleDateString()" :movieTrailer="movie.trailer"
          :movieId="movie.id" />
        <div v-else class="no-movies">Không có phim nào sắp chiếu.</div>
      </div>
    </div>
  </div>

  <onlyPageFooter_component />
</div>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import { fetchMovies, } from "@/api/movie";
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
    const upcomingMovies = ref<any[]>([]);
    const currentTab = ref("now-playing");

    onMounted(async () => {
      try {
        movies.value = await fetchMovies();
        upcomingMovies.value = await fetchMovies();
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      }
    });

    return {
      movies,
      upcomingMovies,
      currentTab,
    };
  },
};
</script>

<style scoped>

</style>

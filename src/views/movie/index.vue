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
  <div class="search-container">
    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm phim..." class="search-input" />
  </div>
  <!-- Nội dung phim -->
  <div v-if="currentTab === 'now-playing'" class="movie-container">
    <div class="movie-content">
      <div class="movie-grid-container section">
        <movieCardData_component v-if="filteredMovies.length" v-for="(movie, index) in filteredMovies" :key="index"
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
        <movieCardData_component v-if="filteredUpcomingMovies.length" v-for="(movie, index) in filteredUpcomingMovies"
          :key="index" :movieImage="movie.anhPhim" :movieTitle="movie.tenPhim" :movieDescription="movie.noiDungMoTa"
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
import { ref, onMounted, computed } from "vue";
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
    const upcomingMovies = ref<any[]>([]);
    const currentTab = ref("now-playing");
    const searchQuery = ref("");

    onMounted(async () => {
      try {
        movies.value = await fetchMovies();
        upcomingMovies.value = await fetchMovies();
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      }
    });

    // Lọc các bộ phim hiện tại theo tên
    const filteredMovies = computed(() => {
      return movies.value.filter((movie) =>
        movie.tenPhim.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Lọc các bộ phim sắp chiếu theo tên
    const filteredUpcomingMovies = computed(() => {
      return upcomingMovies.value.filter((movie) =>
        movie.tenPhim.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      movies,
      upcomingMovies,
      currentTab,
      searchQuery,
      filteredMovies,
      filteredUpcomingMovies,
    };
  },
};
</script>
<style scoped>
.search-container {
  background-color: black;
  text-align: center;
}

.search-input {
  width: 30%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

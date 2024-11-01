<template>
  <div
    class="scroll-to-top"
    id="scrollToTop"
    @click="scrollToTop"
    :class="{ show: isScrollButtonVisible }"
  >
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
        <template v-if="movies.length">
          <movieCardData_component
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
        </template>
        <template v-else>
          <div class="no-movies">Không có phim nào đang chiếu.</div>
        </template>
      </div>
    </div>
  </div>
  <onlyPageFooter_component />
</template>

<script lang="ts">
import movieCardData_component from "./component/movieCardData_component.vue";
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";
import { useMoviePageData } from "./assets/moviePageData";

export default {
  name: "moviePageData_component",
  components: {
    onlyPageHeader_component,
    onlyPageFooter_component,
    movieCardData_component,
  },
  setup() {
    const { movies, isScrollButtonVisible, scrollToTop } = useMoviePageData();
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

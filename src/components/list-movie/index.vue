<template>
<div class="movie-container">
  <table>
    <thead>
      <tr>
        <th>Mã phim</th>
        <th>Tên phim</th>
        <th>Ngày phát hành</th>
        <th>Thể loại</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.id }}</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.releaseDate }}</td>
        <td>{{ movie.genre }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchMovies } from "@/api/movie.ts";

export default {
  data() {
    return {
      movies: [],
    };
  },
  async mounted() {
    try {
      const movieData = await fetchMovies();
      this.movies = movieData;
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu phim:", error);
    }
  },
};
</script>

<style scoped>
.movie-container {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.5);
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>

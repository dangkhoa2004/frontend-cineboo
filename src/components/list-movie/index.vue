<template>
<div class="movie-manager">
  <div class="filter-container">
    <div>
      <label for="genre-filter">Thể loại:</label>
      <select v-model="filters.theLoai">
        <option value="">Tất cả</option>
        <option v-for="genre in uniqueGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>
    <div>
      <label for="year-filter">Năm phát hành:</label>
      <select v-model="filters.namRaMat">
        <option value="">Tất cả</option>
        <option v-for="year in uniqueYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
  </div>

  <div class="button-container">
    <button @click="addMovie()">Thêm mới</button>
    <button @click="MovieSchedual()">Quản lý lịch chiếu</button>
  </div>

  <input v-model="searchQuery" type="text" placeholder="Tìm kiếm phim..." class="search-input" />
  <table>
    <thead>
      <tr>
        <th>Ảnh</th>
        <th>ID Phim</th>
        <th>Tên phim</th>
        <th>Ngày phát hành</th>
        <th>Thể loại</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in filteredMovies" :key="movie.id">
        <td>
          <img :src="movie.anhPhim" alt="Poster" class="movie-poster" />
        </td>
        <td>{{ movie.maPhim }}</td>
        <td>{{ movie.tenPhim }}</td>
        <td>{{ formatDate(movie.ngayRaMat) }}</td>
        <td>{{ movie.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai).join(', ') }}</td>
        <td>
          <button @click="editMovie(movie)">Sửa</button>
          <button @click="deleteMovie(movie.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchMovies, deleteMovieById } from "@/api/movie";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      movies: [],
      searchQuery: "",
      filters: {
        theLoai: "",
        namRaMat: "",
      },
    };
  },
  async mounted() {
    await this.loadMovies();
  },
  computed: {
    uniqueGenres() {
      const genres = new Set();
      this.movies.forEach(movie => {
        movie.danhSachTLPhims.forEach(item => genres.add(item.theLoaiPhim.tenTheLoai));
      });
      return Array.from(genres);
    },
    uniqueYears() {
      const years = new Set();
      this.movies.forEach(movie => {
        const year = new Date(movie.ngayRaMat).getFullYear();
        years.add(year);
      });
      return Array.from(years).sort((a, b) => b - a);
    },
    filteredMovies() {
      const query = this.searchQuery.toLowerCase();
      const selectedGenre = this.filters.theLoai;
      const selectedYear = this.filters.namRaMat;

      return this.movies.filter(movie => {
        const genres = movie.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai);
        const releaseYear = new Date(movie.ngayRaMat).getFullYear();

        return (
          (query === "" || movie.tenPhim.toLowerCase().includes(query)) &&
          (selectedGenre === "" || genres.includes(selectedGenre)) &&
          (selectedYear === "" || releaseYear.toString() === selectedYear)
        );
      });
    },
  },
  methods: {
    async addMovie() {
      this.$router.push({ name: "them-moi-phim" });
    },
    async MovieSchedual() {
      this.$router.push({ name: "quan-ly-lich-chieu" });
    },
    async loadMovies() {
      try {
        const movieData = await fetchMovies();
        this.movies = movieData;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Lỗi khi tải dữ liệu phim',
        });
      }
    },
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
    },
    editMovie(movie) {
      this.$router.push({ name: "thay-doi-thong-tin-phim", params: { id: movie.id } });
    },
    async deleteMovie(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá phim này?");
      if (confirmDelete) {
        try {
          // await deleteMovieById(id);
          this.movies = this.movies.filter(movie => movie.id !== id);
          alert("Phim đã được xoá thành công.");
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Lỗi khi xoá phim',
          });
        }
      }
    },
  },
};
</script>
<style src="./assets/styles.css" scoped></style>
<template>
<div class="movie-manager">
  <div class="button-container">
    <button @click="addMovie()">
      Thêm mới
    </button>
    <button @click="MovieSchedual()">
      Quản lý lịch chiếu
    </button>
  </div>
  <input v-model="searchQuery" type="text" placeholder="Tìm kiếm phim..." class="" />
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

export default {
  data() {
    return {
      movies: [], // Danh sách phim
      searchQuery: "", // Từ khoá tìm kiếm
    };
  },
  async mounted() {
    await this.loadMovies();
  },
  computed: {
    filteredMovies() {
      const query = this.searchQuery.toLowerCase();
      return this.movies.filter(movie =>
        movie.tenPhim.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async addMovie() {
      this.$router.push({ name: 'them-moi-phim' });
    },
    async MovieSchedual() {
      this.$router.push({ name: 'quan-ly-lich-chieu' });
    },
    async loadMovies() {
      try {
        const movieData = await fetchMovies();
        this.movies = movieData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      }
    },
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
    },
    editMovie(movie) {
      this.$router.push({ name: 'thay-doi-thong-tin-phim', params: { id: movie.id } });
    },
    async deleteMovie(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá phim này?");
      if (confirmDelete) {
        try {
          await deleteMovieById(id);
          this.movies = this.movies.filter(movie => movie.id !== id);
          alert("Phim đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá phim:", error);
          alert("Có lỗi xảy ra khi xoá phim.");
        }
      }
    },
  },
};
</script>

<style src="./assets/styles.css" scoped></style>
<template>
<div class="movie-manager">
  <div>
    <button @click="addMovie()">
      Thêm mới
    </button>
    <button @click="MovieSchedual()">
      Quản lý lịch chiếu
    </button>
  </div>
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
      <tr v-for="movie in paginatedMovies" :key="movie.id">
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
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Trước</button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Sau</button>
  </div>
</div>
</template>


<script>
import { fetchMovies, deleteMovieById } from "@/api/movie";

export default {
  data() {
    return {
      movies: [],
      currentPage: 1,
      itemsPerPage: 5, // 8 phim mỗi trang
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage);
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.movies.slice(start, end);
    },
  },
  async mounted() {
    await this.loadMovies();
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
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};

</script>
<style src="./assets/styles.css" scoped></style>
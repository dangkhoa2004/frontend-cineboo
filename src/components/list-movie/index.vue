<template>
<div class="movie-container">
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
      <tr v-for="movie in movies" :key="movie.id">
        <td>
          <img :src="movie.anhPhim" alt="Poster" class="movie-poster" />
        </td>
        <td>{{ movie.id }}</td>
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
      movies: [],
    };
  },
  async mounted() {
    await this.loadMovies();
  },
  methods: {
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

.movie-poster {
  width: 50px;
  height: auto;
}

button {
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  opacity: 0.8;
}

button:first-of-type {
  background-color: #4caf50;
  color: white;
}

button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
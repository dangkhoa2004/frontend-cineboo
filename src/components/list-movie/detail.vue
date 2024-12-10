<template>
<div class="movie-detail">
  <div class="button-container">
    <button @click="goBack">Trở về</button>
    <button @click="saveMovie">Lưu lại</button>
  </div>
  <h2>Thông tin phim</h2>
  <div v-if="movie">
    <img :src="movie.anhPhim" alt="Poster" class="movie-poster" />
    <div>
      <label>Tên phim:</label>
      <input v-model="movie.tenPhim" />
    </div>
    <div>
      <label>Mã phim:</label>
      <input v-model="movie.maPhim" />
    </div>
    <div>
      <label>ID phim:</label>
      <input v-model="movie.id" disabled />
    </div>
    <div>
      <label>Ngày phát hành:</label>
      <input type="date" v-model="formattedReleaseDate" />
    </div>
    <div>
      <label>Nội dung:</label>
      <textarea v-model="movie.noiDung"></textarea>
    </div>
    <div>
      <label>Thời gian:</label>
      <input v-model="movie.thoiLuong" type="number" />
    </div>
    <div>
      <label>Quốc gia:</label>
      <input v-model="movie.quocGia" />
    </div>
    <div>
      <label>Nội dung mô tả:</label>
      <textarea v-model="movie.noiDungMoTa"></textarea>
    </div>
    <div>
      <label>Trailer:</label>
      <input v-model="movie.trailer" />
    </div>
    <!-- Danh sách thể loại -->
    <div>
      <label>Danh sách thể loại phim:</label>
      <div class="the-loai-container">
        <div v-for="(theLoai, index) in danhSachTheLoai" :key="index" class="the-loai-item">
          <input type="checkbox" :value="theLoai.id" v-model="selectedTheLoaiIds" />
          <span>{{ theLoai.tenTheLoai }}</span>
        </div>
      </div>
    </div>
    <!-- Danh sách độ tuổi -->
    <div>
      <label>Danh sách độ tuổi phim:</label>
      <div class="the-loai-container">
        <div v-for="(dotuoi, index) in danhSachDoTuoi" :key="index" class="the-loai-item">
          <input type="radio" :value="dotuoi.id" v-model="selectedDoTuoiIds" />
          <span>{{ dotuoi.tenDoTuoi }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Đang tải thông tin phim...</p>
  </div>
</div>
</template>
<script>
import axios from "axios";
import { fetchMovieById, updateMovieById } from "@/api/movie";

export default {
  data() {
    return {
      movie: null,
      formattedReleaseDate: "",
      danhSachTheLoai: [],
      danhSachDoTuoi: [],
      selectedTheLoaiIds: [],
      selectedDoTuoiIds: null,
    };
  },
  async mounted() {
    this.fetchTLPhim();
    this.fetchDoTuoi();
    await this.loadMovie();
  },
  methods: {
    async fetchTLPhim() {
      try {
        const response = await axios.get("http://localhost:8080/theloaiphim/get");
        if (response.data) {
          this.danhSachTheLoai = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách thể loại phim:", error);
      }
    },
    async fetchDoTuoi() {
      try {
        const response = await axios.get("http://localhost:8080/dotuoi/get");
        if (response.data) {
          this.danhSachDoTuoi = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách độ tuổi phim:", error);
      }
    },
    async loadMovie() {
      const movieId = this.$route.params.id;
      try {
        const movieData = await fetchMovieById(movieId);

        // Kiểm tra dữ liệu trả về và gán giá trị mặc định nếu cần
        this.movie = {
          ...movieData,
          danhSachTLPhims: movieData.danhSachTLPhims || [],
          gioiHanDoTuoi: movieData.gioiHanDoTuoi || { id: null, maDoTuoi: "", tenDoTuoi: "" },
        };

        // Định dạng ngày phát hành
        this.formattedReleaseDate = movieData.ngayRaMat
          ? new Date(movieData.ngayRaMat).toISOString().substr(0, 10)
          : "";

        // Gán danh sách thể loại nếu có
        this.selectedTheLoaiIds = movieData.danhSachTLPhims.map((item) => item.theLoaiPhim?.id || []);

        // Gán độ tuổi nếu có
        this.selectedDoTuoiIds = movieData.gioiHanDoTuoi?.id || null;
      } catch (error) {
        console.error("Lỗi khi tải thông tin phim:", error);
      }
    },
    async saveMovie() {
      try {
        const updatedMovie = {
          ...this.movie,
          ngayRaMat: new Date(this.formattedReleaseDate).toISOString(),
          danhSachTLPhims: this.selectedTheLoaiIds.map((id) => ({ id })), // Cập nhật danh sách thể loại
          gioiHanDoTuoi: { id: this.selectedDoTuoiIds }, // Cập nhật độ tuổi
        };

        console.log("Dữ liệu sẽ gửi:", updatedMovie);

        const response = await updateMovieById(this.movie.id, updatedMovie);
        console.log("Response từ server:", response);

        if (response) {
          alert("Cập nhật thông tin phim thành công.");
          this.$router.go(-1);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật phim:", error);
        alert("Cập nhật thông tin phim thất bại.");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style src="./assets/styles.css" scoped></style>
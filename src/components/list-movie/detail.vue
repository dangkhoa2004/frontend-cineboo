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
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
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

        // Ensure that the timestamp is parsed correctly
        if (movieData.ngayRaMat) {
          const releaseDate = new Date(movieData.ngayRaMat);

          // Adjust for time zone difference
          const offset = releaseDate.getTimezoneOffset() * 60000; // Get the timezone offset in milliseconds
          const adjustedDate = new Date(releaseDate.getTime() - offset);  // Adjust to UTC

          // Manually format the date to yyyy-MM-dd
          this.formattedReleaseDate = adjustedDate.toISOString().split("T")[0];  // Extract the date part (yyyy-MM-dd)
        } else {
          this.formattedReleaseDate = '';
        }

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
        // Manually format the date to ensure it stays as yyyy-MM-dd
        const formattedDate = this.formattedReleaseDate; // formattedReleaseDate is already in yyyy-MM-dd format

        const updatedMovie = {
          id: this.movie.id, // Ensure the movie ID is included
          tenPhim: this.movie.tenPhim,
          anhPhim: this.movie.anhPhim,
          dienVien: this.movie.dienVien || "", // Set a default empty string if no actor data
          id_TheLoaiPhims: this.selectedTheLoaiIds, // Array of selected genre IDs
          nam: new Date(formattedDate).getFullYear(), // Extract the year from the formatted date
          noiDungMoTa: this.movie.noiDungMoTa,
          trailer: this.movie.trailer,
          ngayRaMat: new Date(formattedDate).toISOString(), // Format the date to ISO string
          thoiLuong: this.movie.thoiLuong,
          quocGia: this.movie.quocGia,
          noiDung: this.movie.noiDung,
          id_GioiHanDoTuoi: this.selectedDoTuoiIds, // The selected age group ID
          trangThai: this.movie.trangThai || 0, // Default to 0 if no status is set
          diem: this.movie.diem || 0, // Default to 0 if no score is set
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
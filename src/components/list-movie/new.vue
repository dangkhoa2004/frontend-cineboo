<template>
<div class="movie-detail">
    <div>
        <label>Tên phim:</label>
        <input v-model="movie.tenPhim" placeholder="Nhập tên phim" />
    </div>
    <!-- Hiển thị ảnh khi người dùng nhập link -->
    <div v-if="movie.anhPhim">
        <img :src="movie.anhPhim" alt="Ảnh xem trước của phim" style="max-width: 100%; height: auto;" />
    </div>
    <div>
        <label>Ảnh phim:</label>
        <input v-model="movie.anhPhim" placeholder="Nhập link ảnh phim" />
    </div>
    <div>
        <label>Diễn viên:</label>
        <input v-model="movie.dienVien" placeholder="Nhập tên diễn viên" />
    </div>
    <div>
        <label>Năm phát hành:</label>
        <input type="number" v-model="movie.nam" placeholder="Nhập năm phát hành" />
    </div>
    <div>
        <label>Nội dung mô tả:</label>
        <textarea v-model="movie.noiDungMoTa" placeholder="Nhập nội dung mô tả"></textarea>
    </div>
    <div>
        <label>Trailer:</label>
        <input v-model="movie.trailer" placeholder="Nhập link trailer" />
    </div>
    <div>
        <label>Ngày ra mắt:</label>
        <input type="date" v-model="movie.ngayRaMat" />
    </div>
    <div>
        <label>Thời lượng (phút):</label>
        <input type="number" v-model="movie.thoiLuong" placeholder="Nhập thời lượng phim" />
    </div>
    <div>
        <label>Quốc gia:</label>
        <input v-model="movie.quocGia" placeholder="Nhập quốc gia" />
    </div>
    <div>
        <label>Nội dung:</label>
        <textarea v-model="movie.noiDung" placeholder="Nhập nội dung chi tiết"></textarea>
    </div>
    <div>
        <label>Điểm đánh giá:</label>
        <input type="number" step="0.1" v-model="movie.diem" placeholder="Nhập điểm đánh giá (1-10)" />
    </div>
    <!-- Checkbox danh sách thể loại -->
    <div>
        <label>Danh sách thể loại phim:</label>
        <div class="the-loai-container">
            <div v-for="(theLoai, index) in danhSachTheLoai" :key="index" class="the-loai-item">
                <input type="checkbox" :value="theLoai.id" v-model="selectedTheLoaiIds" />
                <span>{{ theLoai.tenTheLoai }}</span>
            </div>
        </div>
    </div>
    <!-- Checkbox danh sách độ tuổi -->
    <div>
        <label>Danh sách độ tuổi phim:</label>
        <div class="the-loai-container">
            <div v-for="(dotuoi, index) in danhSachDoTuoi" :key="index" class="the-loai-item">
                <input type="radio" :value="dotuoi.id" v-model="selectedDoTuoiIds" />
                <span>{{ dotuoi.tenDoTuoi }}</span>
            </div>
        </div>
    </div>
    <!-- Các nút chức năng -->
    <div class="button-container">
        <button @click="goBack">Trở về</button>
        <button @click="saveMovie">Thêm phim</button>
    </div>
</div>
</template>

<script>
import { createMovie } from "@/api/movie";
import axios from "axios"; // Cần cài axios nếu chưa có

export default {
    data() {
        return {
            movie: {
                tenPhim: "",
                anhPhim: "",
                dienVien: "",
                nam: new Date().getFullYear(),
                noiDungMoTa: "",
                trailer: "",
                ngayRaMat: "",
                thoiLuong: 120,
                quocGia: "",
                noiDung: "",
                diem: 9.9,
                trangThai: 1,
            },
            danhSachTheLoai: [],
            danhSachDoTuoi: [],
            selectedTheLoaiIds: [],
            selectedDoTuoiIds: null,
        };
    },
    mounted() {
        this.fetchTLPhim();
        this.fetchDoTuoi();
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
        goBack() {
            this.$router.go(-1);
        },
        normalizeDate(value) {
            return value ? new Date(value).toISOString() : "";
        }, async saveMovie() {
            try {
                // Chuẩn bị dữ liệu
                const newMovie = {
                    ...this.movie,
                    ngayRaMat: this.normalizeDate(this.movie.ngayRaMat),
                    id_TheLoaiPhims: this.selectedTheLoaiIds,  // Truyền mảng ID thể loại phim
                    id_GioiHanDoTuoi: this.selectedDoTuoiIds,  // Chỉ truyền một giá trị ID độ tuổi
                };
                console.log("Dữ liệu gửi tới API:", newMovie);
                // Gửi dữ liệu đến API
                const response = await createMovie(newMovie);
                console.log("Phản hồi từ API:", response);

                if (response) {
                    alert("Thêm phim mới thành công!");
                    this.$router.go(-1);
                }
            } catch (error) {
                alert("Thêm phim thất bại: " + error.message);
                console.error(error);
            }
        }
    },
};
</script>

<style src="./assets/styles.css" scoped></style>
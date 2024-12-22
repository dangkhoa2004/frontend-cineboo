<template>
<div class="movie-detail">
    <div>
        <label>Tên phim:</label>
        <input v-model="movie.tenPhim" placeholder="Nhập tên phim" />
    </div>
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
    <div>
        <label>Danh sách thể loại phim:</label>
        <div class="the-loai-container">
            <div v-for="(theLoai, index) in danhSachTheLoai" :key="index" class="the-loai-item">
                <input type="checkbox" :value="theLoai.id" v-model="selectedTheLoaiIds" />
                <span>{{ theLoai.tenTheLoai }}</span>
            </div>
        </div>
    </div>
    <div>
        <label>Danh sách độ tuổi phim:</label>
        <div class="the-loai-container">
            <div v-for="(dotuoi, index) in danhSachDoTuoi" :key="index" class="the-loai-item">
                <input type="radio" :value="dotuoi.id" v-model="selectedDoTuoiIds" />
                <span>{{ dotuoi.tenDoTuoi }}</span>
            </div>
        </div>
    </div>
    <div class="button-container">
        <button @click="goBack">Trở về</button>
        <button @click="saveMovie">Thêm phim</button>
    </div>
</div>
</template>
<script>
import { createMovie } from "@/api/movie";
import axios from "axios";
import Swal from "sweetalert2";
import {
    validateMovieTitle,
    validateMovieImage,
    validateActors,
    validateReleaseYear,
    validateDescription,
    validateDuration,
    validateCountry,
    validateRating,
    validateGenres,
    validateAgeLimit
} from "@/utils/validation";

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
            selectedDoTuoiIds: 1,
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
        },
        validateMovieInfo() {
            const { tenPhim, anhPhim, dienVien, nam, thoiLuong, quocGia, noiDung, diem } = this.movie || {};

            const tenPhimError = validateMovieTitle(tenPhim);
            const anhPhimError = validateMovieImage(anhPhim);
            const dienVienError = validateActors(dienVien);
            const namError = validateReleaseYear(nam);
            const thoiLuongError = validateDuration(thoiLuong);
            const quocGiaError = validateCountry(quocGia);
            const noiDungError = validateDescription(noiDung);
            const diemError = validateRating(diem);
            const genresError = validateGenres(this.selectedTheLoaiIds);
            const ageLimitError = validateAgeLimit(this.selectedDoTuoiIds);

            // Lọc các lỗi không phải null
            const errors = [
                tenPhimError || anhPhimError || dienVienError || namError || thoiLuongError || quocGiaError || noiDungError || diemError || genresError || ageLimitError
            ].filter(error => error !== null);  // Chỉ lấy các lỗi không phải null

            // Nếu có lỗi, hiển thị tất cả các lỗi cùng một lúc
            if (errors.length > 0) {
                const errorMessages = errors.join('<br/>');
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi cập nhật thông tin',
                    html: errorMessages,  // Hiển thị lỗi dưới dạng HTML
                });
                return false;  // Dừng lại nếu có lỗi
            }

            return true;  // Nếu không có lỗi, trả về true
        },

        async saveMovie() {
            // Kiểm tra tính hợp lệ của thông tin phim
            if (this.movie && this.validateMovieInfo()) {
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: 'Bạn có chắc chắn muốn lưu thông tin phim không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                });

                if (result.isConfirmed) {
                    try {
                        const newMovie = {
                            ...this.movie,
                            ngayRaMat: this.normalizeDate(this.movie.ngayRaMat),
                            id_TheLoaiPhims: this.selectedTheLoaiIds,  // Truyền mảng ID thể loại phim
                            id_GioiHanDoTuoi: this.selectedDoTuoiIds,  // Chỉ truyền một giá trị ID độ tuổi
                        };

                        const response = await createMovie(newMovie);
                        if (response) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công',
                                text: 'Thông tin đã được cập nhật!',
                            });

                            setTimeout(() => {
                                window.location.reload();  // reload lại trang sau 2 giây
                            }, 2000);
                        }
                    } catch (error) {
                        console.error("Lỗi khi cập nhật thông tin:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Lỗi khi cập nhật thông tin.',
                        });
                    }
                }
            }
        }


    }
};
</script>

<style src="./assets/styles.css" scoped></style>
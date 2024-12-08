<template>
<div class="movie-detail">
    <h2>Thêm phim mới</h2>
    <div>
        <!-- Các trường nhập liệu -->
        <div>
            <label>Mã phim:</label>
            <input v-model="movie.maPhim" placeholder="Nhập mã phim" />
        </div>
        <div>
            <label>Tên phim:</label>
            <input v-model="movie.tenPhim" placeholder="Nhập tên phim" />
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
            <div v-for="(theLoai, index) in danhSachTheLoai" :key="index">
                <input type="checkbox" :value="theLoai.id" v-model="selectedTheLoaiIds" />
                <span>{{ theLoai.tenTheLoai }}</span>
            </div>
        </div>
        <!-- Các nút chức năng -->
        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveMovie">Thêm phim</button>
        </div>
    </div>
</div>
</template>
<script>
import { createMovie } from "@/api/movie";

export default {
    data() {
        return {
            movie: {
                maPhim: 'test',
                tenPhim: 'test',
                anhPhim: 'test.com',
                dienVien: 'test',
                nam: new Date().getFullYear(),
                noiDungMoTa: 'test',
                trailer: 'test.com',
                ngayRaMat: '',
                thoiLuong: 120,
                quocGia: 'test',
                noiDung: 'test',
                gioiHanDoTuoi: { id: 1 },
                diem: 9.1,
                trangThai: 1
            },
            danhSachTheLoai: [
                { id: 1, tenTheLoai: "Hành động" },
                { id: 2, tenTheLoai: "Hài hước" },
                { id: 3, tenTheLoai: "Kinh dị" }
            ],
            selectedTheLoaiIds: []
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        normalizeDate(value) {
            return value ? new Date(value).toISOString() : '';
        },
        async saveMovie() {
            try {
                // Chuẩn bị dữ liệu
                const newMovie = {
                    ...this.movie,
                    ngayRaMat: this.normalizeDate(this.movie.ngayRaMat),
                    danhSachTLPhims: this.selectedTheLoaiIds.map(theLoaiId => ({
                        theLoaiPhim: { id: theLoaiId }, // Chỉ định id cho theLoaiPhim
                        trangThai: 1 // Mặc định là trạng thái hoạt động
                    }))
                };

                console.log("Dữ liệu gửi tới API:", newMovie);

                // Gửi dữ liệu đến API
                const response = await createMovie(newMovie);
                console.log("Phản hồi từ API:", response);

                if (response) {
                    alert("Thêm phim mới thành công!");
                    this.$router.push('/movies');
                }
            } catch (error) {
                alert("Thêm phim thất bại: " + error.message);
                console.error(error);
            }
        }
    }
};
</script>
<style src="./assets/styles.css" scoped></style>
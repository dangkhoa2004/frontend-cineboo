<template>
<div class="movie-detail">
    <h2>Thông tin phim</h2>
    <div v-if="movie">
        <img :src="movie.anhPhim" alt="Poster" class="movie-poster" />
        <h3>{{ movie.tenPhim }}</h3>
        <p>Mã phim: {{ movie.maPhim }}</p>
        <p>ID phim: {{ movie.id }}</p>
        <p>Ngày phát hành: {{ formatDate(movie.ngayRaMat) }}</p>
        <p>Thể loại:
            <span v-if="movie.danhSachTLPhims && movie.danhSachTLPhims.length">
                {{ movie.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai).join(', ') }}
            </span>
            <span v-else>Chưa có thể loại</span>
        </p>
        <p>Nội dung: {{ movie.noiDung }}</p>
        <p>Thời gian: {{ movie.thoiLuong }} phút</p>
        <p>Quốc gia: {{ movie.quocGia }}</p>
        <p>Giới hạn độ tuổi: {{ movie.gioiHanDoTuoi.tenDoTuoi }}</p>
        <p>Nội dung mô tả: {{ movie.noiDungMoTa }}</p>
        <p>Trailer: <a :href="movie.trailer" target="_blank">Xem trailer</a></p>

        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveMovie">Lưu lại</button>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin phim...</p>
    </div>
</div>
</template>


<script>
import { fetchMovieById } from "@/api/movie";

export default {
    data() {
        return {
            movie: null,
        };
    },
    async mounted() {
        await this.loadMovie();
    },
    methods: {
        async loadMovie() {
            const movieId = this.$route.params.id;
            try {
                const movieData = await fetchMovieById(movieId);
                this.movie = movieData;
            } catch (error) {
                console.error("Lỗi khi tải thông tin phim:", error);
            }
        },
        formatDate(timestamp) {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            return new Date(timestamp).toLocaleDateString("vi-VN", options);
        },
        goBack() {
            this.$router.go(-1);
        },
        saveMovie() {
            alert("Thông tin phim đã được lưu!");
        },
    },
};
</script>
<style scoped>
.movie-detail {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin: auto;
}

.movie-poster {
    width: 150px;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 15px;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

h3 {
    color: #4a4a4a;
    font-size: 1.5em;
    margin: 10px 0;
}

p {
    margin: 8px 0;
    line-height: 1.5;
}

.button-container {
    display: flex;
    /* Sử dụng flexbox để căn giữa và phân bố các nút */
    justify-content: space-between;
    /* Phân bố không gian đều giữa các nút */
    margin-top: 15px;
    /* Khoảng cách trên cho button container */
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, transform 0.2s;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

button:focus {
    outline: none;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>

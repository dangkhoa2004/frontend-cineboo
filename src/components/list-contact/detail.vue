<template>
<div class="movie-detail">
    <h2>Thông tin phim</h2>
    <div v-if="movie">
        <img :src="movie.anhPhim" alt="Poster" class="movie-poster" />
        <h3>{{ movie.tenPhim }}</h3>
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
            <label>Thể loại:</label>
            <input v-model="genresInput" placeholder="Nhập thể loại, cách nhau bằng dấu phẩy" />
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
            <label>Giới hạn độ tuổi:</label>
            <input v-model="movie.gioiHanDoTuoi.tenDoTuoi" />
        </div>
        <div>
            <label>Nội dung mô tả:</label>
            <textarea v-model="movie.noiDungMoTa"></textarea>
        </div>
        <div>
            <label>Trailer:</label>
            <input v-model="movie.trailer" />
        </div>

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
import { fetchMovieById, updateMovieById } from "@/api/movie"; // Import updateMovieById

export default {
    data() {
        return {
            movie: null,
            formattedReleaseDate: '',
            genresInput: '',
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
                this.formattedReleaseDate = new Date(this.movie.ngayRaMat).toISOString().substr(0, 10);
                this.genresInput = this.movie.danhSachTLPhims.map(item => item.theLoaiPhim.tenTheLoai).join(', ');
            } catch (error) {
                console.error("Lỗi khi tải thông tin phim:", error);
            }
        },
        async saveMovie() {
            try {
                const updatedMovie = {
                    ...this.movie,
                    ngayRaMat: new Date(this.formattedReleaseDate).getTime(),
                    danhSachTLPhims: this.genresInput.split(',').map(genre => ({
                        theLoaiPhim: { tenTheLoai: genre.trim() }
                    })),
                };

                console.log("Dữ liệu sẽ gửi:", updatedMovie);

                // Call updateMovieById instead of fetch
                const response = await updateMovieById(this.movie.id, updatedMovie);

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error("Lỗi từ server:", errorResponse);
                    alert("Cập nhật thông tin phim thất bại: " + errorResponse.message);
                    return;
                }

                alert("Thông tin phim đã được cập nhật thành công!");
            } catch (error) {
                console.error("Lỗi khi cập nhật phim:", error);
                alert("Cập nhật thông tin phim thất bại.");
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style src="./assets/styles.css" scoped></style>
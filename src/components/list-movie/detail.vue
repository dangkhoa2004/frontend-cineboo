<template>
<div class="movie-detail">
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
        getGenreIdByName(genreName) {
            // Implement a way to map genre names to their IDs
            const genres = [
                { name: "Action", id: 1 },
                { name: "Comedy", id: 2 },
                // Add other genres as needed
            ];

            const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
            return genre ? genre.id : null; // Return the ID if found, or null if not
        },
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
                    ngayRaMat: new Date(this.formattedReleaseDate).toISOString(),
                    danhSachTLPhims: this.genresInput.split(',').map((genre) => ({
                        theLoaiPhim: {
                            id: this.getGenreIdByName(genre.trim())
                        },
                        trangThai: 0
                    })),
                    gioiHanDoTuoi: {
                        id: this.movie.gioiHanDoTuoi.id
                    }
                };
                console.log("Dữ liệu sẽ gửi:", updatedMovie);
                const response = await updateMovieById(this.movie.id, updatedMovie);
                console.log("Response từ server:", response);
                if (response) {
                    alert("Cập nhật thông tin phim thành công.");
                }
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
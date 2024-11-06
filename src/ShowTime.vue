<template>
<div>
    <h2>Lịch Chiếu</h2>
    <div v-if="showtimes.length">
        <div v-for="showtime in showtimes" :key="showtime.id" class="showtime-section">
            <div class="movie-info">
                <img :src="showtime.phim.anhPhim" alt="Poster" class="movie-poster" />
                <div class="movie-details">
                    <h3>{{ showtime.phim.tenPhim }}</h3>
                    <p>Diễn viên: {{ showtime.phim.dienVien }}</p>
                    <p>Thời gian chiếu: {{ formatShowtime(showtime.thoiGianChieu) }}</p>
                    <p>Phòng chiếu: {{ showtime.phongChieu.maPhong }}</p>
                    <p>Trạng thái: {{ showtime.trangThaiSuatChieu === 1 ? 'Còn chỗ' : 'Hết chỗ' }}</p>
                </div>
            </div>
            <button @click="bookTicket(showtime)">Đặt vé</button>
        </div>
    </div>
    <div v-else>
        <p>Không có suất chiếu nào cho phim này.</p>
    </div>
</div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchShowtimesByMovieId } from "@/api/movie"; // Đảm bảo đường dẫn đúng

export default {
    setup() {
        const route = useRoute(); // Lấy thông tin route
        const movieId = computed(() => route.params.id); // Lấy movieId từ params
        const showtimes = ref([]);

        const fetchShowtimes = async () => {
            if (movieId.value) {
                try {
                    const response = await fetchShowtimesByMovieId(movieId.value); // Gọi hàm để fetch dữ liệu
                    // Kiểm tra xem response có tồn tại không
                    if (Array.isArray(response) && response.length) {
                        showtimes.value = response; // Cập nhật danh sách suất chiếu
                    } else {
                        console.error("Không tìm thấy dữ liệu suất chiếu.");
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu suất chiếu:", error);
                }
            }
        };

        const formatShowtime = (timeArray) => {
            const [year, month, day, hour, minute] = timeArray;
            const date = new Date(year, month - 1, day, hour, minute); // Month is zero-based
            return date.toLocaleString(); // Định dạng ngày giờ theo múi giờ của người dùng
        };

        const bookTicket = (showtime) => {
            // Xử lý đặt vé tại đây
            console.log(`Đặt vé cho suất chiếu ${showtime.maSuatChieu} - Phim: ${showtime.phim.tenPhim}`);
        };

        onMounted(fetchShowtimes); // Gọi hàm khi component được mount

        return {
            showtimes,
            bookTicket,
            formatShowtime,
        };
    },
};
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
.showtime-section {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.movie-poster {
    width: 100px;
    /* Điều chỉnh kích thước poster */
    height: auto;
    margin-right: 15px;
}

.movie-details {
    flex-grow: 1;
}
</style>
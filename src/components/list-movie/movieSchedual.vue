<template>
<div class="movie-manager">
    <div class="button-group">
        <button @click="goBack">Trở về</button>
    </div>

    <div class="form-group">
        <label for="movie-select">Lựa chọn phim</label>
        <select id="movie-select" v-model="selectedMovie">
            <option v-for="movie in movies" :key="movie.id" :value="movie.id">
                {{ movie.tenPhim }}
            </option>
        </select>
    </div>

    <div class="form-group">
        <label for="room-select">Lựa chọn phòng chiếu</label>
        <select id="room-select" v-model="selectedRoom">
            <option v-for="room in rooms" :key="room.id" :value="room.id">
                {{ room.maPhong }}
            </option>
        </select>
    </div>

    <!-- Chọn khoảng ngày -->
    <div class="form-group date-picker-group">
        <label>Chọn khoảng ngày</label>
        <div class="date-inputs">
            <div>
                <label for="start-date">Ngày bắt đầu</label>
                <input type="date" id="start-date" v-model="startDate" />
            </div>
            <div>
                <label for="end-date">Ngày kết thúc</label>
                <input type="date" id="end-date" v-model="endDate" />
            </div>
        </div>
    </div>

    <div class="form-group">
        <label>Lựa chọn giờ chiếu</label>
        <div class="checkbox-group">
            <div v-for="time in times" :key="time" class="checkbox-item">
                <input type="checkbox" :value="time" v-model="selectedTimes" :id="`time-${time}`" />
                <label :for="`time-${time}`">{{ time }}</label>
            </div>
        </div>
    </div>
    <button @click="createSchedual">Tạo lịch chiếu</button>
</div>
</template>

<script>
import { fetchMovies, fetchPhongChieu } from "@/api/movie";

export default {
    data() {
        return {
            rooms: [],
            movies: [],
            selectedMovie: null,
            selectedRoom: null,
            selectedTimes: [],
            startDate: null,
            endDate: null,
            times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
        };
    },
    async mounted() {
        await this.loadMovies(); // Tải danh sách phim
        await this.loadRooms();  // Tải danh sách phòng chiếu
    },
    methods: {
        async loadMovies() {
            try {
                const movieData = await fetchMovies();
                this.movies = movieData;
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phim:", error);
                alert("Không thể tải danh sách phim. Vui lòng thử lại sau!");
            }
        },
        async loadRooms() {
            try {
                const roomData = await fetchPhongChieu();
                this.rooms = roomData;
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phòng chiếu:", error);
                alert("Không thể tải danh sách phòng chiếu. Vui lòng thử lại sau!");
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        async createSchedual() {
            if (!this.selectedMovie || !this.selectedRoom || !this.startDate || !this.endDate || this.selectedTimes.length === 0) {
                alert("Vui lòng chọn đầy đủ thông tin!");
                return;
            }
            const payload = [];
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);

            // Lặp qua các ngày trong khoảng
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateString = d.toISOString().split("T")[0]; // Lấy ngày dưới dạng yyyy-mm-dd

                // Tạo JSON cho từng giờ chiếu
                this.selectedTimes.forEach((time) => {
                    const [hours, minutes] = time.split(":");
                    const dateTime = new Date(d);
                    dateTime.setHours(hours, minutes, 0); // Thiết lập giờ và phút

                    payload.push({
                        thoiGianChieu: dateTime.toISOString(),
                        id_Phim: this.selectedMovie,
                        id_PhongChieu: this.selectedRoom,
                    });
                });
            }

            console.log("Dữ liệu gửi đến back-end:", payload);

            // Gửi payload đến back-end (giả sử bạn có hàm postSchedule)
            try {
                await this.postSchedule(payload);
                alert("Tạo lịch chiếu thành công!");
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu:", error);
                alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
            }
        },
        async postSchedule(payload) {
            // Thay thế URL bằng endpoint back-end thực tế của bạn
            const response = await fetch("http://localhost:8080/suatchieu/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        },
    },
};
</script>
<style scoped>
/* Container */
.movie-manager {
    max-width: 600px;
    border-radius: 10px;
}

/* Form Group */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
}

.form-group select,
.form-group input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

.form-group input[type="date"]:focus,
.form-group select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Date Picker Group */
.date-picker-group .date-inputs {
    display: flex;
    gap: 20px;
}

.date-inputs div {
    flex: 1;
}

.date-inputs label {
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
    color: #555;
}

/* Checkbox Group */
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.checkbox-item {
    display: flex;
    align-items: center;
}

.checkbox-item input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
}

.checkbox-item label {
    font-size: 14px;
    color: #555;
}
</style>
<style src="./assets/styles.css" scoped></style>

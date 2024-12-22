<template>
<div class="movie-manager">
    <div class="filter-container">
        <div>
            <label for="movie-filter">Phim:</label>
            <select v-model="filters.phim">
                <option value="">Tất cả</option>
                <option v-for="movie in uniqueMovies" :key="movie" :value="movie">
                    {{ movie }}
                </option>
            </select>
        </div>
        <div>
            <label for="status-filter">Trạng thái:</label>
            <select v-model="filters.trangThai">
                <option value="">Tất cả</option>
                <option v-for="(text, key) in statusOptions" :key="key" :value="key">
                    {{ text }}
                </option>
            </select>
        </div>
    </div>

    <div class="button-group">
        <button @click="goBack">Trở về</button>
        <button @click="addsuatchieuschedual()">Thêm lịch chiếu</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>Mã suất chiếu</th>
                <th>Thời gian chiếu</th>
                <th>Tên Phim</th>
                <th>Trạng thái suất chiếu</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="suatchieu in filteredSuatchieus" :key="suatchieu.id">
                <td>{{ suatchieu.maSuatChieu }}</td>
                <td>{{ formatDate(suatchieu.thoiGianChieu) }}</td>
                <td>{{ suatchieu.phim.tenPhim }}</td>
                <td>
                    <span :class="getStatusClass(suatchieu.trangThaiSuatChieu)">
                        {{ getStatusText(suatchieu.trangThaiSuatChieu) }}
                    </span>
                </td>
                <td>
                    <button @click="editMovie(suatchieu)">Sửa</button>
                    <button @click="deleteMovie(suatchieu.id)">Xoá</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import { fetchSuatChieu } from "@/api/movie";


export default {
    data() {
        return {
            suatchieus: [], // Danh sách suất chiếu
            filters: {
                phim: "", // Lọc theo phim
                trangThai: "", // Lọc theo trạng thái
            },
        };
    },
    computed: {
        uniqueMovies() {
            // Lấy danh sách tên phim duy nhất
            const movies = new Set(this.suatchieus.map(suatchieu => suatchieu.phim.tenPhim));
            return Array.from(movies);
        },
        statusOptions() {
            // Các tùy chọn trạng thái
            return {
                0: "Sắp chiếu",
                1: "Đã chiếu",
                3: "Đang chiếu",
                4: "Xảy ra lỗi",
            };
        },
        filteredSuatchieus() {
            const { phim, trangThai } = this.filters;
            return this.suatchieus.filter(suatchieu => {
                const matchesPhim = !phim || suatchieu.phim.tenPhim === phim;
                const matchesTrangThai = !trangThai || suatchieu.trangThaiSuatChieu.toString() === trangThai;
                return matchesPhim && matchesTrangThai;
            });
        },
    },
    async mounted() {
        await this.loadsuatchieus();
    },
    methods: {
        async addsuatchieuschedual() {
            this.$router.push({ name: 'them-lich-chieu-phim' });
        },
        async loadsuatchieus() {
            try {
                const suatchieuData = await fetchSuatChieu();
                this.suatchieus = suatchieuData.sort((a, b) => b.id - a.id);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể tải dữ liệu suất chiếu",
                });
            }
        },
        formatDate(timestamp) {
            const [year, month, day, hour, minute] = timestamp;
            const date = new Date(year, month - 1, day, hour, minute);
            const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
            const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };
            const formattedDate = date.toLocaleDateString("vi-VN", optionsDate);
            const formattedTime = date.toLocaleTimeString("vi-VN", optionsTime);
            return `${formattedDate} ${formattedTime}`;
        },
        editMovie(suatchieu) {
            this.$router.push({ name: 'thay-doi-thong-tin-lich-chieu', params: { id: suatchieu.id } });
        },
        goBack() {
            this.$router.go(-1);
        },
        getStatusClass(status) {
            switch (status) {
                case 0: return 'sap-chieu';
                case 1: return 'da-chieu';
                case 3: return 'dang-chieu';
                case 4: return 'loi';
                default: return '';
            }
        },
        getStatusText(status) {
            switch (status) {
                case 0: return 'Sắp chiếu';
                case 1: return 'Đã chiếu';
                case 3: return 'Đang chiếu';
                case 4: return 'Xảy ra lỗi';
                default: return '';
            }
        }
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
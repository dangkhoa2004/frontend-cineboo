<template>
<div class="movie-manager">
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
            <tr v-for="suatchieu in suatchieus" :key="suatchieu.id">
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
            suatchieus: [],
        };
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
                console.error("Lỗi khi tải dữ liệu suất chiếu:", error);
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
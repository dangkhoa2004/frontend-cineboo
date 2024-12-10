<template>
<div class="button-group">
    <button @click="goBack">Trở về</button>
    <button @click="addsuatchieuschedual()">
        Thêm lịch chiếu
    </button>
</div>
<table>
    <thead>
        <tr>
            <th>ID suất chiếu</th>
            <th>Mã suất chiếu</th>
            <th>Thời gian chiếu</th>
            <th>ID_Phim</th>
            <th>Trạng thái suất chiếu</th>
            <th>Thao tác</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="suatchieu in suatchieus" :key="suatchieu.id">
            <td>{{ suatchieu.maSuatChieu }}</td>
            <td>{{ formatDate(suatchieu.thoiGianChieu) }}</td>
            <td>{{ suatchieu.idPhim }}</td>
            <td>{{ suatchieu.TrangThaiSuatChieu }}</td>
            <td>
                <button @click="editMovie(suatchieu)">Sửa</button>
                <button @click="deleteMovie(suatchieu.id)">Xoá</button>
            </td>
        </tr>
    </tbody>
</table>
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
                this.suatchieus = suatchieuData;
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phim:", error);
            }
        },
        formatDate(timestamp) {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            return new Date(timestamp).toLocaleDateString("vi-VN", options);
        },
        editMovie(suatchieu) {
            this.$router.push({ name: 'thay-doi-thong-tin-phim', params: { id: suatchieu.id } });
        },
        goBack() {
            this.$router.go(-1);
        },
    }
};
</script>
<style src="./assets/styles.css" scoped></style>
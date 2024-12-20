<template>
<div class="movie-manager">
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
            <tr v-for="suatchieu in paginatedSuatChieus" :key="suatchieu.id">
                <td>{{ suatchieu.id }}</td>
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
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Trước</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Sau</button>
    </div>
</div>
</template>
<script>
import { fetchSuatChieu } from "@/api/movie";

export default {
    data() {
        return {
            suatchieus: [],
            currentPage: 1,
            itemsPerPage: 7, // Số suất chiếu mỗi trang
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.suatchieus.length / this.itemsPerPage);
        },
        paginatedSuatChieus() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.suatchieus.slice(start, end);
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
                this.suatchieus = suatchieuData;
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phim:", error);
            }
        },
        formatDate(data) {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
			const date = new Date(data[0], data[1] - 1, data[2], data[3], data[4]);
            return date.toLocaleString();;
        },
        editMovie(suatchieu) {
            this.$router.push({ name: 'thay-doi-thong-tin-lich-chieu', params: { id: suatchieu.id } });
        },
        goBack() {
            this.$router.go(-1);
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
    },
};

</script>
<style src="./assets/styles.css" scoped></style>
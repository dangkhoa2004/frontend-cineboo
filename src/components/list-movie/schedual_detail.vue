<template>
<div class="suat-chieu-detail">
    <div v-if="suatChieu">
        <div>
            <label>Mã suất chiếu:</label>
            <input v-model="suatChieu.maSuatChieu" disabled />
        </div>
        <div>
            <label>Thời gian chiếu:</label>
            <input type="datetime-local" v-model="formattedThoiGianChieu" />
        </div>
        <div>
            <label>Trạng thái suất chiếu:</label>
            <select v-model="suatChieu.trangThaiSuatChieu">
                <option value="0">Chưa chiếu</option>
                <option value="1">Đang chiếu</option>
                <option value="2">Đã chiếu</option>
            </select>
        </div>
        <div>
            <label>ID phòng chiếu:</label>
            <input v-model="suatChieu.id_PhongChieu" type="number" />
        </div>

        <!-- Thông tin phim -->
        <h3>Thông tin phim</h3>
        <div>
            <label>Tên phim:</label>
            <input v-model="suatChieu.phim.tenPhim" disabled />
        </div>
        <div>
            <label>Mã phim:</label>
            <input v-model="suatChieu.phim.maPhim" disabled />
        </div>
        <div>
            <img :src="suatChieu.phim.anhPhim" alt="Poster phim" class="movie-poster" />
        </div>
        <div>
            <label>Diễn viên:</label>
            <input v-model="suatChieu.phim.dienVien" disabled />
        </div>
        <div>
            <label>Thời lượng:</label>
            <input v-model="suatChieu.phim.thoiLuong" type="number" disabled />
        </div>
        <div>
            <label>Quốc gia:</label>
            <input v-model="suatChieu.phim.quocGia" disabled />
        </div>
        <div>
            <label>Nội dung:</label>
            <textarea v-model="suatChieu.phim.noiDung" disabled></textarea>
        </div>

        <!-- Danh sách thể loại -->
        <div>
            <label>Thể loại phim:</label>
            <ul>
                <li v-for="(item, index) in suatChieu.phim.danhSachTLPhims" :key="index">
                    {{ item.theLoaiPhim.tenTheLoai }}
                </li>
            </ul>
        </div>

        <!-- Giới hạn độ tuổi -->
        <div>
            <label>Giới hạn độ tuổi:</label>
            <input v-model="suatChieu.phim.gioiHanDoTuoi.tenDoTuoi" disabled />
        </div>

        <!-- Buttons -->
        <div class="button-container">
            <button @click="goBack">Trở về</button>
            <button @click="saveSuatChieu">Lưu lại</button>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin suất chiếu...</p>
    </div>
</div>
</template>

<script>
import { fetchSuatChieuById, updateSuatChieuById } from "@/api/schedual.ts";


export default {
    data() {
        return {
            suatChieu: null,
            formattedThoiGianChieu: "",
        };
    },
    async mounted() {
        await this.loadSuatChieu();
    },
    methods: {
        async loadSuatChieu() {
            const suatChieuId = this.$route.params.id;
            try {
                const data = await fetchSuatChieuById(suatChieuId);
                this.suatChieu = data;

                // Format thời gian chiếu
                if (data.thoiGianChieu) {
                    const date = new Date(data.thoiGianChieu[0], data.thoiGianChieu[1] - 1, data.thoiGianChieu[2], data.thoiGianChieu[3], data.thoiGianChieu[4]);
                    this.formattedThoiGianChieu = date.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể tải thông tin suất chiếu",
                });
            }
        },
        async saveSuatChieu() {
            try {
                const thoiGianChieuDate = new Date(this.formattedThoiGianChieu);
                const updatedSuatChieu = {
                    ...this.suatChieu,
                    thoiGianChieu: [
                        thoiGianChieuDate.getFullYear(),
                        thoiGianChieuDate.getMonth() + 1,
                        thoiGianChieuDate.getDate(),
                        thoiGianChieuDate.getHours(),
                        thoiGianChieuDate.getMinutes(),
                    ],
                };
                Swal.fire({
                    title: "Xác nhận",
                    text: "Bạn có chắc chắn muốn cập nhật thông tin suất chiếu này không?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Cập nhật",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.updateSuatChieu(updatedSuatChieu);
                    }
                });
                if (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Thành công",
                        text: "Cập nhật thông tin suất chiếu thành công.",
                    });
                    this.$router.go(-1);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể cập nhật thông tin suất chiếu",
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style src="./assets/styles.css" scoped></style>
<template>
<div class="age-group-detail">
    <div class="button-container">
        <button @click="goBack">Trở về</button>
        <button @click="saveAgeGroup">Lưu lại</button>
    </div>
    <div v-if="ageGroup">
        <div class="card age-group-info">
            <div>
                <label>Mã Độ Tuổi:</label>
                <input v-model="ageGroup.maDoTuoi" disabled />
            </div>
            <div>
                <label>Tên Độ Tuổi:</label>
                <input v-model="ageGroup.tenDoTuoi" />
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin độ tuổi...</p>
    </div>
</div>
</template>

<script>
import { fetchDoTuoiById, updateDoTuoiById } from "@/api/dotuoi"; // Assumes you have these API functions
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            ageGroup: null,
        };
    },
    async mounted() {
        await this.loadAgeGroup();
    },
    methods: {
        async loadAgeGroup() {
            const ageGroupId = this.$route.params.id;
            try {
                const ageGroupData = await fetchDoTuoiById(ageGroupId);
                this.ageGroup = ageGroupData;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải thông tin độ tuổi',
                });
            }
        },
        async saveAgeGroup() {
            if (this.ageGroup) {
                // Hiển thị hộp thoại xác nhận trước khi cập nhật độ tuổi
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: 'Bạn có chắc chắn muốn cập nhật độ tuổi này không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                });

                if (result.isConfirmed) {
                    try {
                        await updateDoTuoiById(this.ageGroup.id, this.ageGroup);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Độ tuổi đã được cập nhật thành công!',
                        });
                        this.$router.go(-1);
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Có lỗi xảy ra khi cập nhật độ tuổi.',
                        });
                    }
                }
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>

<style scoped src="./assets/styles.css"></style>
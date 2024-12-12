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
                console.error("Lỗi khi tải thông tin độ tuổi:", error);
            }
        },
        async saveAgeGroup() {
            if (this.ageGroup) {
                try {
                    await updateDoTuoiById(this.ageGroup.id, this.ageGroup);
                    alert("Độ tuổi đã được cập nhật thành công!");
                    this.$router.go(-1);
                } catch (error) {
                    console.error("Lỗi khi cập nhật độ tuổi:", error);
                    alert("Có lỗi xảy ra khi cập nhật độ tuổi.");
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
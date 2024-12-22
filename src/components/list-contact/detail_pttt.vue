<template>
<div class="payment-method-detail">
    <div class="button-container">
        <button @click="goBack">Trở về</button>
        <button @click="savePaymentMethod">Lưu lại</button>
    </div>
    <div v-if="paymentMethod">
        <div class="card payment-method-info">
            <div>
                <label>Mã PTTT:</label>
                <input v-model="paymentMethod.maPTTT" disabled />
            </div>
            <div>
                <label>Tên PTTT:</label>
                <input v-model="paymentMethod.tenPTTT" />
            </div>
            <div>
                <label>Trạng Thái:</label>
                <select v-model="paymentMethod.trangThaiPTTT">
                    <option value="0">Không hoạt động</option>
                    <option value="1">Hoạt động</option>
                </select>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải thông tin phương thức thanh toán...</p>
    </div>
</div>
</template>

<script>
import { fetchPTTTById, updatePTTTById } from "@/api/pttt"; // Assumes you have these API functions
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            paymentMethod: null,
        };
    },
    async mounted() {
        await this.loadPaymentMethod();
    },
    methods: {
        async loadPaymentMethod() {
            const paymentMethodId = this.$route.params.id;
            try {
                const paymentMethodData = await fetchPTTTById(paymentMethodId);
                this.paymentMethod = paymentMethodData;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải thông tin phương thức thanh toán',
                });
            }
        },
        async savePaymentMethod() {
            if (this.paymentMethod) {
                // Hiển thị hộp thoại xác nhận trước khi cập nhật phương thức thanh toán
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: 'Bạn có chắc chắn muốn cập nhật phương thức thanh toán này không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                });

                if (result.isConfirmed) {
                    try {
                        await updatePTTTById(this.paymentMethod.id, this.paymentMethod);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Phương thức thanh toán đã được cập nhật thành công!',
                        });
                        this.$router.go(-1);
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Có lỗi xảy ra khi cập nhật phương thức thanh toán.',
                        });
                    }
                }
            }
        },
        goBack() {
            this.$router.go(-1); // Quay lại trang trước
        }
    },
};
</script>

<style scoped src="./assets/styles.css"></style>
<template>
<div class="popup-container" v-if="isVisible">
    <div class="popup-content">
        <div class="date-timeset">
            <h2>Chấm công GPS / Cơm trưa</h2>
            <p>25/10/2024</p>
        </div>
        <button class="btn-point" @click="closePopup">Đóng</button>
    </div>
    <div class="popup-content">
        <div class="timeset-line">
            <div class="timeset-time">
                <h4>Chấm công lần 1 </h4>
                <p>7:45</p>
            </div>
            <div class="timeset-time">
                <h4>Chấm công lần 2 </h4>
                <p>17:45</p>
            </div>
        </div>
    </div>
    <div class="popup-content">
        <div class="user-info">
            <img src="@/assets/img/avt.jpg" alt="" class="user-reg-meal">
            <p>Đăng Khoa</p>
        </div>
    </div>
    <button class="reg-meal">Đăng ký cơm chưa</button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'PopupComponent',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close'],
    setup(_, { emit }) {
        const closePopup = () => {
            emit('close');
        };

        return { closePopup };
    }
});
</script>
<style src="./assets/styles.css"></style>

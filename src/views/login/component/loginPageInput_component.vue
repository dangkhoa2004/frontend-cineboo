<template>
<div class="body-container-form">
  <div class="movie-container">
    <div class="movie-forms">
      <div class="movie-form login">
        <span class="movie-title">ĐĂNG NHẬP</span>
        <form @submit.prevent="handleLogin">
          <div class="movie-input-field">
            <input type="text" placeholder="Nhập email của bạn" v-model="username" required />
            <i class="fas fa-envelope"></i>
          </div>
          <div class="movie-input-field">
            <input type="password" class="password" placeholder="Nhập mật khẩu của bạn" v-model="password" required />
            <i class="fas fa-lock"></i>
            <i class="fas fa-eye-slash showHidePw"></i>
          </div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div class="movie-checkbox-text">
            <div class="movie-checkbox-content">
              <input type="checkbox" id="logCheck" />
              <label for="logCheck" class="movie-text">Lưu đăng nhập</label>
            </div>
            <a href="/quen-mat-khau" class="movie-text">Quên mật khẩu?</a>
          </div>
          <div class="movie-input-field">
            <button class="btn draw-border">ĐĂNG NHẬP</button>
          </div>
        </form>
        <div class="movie-login-signup">
          <span class="movie-text">
            Chưa phải là Thành Viên?
            <a href="#" class="movie-text movie-signup-link">Đăng ký ngay</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from "vue";
import { login } from "@/api/authService";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const handleLogin = async () => {
      try {
        await login(username.value, password.value); // Gọi hàm login
        window.location.href = "/"; // Chuyển hướng sau khi đăng nhập thành công
      } catch (error) {
        errorMessage.value = error.message; // Hiển thị thông báo lỗi
      }
    };
    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style src="../assets/styles.css"></style>

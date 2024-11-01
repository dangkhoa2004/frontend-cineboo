<template>
  <div class="body-container-form">
    <div class="movie-container">
      <div class="movie-forms">
        <div class="movie-form login">
          <span class="movie-title">ĐĂNG NHẬP</span>
          <form @submit.prevent="handleLogin">
            <div class="movie-input-field">
              <input type="text" placeholder="Nhập email của bạn" v-model="username" />
              <i class="fas fa-envelope"></i>
            </div>
            <div class="movie-input-field">
              <input
                type="password"
                class="password"
                placeholder="Nhập mật khẩu của bạn"
                v-model="password"
              />
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
            <div class="movie-input-field movie-button">
              <button class="btn nav_btn draw-border">ĐĂNG NHẬP</button>
            </div>
          </form>
          <div class="movie-login-signup">
            <span class="movie-text"
              >Chưa phải là Thành Viên?
              <a href="#" class="movie-text movie-signup-link">Đăng ký ngay</a>
            </span>
          </div>
        </div>
        <div class="movie-form signup">
          <span class="movie-title">ĐĂNG KÝ</span>
          <form @submit.prevent="signup">
            <div class="movie-input-field">
              <input type="text" placeholder="Nhập tên của bạn" required />
              <i class="fas fa-user"></i>
            </div>
            <div class="movie-input-field">
              <input type="text" placeholder="Nhập email của bạn" required />
              <i class="fas fa-envelope"></i>
            </div>
            <div class="movie-input-field">
              <input
                type="password"
                class="password"
                placeholder="Nhập mật khẩu"
                required
              />
              <i class="fas fa-lock"></i>
            </div>
            <div class="movie-input-field">
              <input
                type="password"
                class="password"
                placeholder="Xác nhận mật khẩu"
                required
              />
              <i class="fas fa-lock"></i>
              <i class="fas fa-eye-slash showHidePw"></i>
            </div>
            <div class="movie-checkbox-text">
              <div class="movie-checkbox-content">
                <input type="checkbox" id="termCon" />
                <label for="termCon" class="movie-text"
                  >Tôi đã chấp nhận tất cả các điều khoản và điều kiện</label
                >
              </div>
            </div>

            <div class="movie-input-field movie-button">
              <input type="button" value="Đăng ký" />
            </div>
          </form>
          <div class="movie-login-signup">
            <span class="movie-text"
              >Đã đăng ký thành viên
              <a href="#" class="movie-text movie-login-link">Đăng nhập ngay</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { setToken, storageLocal, authService } from "@/api/authService.ts";

export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const handleLogin = async () => {
      try {
        const response = await authService.login(username.value, password.value);
        setToken(response.token);
        storageLocal().setItem("userInfo", JSON.stringify(response.userInfo));
        console.log("Đăng nhập thành công:", response.token);
        window.location.href = "/";
      } catch (error) {
        errorMessage.value =
          "Đăng nhập thất bại: " + (error.response?.data?.message || error.message);
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

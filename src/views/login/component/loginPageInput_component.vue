<template>
<div class="body-container-form">
  <div class="movie-container">
    <div class="movie-forms">
      <div class="movie-form login">
        <span class="movie-title">ĐĂNG NHẬP</span>
        <form @submit.prevent="handleLogin">
          <div class="movie-input-field">
            <input type="text" placeholder="Nhập email của bạn" v-model="formData.username" required />
            <i class="fas fa-envelope"></i>
          </div>
          <div class="movie-input-field">
            <input type="password" class="password" placeholder="Nhập mật khẩu của bạn" v-model="formData.password"
              required />
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
      <div class="movie-form signup">
        <span class="movie-title">ĐĂNG KÝ</span>
        <form @submit.prevent="handleSignUp">
          <div class="movie-input-field">
            <input type="text" placeholder="Tên" v-model="formData.ten" required />
            <i class="fas fa-user"></i>
          </div>
          <div class="movie-input-field">
            <input type="text" placeholder="Họ" v-model="formData.ho" required />
            <i class="fas fa-user"></i>
          </div>
          <div class="movie-input-field">
            <input type="text" placeholder="Tên đệm" v-model="formData.tenDem" required />
            <i class="fas fa-user"></i>
          </div>
          <div class="movie-input-field">
            <input type="date" placeholder="Ngày sinh" v-model="formData.ngaySinh" required />
            <i class="fas fa-birthday-cake"></i>
          </div>
          <div class="movie-input-field">
            <input type="number" placeholder="Số điện thoại" v-model="formData.soDienThoai" required />
            <i class="fas fa-phone"></i>
          </div>
          <!-- <div class="movie-input-field">
            <label for="">Dân tộc: </label>
            <select v-model="formData.danToc" required>
              <option value="Kinh">Kinh</option>
            </select>
          </div> -->
          <div class="movie-input-field">
            <input type="text" placeholder="Địa chỉ" v-model="formData.diaChi" required />
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="movie-input-field">
            <input type="text" placeholder="Tên người dùng" v-model="formData.username" required />
            <i class="fas fa-user"></i>
          </div>
          <div class="movie-input-field">
            <input type="text" placeholder="Email" v-model="formData.email" required />
            <i class="fas fa-envelope"></i>
          </div>
          <div class="movie-input-field">
            <input type="password" class="password" placeholder="Nhập mật khẩu" v-model="formData.password" required />
            <i class="fas fa-lock"></i>
          </div>
          <div class="movie-checkbox-text">
            <div class="movie-checkbox-content">
              <input type="checkbox" id="termCon" />
              <label for="termCon" class="movie-text">
                Tôi đã chấp nhận tất cả các điều khoản và điều kiện
              </label>
            </div>
          </div>
          <div class="movie-input-field">
            <button class="btn draw-border">ĐĂNG ký</button>
          </div>
        </form>
        <div class="movie-login-signup">
          <span class="movie-text">
            Đã đăng ký thành viên
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
import { login, signup } from "@/api/authService";

export default {
  name: "Login",
  setup() {
    const formData = ref({
      username: "",
      password: "",
      ho: "",
      ten: "",
      tenDem: "",
      diaChi: "",
      email: "",
      soDienThoai: "",
      ngaySinh: "",
      danToc: 1,
    });
    const errorMessage = ref("");

    // Hàm đăng nhập
    const handleLogin = async () => {
      try {
        await login(formData.value.username, formData.value.password);
        window.location.href = "/";
      } catch (error) {
        errorMessage.value = error.message;
      }
    };
    const handleSignUp = async () => {
      try {
        // Truyền toàn bộ đối tượng formData.value vào hàm signup
        await signup(formData.value);
        await handleLogin(); // Tự động đăng nhập sau khi đăng ký
      } catch (error) {
        errorMessage.value = error.message;
      }
    };
    return {
      formData,
      errorMessage,
      handleLogin,
      handleSignUp,
    };
  },
};
</script>


<style src="../assets/styles.css"></style>

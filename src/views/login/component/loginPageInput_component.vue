<template>
<div class="auth-container">
  <div class="auth-box">
    <!-- Form Đăng Nhập -->
    <div class="auth-form login-form" :class="{ active: isLoginActive }">
      <h2 class="form-title">Đăng Nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-field">
          <input type="text" placeholder="Email" v-model="formData.username" required />
          <i class="fas fa-envelope"></i>
        </div>
        <div class="input-field">
          <input type="password" placeholder="Mật khẩu" v-model="formData.password" required />
          <i class="fas fa-lock"></i>
          <i class="fas fa-eye-slash toggle-password" @click="togglePasswordVisibility"></i>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" class="auth-btn">Đăng Nhập</button>
      </form>
      <p class="toggle-form-link">Chưa có tài khoản? <span @click="toggleForm">Đăng ký ngay</span></p>
    </div>

    <!-- Form Đăng Ký -->
    <div class="auth-form signup-form" :class="{ active: !isLoginActive }">
      <h2 class="form-title">Đăng Ký</h2>
      <form @submit.prevent="handleSignUp">
        <div class="input-field">
          <input type="text" placeholder="Họ" v-model="formData.ho" required />
          <i class="fas fa-user"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Tên" v-model="formData.ten" required />
          <i class="fas fa-user"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Tên đệm" v-model="formData.tenDem" />
          <i class="fas fa-user"></i>
        </div>
        <div class="input-field">
          <input type="date" placeholder="Ngày sinh" v-model="formData.ngaySinh" />
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Số điện thoại" v-model="formData.soDienThoai" />
          <i class="fas fa-phone"></i>
        </div>
        <div class="input-field">
          <select v-model="formData.gioiTinh">
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
            <option value="2">Khác</option>
          </select>
          <i class="fas fa-venus-mars"></i>
        </div>
        <div class="input-field">
          <input type="email" placeholder="Email" v-model="formData.email" required />
          <i class="fas fa-envelope"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Dân tộc" v-model="formData.danToc" />
          <i class="fas fa-users"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Địa chỉ" v-model="formData.diaChi" />
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="input-field">
          <input type="text" placeholder="Username" v-model="formData.username" required />
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="input-field">
          <input type="password" placeholder="Mật khẩu" v-model="formData.password" required />
          <i class="fas fa-lock"></i>
        </div>
        <div class="input-field">
          <button type="submit" class="auth-btn">Đăng Ký</button>
        </div>
      </form>
      <p class="toggle-form-link">Đã có tài khoản? <span @click="toggleForm">Đăng nhập ngay</span></p>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { login, signup } from '@/api/authService';

export default {
  name: 'AuthForm',
  setup() {
    const isLoginActive = ref(true); // Biến xác định trạng thái của form đăng nhập
    const formData = ref({
      username: '', // Username field
      password: '',
      ho: '',
      ten: '',
      tenDem: '', // Middle name
      ngaySinh: '', // Birth date
      soDienThoai: '', // Phone number
      gioiTinh: 0, // Gender (default: 0 - Male)
      email: '',
      danToc: '', // Ethnicity
      diaChi: '', // Address
    });
    const errorMessage = ref('');

    // Toggle giữa form đăng nhập và đăng ký
    const toggleForm = () => {
      isLoginActive.value = !isLoginActive.value;
    };

    // Hàm đăng nhập
    const handleLogin = async () => {
      try {
        await login(formData.value.username, formData.value.password);
        window.location.href = '/';
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // Hàm đăng ký
    const handleSignUp = async () => {
      try {
        await signup(formData.value);
        await handleLogin(); // Tự động đăng nhập sau khi đăng ký
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // Chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
      const passwordField = document.querySelector('input[type="password"]');
      if (passwordField) {
        passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
      }
    };

    return {
      formData,
      errorMessage,
      handleLogin,
      handleSignUp,
      toggleForm,
      togglePasswordVisibility,
      isLoginActive,
    };
  },
};
</script>


<style src="../assets/styles.css"></style>
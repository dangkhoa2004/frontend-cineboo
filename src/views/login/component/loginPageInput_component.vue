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
          <input :type="isPasswordVisible ? 'text' : 'password'" placeholder="Mật khẩu" v-model="formData.password"
            required />
          <i class="fas" :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'" @click="togglePasswordVisibility"></i>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" class="auth-btn">Đăng Nhập</button>
      </form>
      <p class="toggle-form-link">Chưa có tài khoản? <span @click="toggleForm">Đăng ký ngay</span></p>
      <p class="toggle-form-link">Bạn quên mật khẩu ? <span @click="forgotPassword">Quên Mật Khẩu</span></p>
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
          <input :type="isPasswordVisible ? 'text' : 'password'" placeholder="Mật khẩu" v-model="formData.password"
            required />
          <i class="fas" :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'" @click="togglePasswordVisibility"></i>
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
import { useRouter } from 'vue-router';
import { login, signup } from '@/api/authService';

export default {
  name: 'AuthForm',
  setup() {
    const router = useRouter();
    const isLoginActive = ref(true);
    const formData = ref({
      username: '',
      password: '',
      ho: '',
      ten: '',
      tenDem: '',
      ngaySinh: '',
      soDienThoai: '',
      gioiTinh: 0,
      email: '',
      danToc: '',
      diaChi: '',
    });
    const errorMessage = ref('');
    const isPasswordVisible = ref(false);

    const toggleForm = () => {
      isLoginActive.value = !isLoginActive.value;
    };

    const forgotPassword = () => {
      router.push('/quen-mat-khau');
    };

    const handleLogin = async () => {
      try {
        await login(formData.value.username, formData.value.password);
        window.location.href = '/';
      } catch (error) {
        errorMessage.value = error.message;
      }
    }; const handleSignUp = async () => {
      try {
        await signup(formData.value);
        await handleLogin(); // Tự động đăng nhập sau khi đăng ký
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    return {
      formData,
      errorMessage,
      handleLogin,
      handleSignUp,
      toggleForm,
      forgotPassword,
      togglePasswordVisibility,
      isLoginActive,
      isPasswordVisible,
    };
  },
};
</script>

<style src="../assets/styles.css"></style>

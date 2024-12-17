<template>
<div class="forgot-password-container">
  <h2>Quên mật khẩu</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="Nhập địa chỉ email của bạn" required />
    </div>
    <button type="submit" class="btn">Gửi yêu cầu</button>
  </form>
  <p v-if="message" class="message">{{ message }}</p>
</div>
</template>

<script>
import { recoverPassword } from "@/api/authService.ts";

export default {
  data() {
    return {
      email: '', // Lưu email người dùng nhập
      message: '' // Hiển thị thông báo cho người dùng
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.email) {
        this.message = 'Vui lòng nhập địa chỉ email.';
        return;
      }
      try {
        // Sử dụng recoverPassword từ authService
        await recoverPassword(this.email);
        this.message = 'Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email.';
      } catch (error) {
        this.message = error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
      }
    }
  }
};

</script>
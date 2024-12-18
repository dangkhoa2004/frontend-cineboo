<template>
<div class="recovery-password">
  <!-- Forgot password -->
  <div v-if="currentStep === 'forgot-password'" class="recovery-password-step-container">
    <div class="recovery-password-step-card">
      <h2 class="recovery-password-step-header">Quên mật khẩu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Nhập địa chỉ email của bạn"
            required />
        </div>
        <button type="submit" class="btn">Gửi yêu cầu</button>
      </form>
      <p v-if="message" class="recovery-password-message" :class="isError ? 'text-danger' : 'text-success'">
        {{ message }}
      </p>
    </div>
  </div>

  <!-- Reset password -->
  <div v-if="currentStep === 'reset-password'" class="recovery-password-step-container">
    <div class="recovery-password-step-card">
      <h2 class="recovery-password-step-header">Đặt lại mật khẩu</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Nhập email của bạn"
            required />
        </div>
        <div class="form-group">
          <label for="otp" class="form-label">Mã OTP</label>
          <input type="text" id="otp" v-model="otp" class="form-control" placeholder="Nhập mã OTP" required />
        </div>
        <div class="form-group">
          <label for="newPassword" class="form-label">Mật khẩu mới</label>
          <input type="password" id="newPassword" v-model="newPassword" class="form-control"
            placeholder="Nhập mật khẩu mới" required />
        </div>
        <div class="form-group">
          <label for="retypePassword" class="form-label">Xác nhận mật khẩu</label>
          <input type="password" id="retypePassword" v-model="retypePassword" class="form-control"
            placeholder="Nhập lại mật khẩu mới" required />
        </div>
        <button type="submit" class="btn">Đặt lại mật khẩu</button>
      </form>
      <p v-if="message" class="recovery-password-message" :class="isError ? 'text-danger' : 'text-success'">
        {{ message }}
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { recoverPassword } from "@/api/authService";
import { resetPassword } from "@/api/authService";

export default {
  data() {
    return {
      email: "", // Email người dùng nhập
      otp: "", // Mã OTP để đặt lại mật khẩu
      newPassword: "", // Mật khẩu mới
      retypePassword: "", // Xác nhận mật khẩu mới
      message: "", // Thông báo cho người dùng
      isError: false, // Trạng thái lỗi (true) hoặc thành công (false)
      currentStep: "forgot-password", // Bước hiện tại: 'forgot-password' hoặc 'reset-password'
    };
  },
  methods: {
    // Kiểm tra email hợp lệ
    isEmailValid(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    // Kiểm tra OTP hợp lệ
    isOtpValid(otp) {
      return otp.length === 6; // Giả sử OTP là chuỗi 6 ký tự
    },
    // Hiển thị thông báo
    displayMessage(msg, isError) {
      this.message = msg;
      this.isError = isError;
    },
    // Xử lý yêu cầu khôi phục mật khẩu
    async handleSubmit() {
      if (!this.email) {
        this.displayMessage("Vui lòng nhập địa chỉ email.", true);
        return;
      }
      if (!this.isEmailValid(this.email)) {
        this.displayMessage("Địa chỉ email không hợp lệ.", true);
        return;
      }
      try {
        await recoverPassword(this.email);
        this.displayMessage("Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email.", false);
        this.currentStep = "reset-password";
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
        this.displayMessage(errorMessage, true);
      }
    },
    // Xử lý đặt lại mật khẩu
    async handleResetPassword() {
      if (!this.email || !this.otp || !this.newPassword || !this.retypePassword) {
        this.displayMessage("Vui lòng điền đầy đủ thông tin.", true);
        return;
      }
      if (!this.isEmailValid(this.email)) {
        this.displayMessage("Địa chỉ email không hợp lệ.", true);
        return;
      }
      if (!this.isOtpValid(this.otp)) {
        this.displayMessage("Mã OTP không hợp lệ.", true);
        return;
      }
      if (this.newPassword !== this.retypePassword) {
        this.displayMessage("Mật khẩu không khớp. Vui lòng thử lại.", true);
        return;
      }
      try {
        await resetPassword(this.email, this.otp, this.newPassword, this.retypePassword);
        this.displayMessage("Mật khẩu đã được đặt lại thành công.", false);
        window.location.href = '/dang-nhap';
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
        this.displayMessage(errorMessage, true);
      }
    },
  },
};
</script>

<style src="../assets/styles.css" scoped></style>

<template>
<div class="recovery-password">
  <!-- Forgot password -->
  <div v-if="currentStep === 'forgot-password'" class="recovery-password-step-container">
    <div class="recovery-password-step-card">
      <h2 class="recovery-password-step-header">Quên mật khẩu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="text" id="email" v-model="email" class="form-control" placeholder="Nhập địa chỉ email của bạn" />
        </div>
        <button type="submit" class="btn">Gửi yêu cầu</button>
      </form>
    </div>
  </div>

  <!-- Reset password -->
  <div v-if="currentStep === 'reset-password'" class="recovery-password-step-container">
    <div class="recovery-password-step-card">
      <h2 class="recovery-password-step-header">Đặt lại mật khẩu</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="text" id="email" v-model="email" class="form-control" placeholder="Nhập email của bạn" />
        </div>
        <div class="form-group">
          <label for="otp" class="form-label">Mã OTP</label>
          <input type="text" id="otp" v-model="otp" class="form-control" placeholder="Nhập mã OTP" />
        </div>
        <div class="form-group">
          <label for="newPassword" class="form-label">Mật khẩu mới</label>
          <input type="password" id="newPassword" v-model="newPassword" class="form-control"
            placeholder="Nhập mật khẩu mới" />
        </div>
        <div class="form-group">
          <label for="retypePassword" class="form-label">Xác nhận mật khẩu</label>
          <input type="password" id="retypePassword" v-model="retypePassword" class="form-control"
            placeholder="Nhập lại mật khẩu mới" />
        </div>
        <button type="submit" class="btn">Đặt lại mật khẩu</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { recoverPassword, resetPassword } from "@/api/authService";
import Swal from 'sweetalert2';
import { validateEmail, validatePassword, validateRequiredField } from '@/utils/validation';

export default {
  data() {
    return {
      email: "", // Email người dùng nhập
      otp: "", // Mã OTP để đặt lại mật khẩu
      newPassword: "", // Mật khẩu mới
      retypePassword: "", // Xác nhận mật khẩu mới
      currentStep: "forgot-password", // Bước hiện tại: 'forgot-password' hoặc 'reset-password'
    };
  },
  methods: {
    async handleSubmit() {
      const emailError = validateEmail(this.email);
      if (emailError) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: emailError,
        }).then(() => {
          location.reload(); // Reload trang sau khi người dùng bấm "OK"
        });
        return;
      }
      try {
        await recoverPassword(this.email);
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: "Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email.",
        });
        this.currentStep = "reset-password";
      } catch (error) {
        const errorCode = error.response?.status;
        let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        if (errorCode === 403) {
          errorMessage = "Vui lòng chờ 5 phút và thử lại.";
        } else if (errorCode === 500) {
          errorMessage = "Email không tồn tại.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: errorMessage,
        }).then(() => {
          location.reload(); // Reload trang sau khi người dùng bấm "OK"
        });
      }
    },
    // Xử lý đặt lại mật khẩu
    async handleResetPassword() {
      const emailError = validateEmail(this.email);
      const otpError = validateRequiredField(this.otp, "Mã OTP");
      const newPasswordError = validatePassword(this.newPassword);
      const retypePasswordError = validatePassword(this.retypePassword);

      if (emailError || otpError || newPasswordError || retypePasswordError) {
        this.displayMessage(emailError || otpError || newPasswordError || retypePasswordError, true);
        return;
      }

      if (this.newPassword !== this.retypePassword) {
        this.displayMessage("Mật khẩu không khớp. Vui lòng thử lại.", true);
        return;
      }
      try {
        await resetPassword(this.email, this.otp, this.newPassword, this.retypePassword);
        this.displayMessage("Mật khẩu đã được đặt lại thành công.", false);
        setTimeout(() => {
          window.location.href = '/dang-nhap';
        }, 3000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
        this.displayMessage(errorMessage, true);
      }
    },
  },
};
</script>

<style src="../assets/styles.css" scoped></style>
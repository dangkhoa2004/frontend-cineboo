<template>
    <div class="forgot-password-container">
      <h2>Quên mật khẩu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Nhập địa chỉ email của bạn"
            required
          />
        </div>
        <button type="submit" class="btn">Gửi yêu cầu</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
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
          // Gửi yêu cầu đặt lại mật khẩu đến API
          const response = await fetch(
            `http://localhost:8080/taikhoan/recovery/send?email=${encodeURIComponent(this.email)}`, // Thay đổi email động
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
  
          if (response.ok) {
            this.message = 'Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email.';
          } else {
            const data = await response.json();
            this.message = data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
          }
        } catch (error) {
          this.message = 'Không thể gửi yêu cầu. Vui lòng kiểm tra kết nối mạng.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .message {
    margin-top: 15px;
    text-align: center;
    color: green;
  }
  </style>
  
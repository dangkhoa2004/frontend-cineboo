<template>
    <div class="movie_checkout_container">
      <div class="movie_checkout_payment">
        <div class="movie_checkout_payment__title">
          PHƯƠNG THỨC THANH TOÁN
        </div>
        <div class="movie_checkout_payment__types">
          <div class="movie_checkout_payment__type movie_checkout_payment__type--cc active">
            QR CODE
          </div>
          <div class="movie_checkout_payment__type movie_checkout_payment__type--paypal">
            VISA
          </div>
          <div class="movie_checkout_payment__type movie_checkout_payment__type--sepa">
            MOMO
          </div>
          <div class="movie_checkout_payment__type movie_checkout_payment__type--invoice">
            ZALO PAY
          </div>
        </div>
  
        <!-- Hiển thị thông tin khách hàng -->
        <div class="movie_checkout_payment__info">
          <div class="movie_checkout_payment__cc">
            <div class="movie_checkout_payment__title">
              THÔNG TIN KHÁCH HÀNG
            </div>
            <form v-if="userInfo && userInfo.ten">
              <div class="movie_checkout_form">
                <div class="movie_checkout_row">
                  <div class="movie_checkout_field">
                    <div class="movie_checkout_title">Tên khách hàng</div>
                    <input type="text" class="movie_checkout_input" v-model="userInfo.ten" name="username" id="username" autocomplete="username" />
                  </div>
                  <div class="movie_checkout_field">
                    <div class="movie_checkout_title">Email khách hàng</div>
                    <input type="email" class="movie_checkout_input" v-model="userInfo.email" name="email" id="email" autocomplete="email" />
                  </div>
                  <div class="movie_checkout_field">
                    <div class="movie_checkout_title">Số điện thoại</div>
                    <input type="tel" class="movie_checkout_input" v-model="userInfo.phone_number" name="phone_number" id="phone_number" autocomplete="tel" />
                  </div>
                </div>
                <div class="movie_checkout_row">
                  <div class="movie_checkout_field">
                    <div class="movie_checkout_title">Địa chỉ</div>
                    <input type="text" class="movie_checkout_input" v-model="userInfo.address" name="address" id="address" autocomplete="address-line1" />
                  </div>
                </div>
              </div>
            </form>
            <div v-else>
              <p>Không có thông tin khách hàng. Vui lòng đăng nhập để tiếp tục.</p>
              <!-- Hiển thị nút đăng nhập nếu không có thông tin khách hàng -->
              <router-link to="/login" class="btn">Đăng nhập</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getUserInfo } from '@/api/authService'; // Đảm bảo import hàm getUserInfo từ authService
  
  export default {
    data() {
      return {
        userInfo: {} // Khai báo userInfo để lưu thông tin người dùng
      };
    },
    created() {
      const user = getUserInfo();
      console.log('User info:', user); // Kiểm tra thông tin người dùng
      if (user) {
        this.userInfo = { ...user }; // Cập nhật thông tin người dùng vào state
      } else {
        console.log("Không có thông tin người dùng.");
      }
    }
  };
  </script>
  
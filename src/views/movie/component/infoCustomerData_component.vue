<template>
<div class="movie_checkout_container">
  <!-- Container chính của trang thanh toán -->
  <div class="movie_checkout_payment">
    <!-- Tiêu đề -->
    <div class="movie_checkout_payment__title">
      PHƯƠNG THỨC THANH TOÁN
    </div>

    <!-- Danh sách các phương thức thanh toán -->
    <div class="movie_checkout_payment__types">
      <!-- Lặp qua danh sách các phương thức thanh toán và tạo nút cho từng phương thức -->
      <div v-for="(method, index) in myList" :key="method.id"
        :class="['movie_checkout_payment__type', { active: selectedPaymentMethod === method.tenPTTT }]"
        @click="selectPaymentMethod(method.tenPTTT)">
        {{ method.tenPTTT }}
      </div>
    </div>

    <!-- Hiển thị thông tin khách hàng -->
    <div class="movie_checkout_payment__info">
      <div class="movie_checkout_payment__cc">
        <div class="movie_checkout_payment__title">
          THÔNG TIN KHÁCH HÀNG
        </div>

        <!-- Nếu có thông tin khách hàng thì hiển thị form -->
        <form v-if="userInfo && userInfo.ten">
          <div class="movie_checkout_form">
            <div class="movie_checkout_row">
              <!-- Trường nhập Tên khách hàng -->
              <div class="movie_checkout_field">
                <div class="movie_checkout_title">Tên khách hàng</div>
                <input type="text" class="movie_checkout_input" :value="getFullName()" name="username" id="username"
                  autocomplete="username" readonly />
              </div>

              <!-- Trường nhập Email khách hàng -->
              <div class="movie_checkout_field">
                <div class="movie_checkout_title">Email khách hàng</div>
                <input type="email" class="movie_checkout_input" v-model="userInfo.email" name="email" id="email"
                  autocomplete="email" readonly />
              </div>

              <!-- Trường nhập Số điện thoại -->
              <div class="movie_checkout_field">
                <div class="movie_checkout_title">Số điện thoại</div>
                <input type="tel" class="movie_checkout_input" v-model="userInfo.soDienThoai" name="phone_number"
                  id="phone_number" autocomplete="tel" readonly />
              </div>
            </div>

            <div class="movie_checkout_row">
              <!-- Trường nhập Địa chỉ -->
              <div class="movie_checkout_field">
                <div class="movie_checkout_title">Địa chỉ</div>
                <input type="text" class="movie_checkout_input" v-model="userInfo.diaChi" name="address" id="address"
                  autocomplete="address-line1" readonly />
              </div>
            </div>
          </div>
        </form>

        <!-- Nếu không có thông tin khách hàng, hiển thị thông báo yêu cầu đăng nhập -->
        <div v-else>
          <p>Không có thông tin khách hàng. Vui lòng đăng nhập để tiếp tục.</p>
          <router-link to="/dang-nhap" class="btn">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { getUserInfo } from '@/api/authService';
import { requestWithJWT } from '@/api/api.ts';

// Biến reactive chứa thông tin khách hàng
let userInfo = ref({});

// Biến reactive chứa danh sách các phương thức thanh toán
let myList = ref([]);

// Biến reactive lưu phương thức thanh toán được chọn
let selectedPaymentMethod = ref('');

// Khai báo sự kiện để gửi dữ liệu ra component cha
const emit = defineEmits(['update-payment-method']);

// Hàm tải danh sách các phương thức thanh toán từ API
const loadPaymentMethod = async () => {
  try {
    // Gửi yêu cầu GET đến API để lấy danh sách phương thức thanh toán
    const response = await requestWithJWT('GET', 'http://localhost:8080/pttt/get');
    myList.value = response.data;

    // Chọn mặc định phương thức thứ 3 trong danh sách (nếu có)
    selectedPaymentMethod.value = (myList.value)[2]?.tenPTTT || '';

    // Phát sự kiện với ID của phương thức mặc định
    if (myList.value.length > 0) {
      emit('update-payment-method', myList.value[2]?.id);
    }
  } catch (error) {
    console.error('Lỗi khi tải phương thức thanh toán:', error);
  }
};

// Hàm tải thông tin người dùng từ sessionStorage
const loadUserInfo = () => {
  const user = getUserInfo();
  if (user) {
    // Kiểm tra loại tài khoản (Khách hàng hoặc Nhân viên)
    const isKhachHang = !!user.khachHang;
    const isNhanVien = !!user.nhanVien;
    userInfo.value = {
      email: user.email || '',
      ten: isKhachHang ? user.khachHang.ten : isNhanVien ? user.nhanVien.ten : '',
      tenDem: isKhachHang ? user.khachHang.tenDem : isNhanVien ? user.nhanVien.tenDem : '',
      ho: isKhachHang ? user.khachHang.ho : isNhanVien ? user.nhanVien.ho : '',
      diaChi: isKhachHang ? user.khachHang.diaChi : isNhanVien ? user.nhanVien.diaChi : '',
      soDienThoai: isKhachHang ? user.khachHang.soDienThoai : isNhanVien ? user.nhanVien.soDienThoai : '',
    };
  } else {
    console.log('Không có thông tin người dùng.');
  }
};

// Hàm xử lý khi người dùng chọn một phương thức thanh toán
const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
  const selectedMethod = myList.value.find((m) => m.tenPTTT === method);
  if (selectedMethod) {
    emit('update-payment-method', selectedMethod.id);
  }
};

// Hàm trả về họ và tên đầy đủ của người dùng
const getFullName = () => {
  return `${userInfo.value.ho} ${userInfo.value.tenDem} ${userInfo.value.ten}`;
};

// Hook được gọi khi component được mount
onMounted(() => {
  loadUserInfo();
  loadPaymentMethod();
});
</script>
<!-- infoCustomerData_component.vue -->
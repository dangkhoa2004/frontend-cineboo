<template>
  <div class="movie_checkout_container">
    <div class="movie_checkout_payment">
      <div class="movie_checkout_payment__title">
        PHƯƠNG THỨC THANH TOÁN
      </div>
      <div class="movie_checkout_payment__types">
        <div
          v-for="(method, index) in myList"
          :key="method.id"
          :class="['movie_checkout_payment__type', { active: selectedPaymentMethod === method.tenPTTT }]"
          @click="selectPaymentMethod(method.tenPTTT)"
        >
          {{ method.tenPTTT }}
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
                  <input
                    type="text"
                    class="movie_checkout_input"
                     :value="getFullName()"
      readonly
                    name="username"
                    id="username"
                    autocomplete="username"
                  />
                </div>
                <div class="movie_checkout_field">
                  <div class="movie_checkout_title">Email khách hàng</div>
                  <input
                    type="email"
                    class="movie_checkout_input"
                    v-model="userInfo.email"
                    name="email"
                    id="email"
                    autocomplete="email"
					readonly
                  />
                </div>
                <div class="movie_checkout_field">
                  <div class="movie_checkout_title">Số điện thoại</div>
                  <input
                    type="tel"
                    class="movie_checkout_input"
                    v-model="userInfo.phone_number"
                    name="phone_number"
                    id="phone_number"
                    autocomplete="tel"
					disabled="true"
					 
                  />
                </div>
              </div>
              <div class="movie_checkout_row">
                <div class="movie_checkout_field">
                  <div class="movie_checkout_title">Địa chỉ</div>
                  <input
                    type="text"
                    class="movie_checkout_input"
                    v-model="userInfo.diaChi"
                    name="address"
                    id="address"
                    autocomplete="address-line1"
					readonly
                  />
                </div>
              </div>
            </div>
          </form>
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
import { ref, onMounted,defineEmits } from 'vue';
import { getUserInfo } from '@/api/authService';
import { requestWithJWT } from '@/api/api.ts';

// Reactive variables
let userInfo = ref({});
let myList = ref([]); // List of payment methods
let selectedPaymentMethod = ref(''); // Default selected payment method
const emit = defineEmits(['update-payment-method']);
// Methods
const loadPaymentMethod = async () => {
  try {
    const response = await requestWithJWT('GET', 'http://localhost:8080/pttt/get');
	myList.value = response.data;
    selectedPaymentMethod.value = (myList.value)[2]?.tenPTTT || ''; // Default to "Chuyển Khoản" or first method
	
	//Emit payment methods to parent/choosePaymentData to set phuong thuc thanh toan later
	//Why is UI for payment method in infoCustomerData in the first place????
	  if (myList.value.length > 0) {
      emit('update-payment-method', myList.value[2]?.id); // Emit the default method's ID
    }
  } catch (error) {
    console.error('Error loading payment methods:', error);
  }
};

const loadUserInfo = () => {
  const user = getUserInfo();
  if (user) {
    userInfo.value = { ...user };
  } else {
    console.log('Không có thông tin người dùng.');
  }
};

// Event handler for selecting payment method
const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
   const selectedMethod = myList.value.find((m) => m.tenPTTT === method);
  if (selectedMethod) {
    emit('update-payment-method', selectedMethod.id); // Emit the new method's ID whenever the user selects a new method
  }
};
const getFullName = () => {
  return `${userInfo.value.ho} ${userInfo.value.tenDem} ${userInfo.value.ten}`;
};
// Lifecycle hook
onMounted(() => {
  loadUserInfo();
  loadPaymentMethod();
});
</script>

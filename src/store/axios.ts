import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]');

// Đặt CSRF token vào các yêu cầu sau khi đăng nhập, nếu có
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');
}

export default axios;

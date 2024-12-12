import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "./modules/home";
import authRoutes from "./modules/login";
import bookingRoutes from "./modules/booking";
import movieRoutes from "./modules/movie";
import NProgress from "nprogress";
import "nprogress/nprogress.css";  // Thư viện NProgress để hiển thị thanh tiến trình khi chuyển trang
import { isLoggedIn, getUserInfo } from "@/api/authService"; // Hàm kiểm tra đăng nhập và lấy thông tin người dùng
import notFoundComponent from '@/components/notFoundComponent/index.vue'; // Trang 404 nếu không tìm thấy route
import BarView from "@/views/statistic/BarView.vue";  // Thành phần hiển thị biểu đồ cột
import ScatterView from "@/views/statistic/ScatterView.vue";  // Thành phần hiển thị biểu đồ phân tán
import PieView from "@/views/statistic/PieView.vue";  // Thành phần hiển thị biểu đồ bánh
import QRScannerView from "@/views/ticket/QRScannerView.vue";
import ConfirmPrintTicketView from "@/views/ticket/ConfirmPrintTicketView.vue";
// Định nghĩa các routes chính cho ứng dụng
const routes = [
  // Định nghĩa route chính cho trang chủ, tự động chuyển hướng đến "/trang-chu"
  {
    path: "/",
    redirect: "/trang-chu",
  },

  // Các route từ các module khác nhau
  ...authRoutes,  // Routes cho phần đăng nhập
  ...homeRoutes,  // Routes cho phần trang chủ
  ...bookingRoutes,  // Routes cho phần đặt vé
  ...movieRoutes,  // Routes cho phần quản lý phim

  // Route cho trang không tìm thấy
  {
    path: '/:pathMatch(.*)*',
    component: notFoundComponent,
    name: 'NotFound',  // Thêm tên cho route 404 để dễ dàng điều hướng
  },

  // Các route cho các biểu đồ thống kê
  {
    path: '/bar',
    name: 'bar',
    component: BarView,  // Thành phần hiển thị biểu đồ cột
  },
  {
    path: '/scatter',
    name: 'scatter',
    component: ScatterView,  // Thành phần hiển thị biểu đồ phân tán
  },
  {
    path: '/pie',
    name: 'pie',
    component: PieView,  // Thành phần hiển thị biểu đồ bánh
  },
  {
    path: '/print-ticket-confirm',
    name: 'print-ticket-confirm',
    component: ConfirmPrintTicketView,
  },
  {
    path: '/qr',
    name: 'qr',
    component: QRScannerView,
  }

];

// Tạo và cấu hình router với lịch sử web HTML5
const router = createRouter({
  history: createWebHistory(),  // Lịch sử sử dụng HTML5 (không sử dụng hash trong URL)
  routes,  // Các route được khai báo ở trên
});

// Cấu hình middleware cho mỗi lần chuyển trang (beforeEach)
router.beforeEach((to, from, next) => {
  NProgress.start();  // Bắt đầu thanh tiến trình khi chuyển trang

  // Kiểm tra và lấy màu sắc đã lưu trong sessionStorage
  const savedColor = sessionStorage.getItem('firstColor');
  if (savedColor) {
    // Nếu có màu sắc đã lưu, áp dụng màu vào biến CSS --first-color
    document.documentElement.style.setProperty('--first-color', savedColor);
  }

  // Kiểm tra xem route yêu cầu xác thực hay không
  const requiresAuth = to.meta.requiresAuth;

  // Nếu route yêu cầu xác thực nhưng người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (requiresAuth && !isLoggedIn()) {
    next({ path: "/dang-nhap" });
  } else {
    next();  // Nếu không yêu cầu xác thực, tiếp tục điều hướng
  }
});

// Sau khi chuyển trang xong, kết thúc thanh tiến trình
router.afterEach(() => {
  NProgress.done();
});

export default router;
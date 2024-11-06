import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "./modules/home";
import authRoutes from "./modules/login";
import bookingRoutes from "./modules/booking";
import movieRoutes from "./modules/movie";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isLoggedIn, getUserInfo } from "@/api/authService"; // Nhập các hàm từ authService
import notFoundComponent from '@/components/notFoundComponent/index.vue';

const routes = [
  {
    path: "/",
    redirect: "/trang-chu",
  },
  ...authRoutes,
  ...homeRoutes,
  ...bookingRoutes,
  ...movieRoutes,
  { path: '/:pathMatch(.*)*', component: notFoundComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();

  const savedColor = sessionStorage.getItem('firstColor');
  if (savedColor) {
    document.documentElement.style.setProperty('--first-color', savedColor);
  }

  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !isLoggedIn()) {
    next({ path: "/dang-nhap" });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

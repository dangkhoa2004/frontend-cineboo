import { RouteRecordRaw } from "vue-router";

const homeChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "trang-chu-home",
    component: () => import('@/views/booking/index.vue'),
  },
  // Liên quan hoá đơn
  {
    path: "hoa-don",
    name: "hoa-don",
    components: {
      listComponent: () => import("@/components/list-invoice/index.vue"),
    },
  },
  {
    path: "thay-doi-thong-tin-hoa-don/:id",
    name: "thay-doi-thong-tin-hoa-don",
    components: {
      listComponent: () => import("@/components/list-invoice/detail.vue"),
    },
  },
  // Liên quan đến phim
  {
    path: "phims",
    name: "bang-phim",
    components: {
      listComponent: () => import("@/components/list-movie/index.vue"),
    },
  },
  {
    path: "thay-doi-thong-tin-phim/:id",
    name: "thay-doi-thong-tin-phim",
    components: {
      listComponent: () => import("@/components/list-movie/detail.vue"),
    },
  },
  {
    path: "them-moi-phim",
    name: "them-moi-phim",
    components: {
      listComponent: () => import("@/components/list-movie/new.vue"),
    },
  },
  // Liên quan đến voucher
  {
    path: "vouchers",
    name: "vouchers",
    components: {
      listComponent: () => import("@/components/list-voucher/index.vue"),
    },
  },
  {
    path: "voucher/:id",
    name: "thay-doi-thong-tin-voucher",
    components: {
      listComponent: () => import("@/components/list-voucher/detail.vue"),
    },
  },
  // Liên quan phương thức thanh toán
  {
    path: "phuong-thuc-thanh-toan",
    name: "pttts",
    components: {
      listComponent: () => import("@/components/list-pttt/index.vue"),
    },
  },
  {
    path: "phuong-thuc-thanh-toan/:id",
    name: "thay-doi-thong-tin-pttt",
    components: {
      listComponent: () => import("@/components/list-pttt/detail.vue"),
    },
  },
  // Liên quan đến khách hàng
  {
    path: "thong-tin-khach-hang",
    name: "thong-tin-khach-hang",
    components: {
      listComponent: () => import("@/components/list-customer/index.vue"),
    },
  },
  {
    path: "thong-tin-khach-hang/:id",
    name: "thay-doi-thong-tin-khach-hang",
    components: {
      listComponent: () => import("@/components/list-customer/detail.vue"),
    },
  },
  // Liên quan đến nhân viên
  {
    path: "thong-tin-nhan-vien",
    name: "thong-tin-nhan-vien",
    components: {
      listComponent: () => import("@/components/list-employee/index.vue"),
    },
  },
  {
    path: "thong-tin-nhan-vien/:id",
    name: "thay-doi-thong-tin-nhan-vien",
    components: {
      listComponent: () => import("@/components/list-employee/detail.vue"),
    },
  },
  // Liên quan đến tài khoản cá nhân và cài đặt ứng dụng
  {
    path: "thong-tin",
    name: "thong-tin",
    components: {
      listComponent: () => import("@/components/list-infomation/index.vue"),
    },
  },
  {
    path: "ung-dung",
    name: "ung-dung",
    components: {
      listComponent: () => import("@/components/list-application/index.vue"),
    },
  },
];

export default homeChildrenRoutes;
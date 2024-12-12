import { RouteRecordRaw } from "vue-router";

// Sử dụng đường dẫn tĩnh cho các components
const homeChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "trang-chu-home",
    component: () => import('@/views/booking/index.vue')  // Đảm bảo dùng đường dẫn tĩnh
  },

  // Các route liên quan đến hóa đơn
  {
    path: "hoa-don",
    name: "hoa-don",
    components: {
      listComponent: () => import('@/components/list-invoice/index.vue')
    }
  },
  {
    path: "thay-doi-thong-tin-hoa-don/:id",
    name: "thay-doi-thong-tin-hoa-don",
    components: {
      listComponent: () => import('@/components/list-invoice/detail.vue')
    }
  },

  // Các route liên quan đến phim
  {
    path: "phims",
    name: "bang-phim",
    components: {
      listComponent: () => import('@/components/list-movie/index.vue')
    }
  },
  {
    path: "thay-doi-thong-tin-phim/:id",
    name: "thay-doi-thong-tin-phim",
    components: {
      listComponent: () => import('@/components/list-movie/detail.vue')
    }
  },
  {
    path: "them-moi-phim",
    name: "them-moi-phim",
    components: {
      listComponent: () => import('@/components/list-movie/new.vue')
    }
  },
  {
    path: "them-lich-chieu-phim",
    name: "them-lich-chieu-phim",
    components: {
      listComponent: () => import('@/components/list-movie/movieSchedual.vue')
    }
  },
  {
    path: "quan-ly-lich-chieu",
    name: "quan-ly-lich-chieu",
    components: {
      listComponent: () => import('@/components/list-movie/listSchedual.vue')
    }
  },

  // Các route liên quan đến voucher
  {
    path: "vouchers",
    name: "vouchers",
    components: {
      listComponent: () => import('@/components/list-voucher/index.vue')
    }
  },
  {
    path: "voucher/:id",
    name: "thay-doi-thong-tin-voucher",
    components: {
      listComponent: () => import('@/components/list-voucher/detail.vue')
    }
  },

  // Các route liên quan đến khách hàng
  {
    path: "thong-tin-khach-hang",
    name: "thong-tin-khach-hang",
    components: {
      listComponent: () => import('@/components/list-user/index.vue')
    }
  },
  {
    path: "thong-tin-khach-hang/:id",
    name: "thay-doi-thong-tin-khach-hang",
    components: {
      listComponent: () => import('@/components/list-user/detail.vue')
    }
  },

  // Các route liên quan đến nhân viên
  {
    path: "thong-tin-nhan-vien",
    name: "thong-tin-nhan-vien",
    components: {
      listComponent: () => import('@/components/list-user/index.vue')
    }
  },
  {
    path: "thong-tin-nhan-vien/:id",
    name: "thay-doi-thong-tin-nhan-vien",
    components: {
      listComponent: () => import('@/components/list-user/detail.vue')
    }
  },

  // Các route liên quan đến tài khoản cá nhân và cài đặt ứng dụng
  {
    path: "thong-tin",
    name: "thong-tin",
    components: {
      listComponent: () => import('@/components/list-infomation/index.vue')
    }
  },
  {
    path: "ung-dung",
    name: "ung-dung",
    components: {
      listComponent: () => import('@/components/list-application/index.vue')
    }
  },

  // Các route liên quan đến hỗ trợ và liên hệ
  {
    path: "ho-tro",
    name: "ho-tro",
    components: {
      listComponent: () => import('@/components/list-contact/index.vue')
    }
  }
];

export default homeChildrenRoutes;

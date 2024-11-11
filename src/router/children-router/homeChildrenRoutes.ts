import { RouteRecordRaw } from "vue-router";

const homeChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "trang-chu-home",
    component: () => import('@/views/booking/index.vue'),
  },
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
  {
    path: "bang-phim",
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
    path: "tin-nhan",
    name: "tin-nhan",
    components: {
      listComponent: () => import("@/components/list-chat/index.vue"),
    },
  },
  {
    path: "thong-bao",
    name: "thong-bao",
    components: {
      listComponent: () => import("@/components/list-nofication/index.vue"),
    },
  },
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
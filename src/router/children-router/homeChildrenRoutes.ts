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
      listSchedule: () => import("@/components/list-invoice/index.vue"),
    },
  },
  {
    path: "bang-phim",
    name: "bang-phim",
    components: {
      listSchedule: () => import("@/components/list-movie/index.vue"),
    },
  },
  {
    path: "tin-nhan",
    name: "tin-nhan",
    components: {
      listSchedule: () => import("@/components/list-chat/index.vue"),
    },
  },
  {
    path: "thong-bao",
    name: "thong-bao",
    components: {
      listSchedule: () => import("@/components/list-nofication/index.vue"),
    },
  },
  {
    path: "thong-tin",
    name: "thong-tin",
    components: {
      listSchedule: () => import("@/components/list-infomation/index.vue"),
    },
  },
  {
    path: "ung-dung",
    name: "ung-dung",
    components: {
      listSchedule: () => import("@/components/list-application/index.vue"),
    },
  },
];

export default homeChildrenRoutes;
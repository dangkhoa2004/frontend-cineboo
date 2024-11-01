import { RouteRecordRaw } from "vue-router";

const bookingChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "danh-sach-phim",
    component: () => import('@/views/movie/index.vue'),
  },
  {
    path: "test",
    name: "test-danh-sach-phim",
    // component: () => import('@/test.vue'),
  },
  {
    path: ":id",
    name: "chi-tiet-phim",
    component: () => import("@/views/movie/component/chooseMovieData_component.vue"),
  }
];

export default bookingChildrenRoutes;
import { RouteRecordRaw } from "vue-router";

const bookingChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "danh-sach-phim",
    component: () => import('@/views/movie/index.vue'),
  },
  {
    path: ":id",
    name: "chi-tiet-phim",
    component: () => import("@/views/movie/component/chooseMovieData_component.vue"),
    children: [
      {
        path: "suat-chieu/:idSuatChieu",
        name: "suat-chieu",
        component: () => import("@/views/movie/component/chooseSeatData_component.vue"),
      }
    ]
  }
];

export default bookingChildrenRoutes;
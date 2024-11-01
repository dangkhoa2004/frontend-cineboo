import { RouteRecordRaw } from "vue-router";

const bookingChildrenRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "booking-home",
    component: () => import('@/views/booking/index.vue'),
  }
];

export default bookingChildrenRoutes;
import { RouteRecordRaw } from "vue-router";
import bookingChildrenRoutes from "../children-router/bookingChildrenRoutes";

const bookingRoutes: RouteRecordRaw[] = [
  {
    path: "/trang-chu",
    name: "booking",
    meta: {
      title: 'Booking',
    },
    children: bookingChildrenRoutes,
  },
];

export default bookingRoutes;
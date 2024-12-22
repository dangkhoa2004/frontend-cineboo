import { RouteRecordRaw } from "vue-router";
import bookingChildrenRoutes from "../children-router/bookingChildrenRoutes";
import lstExplorer from "@/views/list-explorer/index.vue";
import lstService from "@/views/list-service/index.vue";

const bookingRoutes: RouteRecordRaw[] = [
  {
    path: "/trang-chu",
    name: "booking",
    meta: {
      title: 'Booking',
    },
    children: bookingChildrenRoutes,
  },
  {
    path: "/kham-pha",
    name: "kham-pha",
    component: (lstExplorer)
  },
  {
    path: "/ho-tro",
    name: "/ho-tro",
    component: (lstService)
  },
];

export default bookingRoutes;
import { RouteRecordRaw } from "vue-router";
import movieChildrenRoutes from "../children-router/movieChildrenRoutes";

const movieRoutes: RouteRecordRaw[] = [
  {
    path: "/phim",
    name: "phim",
    meta: {
      title: 'Booking',
    },
    children: movieChildrenRoutes,
  },
];

export default movieRoutes;

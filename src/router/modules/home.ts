import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import homeChildrenRoutes from "../children-router/homeChildrenRoutes";

const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/quan-ly",
    name: "quan-ly",
    component: Layout,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      roles: ['admin'],
    },
    children: homeChildrenRoutes,
  },
];

export default homeRoutes;

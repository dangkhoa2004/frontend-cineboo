/* login.ts */
import { RouteRecordRaw } from "vue-router";
import { logout} from "@/api/authService";

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/dang-nhap',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    }
];

export default authRoutes;

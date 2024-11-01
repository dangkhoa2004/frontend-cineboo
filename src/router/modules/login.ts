/* login.ts */
import { RouteRecordRaw } from "vue-router";
import { authService , logout} from "@/api/authService";

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/dang-nhap',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/dang-xuat',
        name: 'Logout',
        beforeEnter: (to, _from, next) => {
            logout();
            next('/dang-nhap');
        },
        redirect: '/dang-nhap'
    },
];

export default authRoutes;

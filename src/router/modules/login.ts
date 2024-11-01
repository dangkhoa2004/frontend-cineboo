/* login.ts*/
import { RouteRecordRaw } from "vue-router";
import { authService } from "@/api/authService.ts";

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
            authService.logout();
            next('/dang-nhap');
        },
    },
];

export default authRoutes;

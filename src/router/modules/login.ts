/* login.ts */
import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/dang-nhap',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/quen-mat-khau',
        name: 'quen-mat-khau',
        component: () => import('@/components/reset-password/index.vue'),
    },
];

export default authRoutes;
<template>
<div class="all-settings">
    <div class="setting-for">
        <h3>{{ $t('message.appsetting') }}:</h3>
        <listSetting />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.statussetting') }}:</h3>
        <CssManager />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.statussetting') }}:</h3>
        <listPopup />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.performance') }}:</h3>
        <listPerformance />
    </div>
    <div class="setting-for" v-if="permissions['quanly']">
        <qrSystem />
    </div>
    <div class="setting-for" v-if="permissions['quanly']">
        <hotMovie />
    </div>
</div>
</template>

<script>
import CssManager from '../list-element/index.vue';
import listPopup from '../list-popup/index.vue';
import listPerformance from '../list-perfomance/index.vue';
import listSetting from '../list-settings/index.vue';
import qrSystem from '../qr-system/index.vue';
import hotMovie from '../hot-movie/index.vue';
import { getUserData, canAccessModule } from "@/api/authService";
import Swal from 'sweetalert2';

export default {
    name: "ChatApp",
    data() {
        return {
            permissions: {},
        }
    },
    async mounted() {
        try {
            // Lấy dữ liệu người dùng từ API
            const userData = await getUserData();
            this.user = userData;

            // Phân loại tài khoản: Nhân viên hoặc Khách hàng
            const accountType = userData.phanLoaiTaiKhoan?.id; // 1: Nhân viên, 2: Khách hàng

            if (accountType === 1 && userData.nhanVien) {
                // Người dùng là nhân viên
                this.fullname = `${userData.nhanVien.ho || ''} ${userData.nhanVien.tenDem || ''} ${userData.nhanVien.ten || ''}`.trim();
                this.userPosition = userData.nhanVien.chucVu?.tenChucVu || 'Chức vụ không xác định';
                this.userRole = userData.phanLoaiTaiKhoan.tenLoaiTaiKhoan;
            } else if (accountType === 2 && userData.khachHang) {
                // Người dùng là khách hàng
                this.fullname = `${userData.khachHang.ho || ''} ${userData.khachHang.tenDem || ''} ${userData.khachHang.ten || ''}`.trim();
                this.userPosition = userData.khachHang.phanLoaiKhachHang?.tenPhanLoaiKhachHang || 'Loại khách hàng không xác định';
                this.userRole = userData.phanLoaiTaiKhoan.tenLoaiTaiKhoan;
            } else {
                this.fullname = "Người dùng không xác định";
                this.userPosition = null;
                this.userRole = null;
            }
            // Kiểm tra quyền truy cập cho các module
            const userPermissions = await this.checkPermissions();
            this.permissions = userPermissions;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể lấy dữ liệu người dùng',
            });
        }
    },
    methods: {
        async checkPermissions() {
      const permissions = {};
      const modules = ["quanly"];
      for (let module of modules) {
        permissions[module] = await canAccessModule(module);
      }
      return permissions;
    },
    },
    components: {
        listPopup, listSetting, CssManager, listPerformance, qrSystem, hotMovie
    }
};
</script>

<style src="./assets/styles.css"></style>
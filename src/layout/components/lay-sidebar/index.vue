<template>
<nav class="sidebar" id="sidebar">
  <div class="sidebar__container">
    <div class="sidebar__user">
      <div class="sidebar__img">
        <img src="@/assets/img/avt.jpg" alt="User Avatar" />
      </div>

      <div class="sidebar__info">
        <h3 v-if="fullname">{{ fullname }}</h3>
        <span v-if="user?.email">{{ user.email }}</span>
        <div>
          <span v-if="userRole">Vai trò: {{ userRole }}</span>
        </div>
        <div>
          <span v-if="userPosition">Chức vụ: {{ userPosition }}</span>
        </div>
      </div>
    </div>

    <div class="sidebar__content">
      <div>
        <h3 class="sidebar__title">{{ $t("message.home") }}</h3>
        <div class="sidebar__list">
          <router-link v-if="permissions['phims']" to="/quan-ly/phims" class="sidebar__link" active-class="active-link">
            <i class="ri-film-fill"></i>
            <span>{{ $t("message.movie_man") }}</span>
          </router-link>
          <router-link v-if="permissions['hoaDon']" to="/quan-ly/hoa-don" class="sidebar__link"
            active-class="active-link">
            <i class="ri-table-line"></i>
            <span>{{ $t("message.invoice_man") }}</span>
          </router-link>
          <router-link v-if="permissions['vouchers']" to="/quan-ly/vouchers" class="sidebar__link"
            active-class="active-link">
            <i class="ri-ticket-fill"></i>
            <span>{{ $t("message.voucher_man") }}</span>
          </router-link>
        </div>
      </div>

      <div>
        <h3 class="sidebar__title">{{ $t("message.contact_man") }}</h3>
        <div class="sidebar__list">
          <router-link v-if="permissions['hoTro']" to="/quan-ly/ho-tro" class="sidebar__link"
            active-class="active-link">
            <i class="ri-chat-3-fill"></i>
            <span>{{ $t("message.contact_man") }}</span>
          </router-link>
          <router-link v-if="permissions['thongTinNguoiDung']" to="/quan-ly/thong-tin-nguoi-dung" class="sidebar__link"
            active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.customer_man") }}</span>
          </router-link>
          <router-link v-if="permissions['baoCaoThongKe']" to="/quan-ly/bao-cao-thong-ke" class="sidebar__link"
            active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.report_man") }}</span>
          </router-link>
        </div>
      </div>

      <div>
        <h3 class="sidebar__title">{{ $t("message.setting") }}</h3>
        <div class="sidebar__list">
          <router-link to="/quan-ly/thong-tin" class="sidebar__link" active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.profile") }}</span>
          </router-link>
          <router-link to="/quan-ly/ung-dung" class="sidebar__link" active-class="active-link">
            <i class="ri-apps-2-fill"></i>
            <span>{{ $t("message.application") }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="sidebar__actions">
      <button class="sidebar__link" @click.prevent="logout">
        <i class="ri-door-open-fill" style="margin-left: 100px;"></i>
        <span>{{ $t("message.signout") }}</span>
      </button>
    </div>
  </div>
</nav>
</template>


<script>
import { logout as authLogout, getUserData, canAccessModule } from "@/api/authService";

export default {
  data() {
    return {
      user: null,
      fullname: null,
      userRole: null,
      userPosition: null,
      permissions: {}, // Lưu quyền truy cập cho từng module
    };
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
      console.error("Không thể lấy dữ liệu người dùng:", error);
    }
  },
  methods: {
    logout() {
      authLogout();
      window.location.href = '/dang-nhap';
      this.user = null;
      this.fullname = null;
    },
    async checkPermissions() {
      const permissions = {};
      const modules = ["hoaDon", "phims", "vouchers", "hoTro", "thongTinNguoiDung", "baoCaoThongKe"];
      for (let module of modules) {
        permissions[module] = await canAccessModule(module);
      }
      return permissions;
    },
  },
};
</script>
<style scoped>
button {
  all: unset;
}
</style>
<style src="./assets/styles.css"></style>
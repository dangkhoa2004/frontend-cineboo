<template>
<div>
  <div class="tabs">
    <button @click="activeTab = 'refunds'">Quản lý yêu cầu</button>
    <button @click="activeTab = 'ageGroups'" v-if="permissions['dotuoi']">Quản lý độ tuổi</button>
    <button @click="activeTab = 'paymentMethods'" v-if="permissions['pttt']">Quản lý phương thức thanh toán</button>
  </div>

  <div v-if="activeTab === 'refunds'" class="refund-manager">
    <table>
      <thead>
        <tr>
          <th>Mã Hoàn Vé</th>
          <th>Khách Hàng</th>
          <th>Voucher</th>
          <th>Phim</th>
          <th>Ngày Hoàn Vé</th>
          <th>Lý Do Hoàn Vé</th>
          <th>Trạng Thái</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="refund in refunds" :key="refund.id">
          <td>{{ refund.maHoanVe }}</td>
          <td>{{ `${refund.hoaDon.khachHang.ho} ${refund.hoaDon.khachHang.tenDem} ${refund.hoaDon.khachHang.ten}` }}
          </td>
          <td>{{ refund.voucher ? refund.voucher.maVoucher : 'Không có' }}</td>
          <td>{{ refund.hoaDon.chiTietHoaDonList[0]?.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</td>
          <td>{{ formatDate(refund.thoiGianHoanVe) }}</td>
          <td>{{ refund.lyDoHoanVe }}</td>
          <td>{{ refund.trangThaiHoanVe === 0 ? "Chờ xử lý" : "Đã xử lý" }}</td>
          <td>
            <button @click="viewRefundDetails(refund)">Xem</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeTab === 'ageGroups'" class="age-group-manager">
    <table>
      <thead>
        <tr>
          <th>Mã Độ Tuổi</th>
          <th>Tên Độ Tuổi</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ageGroup in ageGroups" :key="ageGroup.id">
          <td>{{ ageGroup.maDoTuoi }}</td>
          <td>{{ ageGroup.tenDoTuoi }}</td>
          <td>
            <button @click="editAgeGroup(ageGroup)">Sửa</button>
            <button @click="deleteAgeGroup(ageGroup.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeTab === 'paymentMethods'" class="payment-method-manager">
    <table>
      <thead>
        <tr>
          <th>Mã PTTT</th>
          <th>Tên PTTT</th>
          <th>Trạng Thái</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
          <td>{{ paymentMethod.maPTTT }}</td>
          <td>{{ paymentMethod.tenPTTT }}</td>
          <td>{{ paymentMethod.trangThaiPTTT === 0 ? "Không hoạt động" : "Hoạt động" }}</td>
          <td>
            <button @click="editPaymentMethod(paymentMethod)">Sửa</button>
            <button @click="deletePaymentMethod(paymentMethod.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import { fetchAgeGroups, deleteAgeGroupById } from "@/api/movie";
import { fetchPaymentMethods, deletePaymentMethodById, fetchRefunds } from "@/api/invoice";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      permissions: {},
      activeTab: 'refunds', // Default tab
      refunds: [], // Refund data
      ageGroups: [], // Age group data
      paymentMethods: [] // Payment method data
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
    await this.loadRefunds();
    await this.loadAgeGroups();
    await this.loadPaymentMethods();
  },
  methods: {
    async checkPermissions() {
      const permissions = {};
      const modules = ["hoaDon", "phims", "vouchers", "hoTro", "thongTinNguoiDung", "baoCaoThongKe", "dotuoi", "pttt"];
      for (let module of modules) {
        permissions[module] = await canAccessModule(module);
      }
      return permissions;
    },
    async loadRefunds() {
      try {
        const refundData = await fetchRefunds();
        this.refunds = refundData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu yêu cầu hoàn vé:", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không tìm thấy yêu cầu hoàn vé.',
        });
      }
    },
    async loadAgeGroups() {
      try {
        const ageGroupData = await fetchAgeGroups();
        this.ageGroups = ageGroupData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu độ tuổi:", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không tìm thấy danh sách độ tuổi.',
        });
      }
    },
    async loadPaymentMethods() {
      try {
        const paymentMethodData = await fetchPaymentMethods();
        this.paymentMethods = paymentMethodData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phương thức thanh toán:", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không tìm thấy danh sách PTTT.',
        });
      }
    },
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
    },
    viewRefundDetails(refund) {
      this.$router.push({ name: 'thay-doi-thong-tin-hoan-ve', params: { id: refund.id } });
    },
    editAgeGroup(ageGroup) {
      this.$router.push({ name: 'thay-doi-thong-tin-do-tuoi', params: { id: ageGroup.id } });
    },
    async deleteAgeGroup(id) {
      const result = await Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có chắc chắn muốn xoá độ tuổi này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Hủy',
      });

      if (result.isConfirmed) {
        try {
          await deleteAgeGroupById(id);
          this.ageGroups = this.ageGroups.filter(ageGroup => ageGroup.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xoá độ tuổi thành công.',
          });
        } catch (error) {
          console.error("Lỗi khi xoá độ tuổi:", error);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Xảy ra lỗi khi xoá độ tuổi.',
          });
        }
      }
    },
    editPaymentMethod(paymentMethod) {
      this.$router.push({ name: 'thay-doi-thong-tin-pttt', params: { id: paymentMethod.id } });
    },
    async deletePaymentMethod(id) {
      const result = await Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có chắc chắn muốn xoá phương thức thanh toán này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Hủy',
      });

      if (result.isConfirmed) {
        try {
          await deletePaymentMethodById(id);
          this.paymentMethods = this.paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Phương thức thanh toán đã được xoá thành công.',
          });
        } catch (error) {
          console.error("Lỗi khi xoá phương thức thanh toán:", error);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Xảy ra lỗi khi xoá phương thức thanh toán.',
          });
        }
      }
    }
  }
};
</script>
<style src="./assets/styles.css" scoped></style>

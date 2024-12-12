<template>
<div>
  <div class="tabs">
    <button @click="activeTab = 'refunds'">Quản lý yêu cầu</button>
    <button @click="activeTab = 'ageGroups'">Quản lý độ tuổi</button>
    <button @click="activeTab = 'paymentMethods'">Quản lý phương thức thanh toán</button>
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

export default {
  data() {
    return {
      activeTab: 'refunds', // Default tab
      refunds: [], // Refund data
      ageGroups: [], // Age group data
      paymentMethods: [] // Payment method data
    };
  },
  async mounted() {
    await this.loadRefunds();
    await this.loadAgeGroups();
    await this.loadPaymentMethods();
  },
  methods: {
    async loadRefunds() {
      try {
        const refundData = await fetchRefunds();
        this.refunds = refundData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu yêu cầu hoàn vé:", error);
      }
    },
    async loadAgeGroups() {
      try {
        const ageGroupData = await fetchAgeGroups();
        this.ageGroups = ageGroupData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu độ tuổi:", error);
      }
    },
    async loadPaymentMethods() {
      try {
        const paymentMethodData = await fetchPaymentMethods();
        this.paymentMethods = paymentMethodData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phương thức thanh toán:", error);
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
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá độ tuổi này?");
      if (confirmDelete) {
        try {
          await deleteAgeGroupById(id);
          this.ageGroups = this.ageGroups.filter(ageGroup => ageGroup.id !== id);
          alert("Độ tuổi đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá độ tuổi:", error);
          alert("Có lỗi xảy ra khi xoá độ tuổi.");
        }
      }
    },
    editPaymentMethod(paymentMethod) {
      this.$router.push({ name: 'thay-doi-thong-tin-pttt', params: { id: paymentMethod.id } });
    },
    async deletePaymentMethod(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá phương thức thanh toán này?");
      if (confirmDelete) {
        try {
          await deletePaymentMethodById(id);
          this.paymentMethods = this.paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
          alert("Phương thức thanh toán đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá phương thức thanh toán:", error);
          alert("Có lỗi xảy ra khi xoá phương thức thanh toán.");
        }
      }
    }
  }
};
</script>

<style src="./assets/styles.css" scoped></style>

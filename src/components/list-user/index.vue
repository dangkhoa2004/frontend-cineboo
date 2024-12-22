<template>
<div class="tabs">
  <button @click="activeTab = 'customers'">Quản lý khách hàng</button>
  <button @click="activeTab = 'employees'">Quản lý nhân viên</button>
</div>

<!-- Bộ lọc cho Khách hàng -->
<div v-if="activeTab === 'customers'" class="filter-container">
  <select v-model="genderFilter" @change="logFilters" class="filter-select">
    <option value="">Tất cả giới tính</option>
    <option value="1">Nam</option>
    <option value="0">Nữ</option>
    <option value="Khác">Khác</option>
  </select>
  <select v-model="customerTypeFilter" @change="logFilters" class="filter-select">
    <option value="">Tất cả hạng khách hàng</option>
    <option v-for="(type, index) in uniqueCustomerTypes" :key="index" :value="type">{{ type }}</option>
  </select>
  <select v-model="customerStatusFilter" @change="logFilters" class="filter-select">
    <option value="">Tất cả trạng thái</option>
    <option value="1">Hoạt động</option>
    <option value="0">Vô hiệu hóa</option>
  </select>
  <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="search-input" />
</div>
<!-- Bộ lọc cho Nhân viên -->
<div v-if="activeTab === 'employees'" class="filter-container">
  <select v-model="employeeStatusFilter" @change="logFilters" class="filter-select">
    <option value="">Tất cả trạng thái</option>
    <option value="1">Hoạt động</option>
    <option value="0">Vô hiệu hóa</option>
  </select>
  <select v-model="positionFilter" @change="logFilters" class="filter-select">
    <option value="">Tất cả chức vụ</option>
    <option v-for="(position, index) in uniquePositions" :key="index" :value="position">{{ position }}</option>
  </select>
  <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="search-input" />
</div>

<!-- Danh sách Khách hàng -->
<div v-if="activeTab === 'customers'" class="customer-manager">
  <table>
    <thead>
      <tr>
        <th>Tên Khách Hàng</th>
        <th>Ngày Sinh</th>
        <th>Giới tính</th>
        <th>Số Điện Thoại</th>
        <th>Email</th>
        <th>Hạng Khách Hàng</th>
        <th>Trạng Thái Khách Hàng</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in filteredCustomers" :key="customer.id">
        <td>{{ customer.ho }} {{ customer.tenDem }} {{ customer.ten }}</td>
        <td>{{ formatDate(customer.ngaySinh) }}</td>
        <td>{{ customer.gioiTinh == 1 ? 'Nam' : 'Nữ' }}</td>
        <td>{{ customer.soDienThoai }}</td>
        <td>{{ customer.taiKhoan.email }}</td>
        <td>{{ customer.phanLoaiKhachHang.tenPhanLoaiKhachHang }}</td>
        <td>
          <span :class="getStatusClass(customer.trangThaiKhachHang)">
            {{ getStatusText(customer.trangThaiKhachHang) }}
          </span>
        </td>
        <td>
          <button @click="editCustomer(customer)">Sửa</button>
          <button @click="deleteCustomer(customer.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Danh sách Nhân viên -->
<div v-if="activeTab === 'employees'" class="employee-manager">
  <table>
    <thead>
      <tr>
        <th>Mã Nhân Viên</th>
        <th>Tên Nhân Viên</th>
        <th>Ngày Sinh</th>
        <th>Giới Tính</th>
        <th>Email</th>
        <th>Chức Vụ</th>
        <th>Trạng Thái Nhân Viên</th>
        <th>Thao Tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in filteredEmployees" :key="employee.id">
        <td>{{ employee.maNhanVien }}</td>
        <td>{{ employee.ho }} {{ employee.tenDem }} {{ employee.ten }}</td>
        <td>{{ formatDate(employee.ngaySinh) }}</td>
        <td>{{ employee.gioiTinh == 1 ? 'Nam' : 'Nữ' }}</td>
        <td>{{ employee.taiKhoan.email }}</td>
        <td>{{ employee.chucVu.tenChucVu }}</td>
        <td>
          <span :class="getStatusClass(employee.trangThai)">
            {{ getStatusText(employee.trangThai) }}
          </span>
        </td>
        <td>
          <button @click="editEmployee(employee)">Sửa</button>
          <button @click="deleteEmployee(employee.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchkhachhangs, deletekhachhangById } from "@/api/customer";
import { fetchnhanviens, deletenhanvienById } from "@/api/employee";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      activeTab: 'customers',
      customers: [],
      employees: [],
      searchQuery: '',
      genderFilter: '',
      customerTypeFilter: '',
      customerStatusFilter: '',
      employeeStatusFilter: '',
      positionFilter: '',
    };
  },
  computed: {
    statusOptions() {
      // Các tùy chọn trạng thái
      return {
        0: "Vô hiệu hoá",
        1: "Hoạt động",
        3: "Lỗi",
        4: "Xảy ra lỗi",
      };
    },
    // Danh sách các loại khách hàng duy nhất
    uniqueCustomerTypes() {
      const types = new Set();
      this.customers.forEach(customer => {
        if (customer.phanLoaiKhachHang) {
          types.add(customer.phanLoaiKhachHang.tenPhanLoaiKhachHang);
        }
      });
      return Array.from(types);
    },

    // Lọc khách hàng
    filteredCustomers() {
      const query = this.searchQuery.toLowerCase();
      return this.customers.filter(customer => {
        const fullName = `${customer.ho} ${customer.tenDem} ${customer.ten}`.toLowerCase();
        return (
          (fullName.includes(query) || customer.taiKhoan.email.toLowerCase().includes(query) || customer.soDienThoai.includes(query) || customer.id.toString().includes(query)) &&
          (this.genderFilter === '' || customer.gioiTinh.toString() === this.genderFilter) &&
          (this.customerTypeFilter === '' || customer.phanLoaiKhachHang.tenPhanLoaiKhachHang === this.customerTypeFilter) &&
          (this.customerStatusFilter === '' || customer.trangThaiKhachHang.toString() === this.customerStatusFilter)
        );
      });
    },

    // Lọc nhân viên
    filteredEmployees() {
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter(employee => {
        const fullName = `${employee.ho} ${employee.tenDem} ${employee.ten}`.toLowerCase();
        return (
          (fullName.includes(query) || employee.maNhanVien.toLowerCase().includes(query) || employee.taiKhoan.email.toLowerCase().includes(query)) &&
          (this.employeeStatusFilter === '' || employee.trangThai.toString() === this.employeeStatusFilter) &&
          (this.positionFilter === '' || employee.chucVu.tenChucVu === this.positionFilter)
        );
      });
    },
    // Danh sách các chức vụ nhân viên duy nhất
    uniquePositions() {
      const positions = new Set();
      this.employees.forEach(employee => {
        if (employee.chucVu) {
          positions.add(employee.chucVu.tenChucVu);
        }
      });
      return Array.from(positions);
    },
  },
  async mounted() {
    await this.loadCustomers();
    await this.loadNhanViens();
  },
  methods: {
    async loadCustomers() {
      try {
        const customerData = await fetchkhachhangs();
        this.customers = customerData;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi khi tải dữ liệu khách hàng",
          text: "Vui lòng thử lại sau",
        });
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
      }
    },
    async loadNhanViens() {
      try {
        const employeeData = await fetchnhanviens();
        this.employees = employeeData;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi khi tải dữ liệu nhân viên",
          text: "Vui lòng thử lại sau",
        });
        console.error("Lỗi khi tải dữ liệu nhân viên:", error);
      }
    },
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
    },
    editCustomer(customer) {
      this.$router.push({ name: 'thay-doi-thong-tin-khach-hang', params: { id: customer.id } });
    },
    async deleteCustomer(id) {
      Swal.fire({
        title: "Xác nhận xoá khách hàng",
        text: "Bạn có chắc chắn muốn xoá khách hàng này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xoá",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deletekhachhangById(id);
            Swal.fire({
              icon: "success",
              title: "Xoá khách hàng thành công",
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Lỗi khi xoá khách hàng",
              text: "Vui lòng thử lại sau",
            });
            console.error("Lỗi khi xoá khách hàng:", error);
          }
        }
      });
    },
    editEmployee(employee) {
      this.$router.push({ name: 'thay-doi-thong-tin-nhan-vien', params: { id: employee.id } });
    },
    async deleteEmployee(id) {
      Swal.fire({
        title: "Xác nhận xoá nhân viên",
        text: "Bạn có chắc chắn muốn xoá nhân viên này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xoá",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deletenhanvienById(id);
            Swal.fire({
              icon: "success",
              title: "Xoá nhân viên thành công",
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Lỗi khi xoá nhân viên",
              text: "Vui lòng thử lại sau",
            });
            console.error("Lỗi khi xoá nhân viên:", error);
          }
        }
      });
    }, getStatusClass(status) {
      switch (status) {
        case 0: return 'sap-chieu';
        case 1: return 'da-chieu';
        case 3: return 'dang-chieu';
        case 4: return 'loi';
        default: return '';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 0: return 'Vô hiệu hoá';
        case 1: return 'Đang hoạt động';
        case 3: return 'Lỗi';
        case 4: return 'Xảy ra lỗi';
        default: return '';
      }
    }
  },
};
</script>
<style src="./assets/styles.css" scoped></style>
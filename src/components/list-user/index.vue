<template>
<div>
  <div class="tabs">
    <button @click="activeTab = 'customers'">Quản lý khách hàng</button>
    <button @click="activeTab = 'employees'">Quản lý nhân viên</button>
  </div>

  <div class="search-container">
    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="search-input" />
  </div>

  <div v-if="activeTab === 'customers'" class="customer-manager">
    <table>
      <thead>
        <tr>
          <th>ID Khách Hàng</th>
          <th>Tên Khách Hàng</th>
          <th>Ngày Sinh</th>
          <th>Số Điện Thoại</th>
          <th>Email</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.ho }} {{ customer.tenDem }} {{ customer.ten }}</td>
          <td>{{ formatDate(customer.ngaySinh) }}</td>
          <td>{{ customer.soDienThoai }}</td>
          <td>{{ customer.taiKhoan.email }}</td>
          <td>
            <button @click="editCustomer(customer)">Sửa</button>
            <button @click="deleteCustomer(customer.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeTab === 'employees'" class="employee-manager">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mã Nhân Viên</th>
          <th>Tên</th>
          <th>Tên Đệm</th>
          <th>Họ</th>
          <th>Ngày Sinh</th>
          <th>Giới Tính</th>
          <th>Email</th>
          <th>Dân Tộc</th>
          <th>Địa Chỉ</th>
          <th>Trạng Thái Nhân Viên</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.maNhanVien }}</td>
          <td>{{ employee.ten }}</td>
          <td>{{ employee.tenDem }}</td>
          <td>{{ employee.ho }}</td>
          <td>{{ formatDate(employee.ngaySinh) }}</td>
          <td>{{ employee.gioiTinh }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.danToc }}</td>
          <td>{{ employee.diaChi }}</td>
          <td>{{ employee.trangThaiNhanVien }}</td>
          <td>
            <button @click="editEmployee(employee)">Sửa</button>
            <button @click="deleteEmployee(employee.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { fetchkhachhangs, deletekhachhangById } from "@/api/customer";
import { fetchnhanviens, deletenhanvienById } from "@/api/employee";

export default {
  data() {
    return {
      activeTab: 'customers',
      customers: [],
      employees: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredCustomers() {
      const query = this.searchQuery.toLowerCase();
      return this.customers.filter(customer =>
      (`${customer.ho} ${customer.tenDem} ${customer.ten}`.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.soDienThoai.includes(query) ||
        customer.id.toString().includes(query))
      );
    },
    filteredEmployees() {
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter(employee =>
      (`${employee.ho} ${employee.tenDem} ${employee.ten}`.toLowerCase().includes(query) ||
        employee.maNhanVien.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query))
      );
    }
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
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
      }
    },
    async loadNhanViens() {
      try {
        const employeeData = await fetchnhanviens();
        this.employees = employeeData;
      } catch (error) {
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
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá khách hàng này?");
      if (confirmDelete) {
        try {
          await deletekhachhangById(id);
          this.customers = this.customers.filter(customer => customer.id !== id);
          alert("Khách hàng đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá khách hàng:", error);
          alert("Có lỗi xảy ra khi xoá khách hàng.");
        }
      }
    },
    editEmployee(employee) {
      this.$router.push({ name: 'thay-doi-thong-tin-nhan-vien', params: { id: employee.id } });
    },
    async deleteEmployee(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá nhân viên này?");
      if (confirmDelete) {
        try {
          await deletenhanvienById(id);
          this.employees = this.employees.filter(employee => employee.id !== id);
          alert("Nhân viên đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá nhân viên:", error);
          alert("Có lỗi xảy ra khi xoá nhân viên.");
        }
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  margin-bottom: 15px;
}

.search-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.search-input {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}
</style>

<style src="./assets/styles.css" scoped></style>

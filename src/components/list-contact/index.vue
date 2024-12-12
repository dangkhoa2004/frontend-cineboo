<template>
<div>
  <div class="tabs">
    <button @click="activeTab = 'customers'">Quản lý khách hàng</button>
    <button @click="activeTab = 'employees'">Quản lý nhân viên</button>
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
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.ho }} {{ customer.ten }} {{ customer.tenDem }}</td>
          <td>{{ formatDate(customer.ngaySinh) }}</td>
          <td>{{ customer.soDienThoai }}</td>
          <td>{{ customer.email }}</td>
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
          <th>Ảnh</th>
          <th>ID Nhân Viên</th>
          <th>Tên Nhân Viên</th>
          <th>Ngày Sinh</th>
          <th>Chức Vụ</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>
            <img :src="employee.anhNhanVien" alt="Avatar" class="employee-avatar" />
          </td>
          <td>{{ employee.maNhanVien }}</td>
          <td>{{ employee.ho }} {{ employee.tenDem }} {{ employee.ten }}</td>
          <td>{{ formatDate(employee.ngaySinh) }}</td>
          <td>{{ employee.chucVu.tenChucVu }}</td>
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
      employees: []
    };
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

<style src="./assets/styles.css" scoped></style>

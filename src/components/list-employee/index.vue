<template>
  <div class="employee-manager">
    <table border="1">
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
</template>

<script>
import { fetchnhanviens, deletenhanvienById } from "@/api/employee";  // Adjust import here

export default {
  data() {
    return {
      employees: [],
    };
  },
  async mounted() {
    await this.loadNhanViens();
  },
  methods: {
    async loadNhanViens() {
      try {
        const employeeData = await fetchnhanviens();  // Fetch employees
        this.employees = employeeData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu nhân viên:", error);
      }
    },
    formatDate(timestamp) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(timestamp).toLocaleDateString("vi-VN", options);
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
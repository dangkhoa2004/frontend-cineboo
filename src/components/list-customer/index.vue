<template>
<div class="customer-manager">
  <table border="1">
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
</template>

<script>
import { fetchkhachhangs, deletekhachhangById } from "@/api/customer";  // Corrected import

export default {
  data() {
    return {
      customers: [],
    };
  },
  async mounted() {
    await this.loadCustomers();
  },
  methods: {
    async loadCustomers() {
      try {
        const customerData = await fetchkhachhangs(); // Fetch customer data
        this.customers = customerData;
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
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
          await deletekhachhangById(id);  // Correct API call to delete customer
          this.customers = this.customers.filter(customer => customer.id !== id);
          alert("Khách hàng đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá khách hàng:", error);
          alert("Có lỗi xảy ra khi xoá khách hàng.");
        }
      }
    },
  },
};
</script>

<style src="../assets/styles.css" scoped></style>

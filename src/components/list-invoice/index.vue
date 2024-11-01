<template>
<div class="invoice-container">
  <table>
    <thead>
      <tr>
        <th>Mã hóa đơn</th>
        <th>Ngày lập</th>
        <th>Tổng tiền</th>
        <th>Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.id }}</td>
        <td>{{ invoice.date }}</td>
        <td>{{ invoice.total }}</td>
        <td>{{ invoice.status }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { fetchInvoices } from "@/api/invoice.ts";

export default {
  data() {
    return {
      invoices: [],
    };
  },
  async mounted() {
    try {
      const invoiceData = await fetchInvoices();
      this.invoices = invoiceData;
    } catch (error) {
      console.error("Api: [Lỗi khi tải dữ liệu hóa đơn]", error);
    }
  },
};
</script>

<style scoped>
.invoice-container {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.5);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>

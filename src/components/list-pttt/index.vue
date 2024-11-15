<template>
  <div class="voucher-manager">
    <table border="1">
      <thead>
        <tr>
          <th>Mã phương thức thanh toán</th>
          <th>Tên phương thức thanh toán</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pttt in pttts" :key="pttt.id">
          <td>{{ pttt.maPTTT }}</td>
          <td>{{ pttt.tenPTTT }}</td>
          <td>
            <span>{{ pttt.trangThaiPTTT === 1 ? "Đang áp dụng" : "Không áp dụng" }}</span>
          </td>
          <td>
            <button @click="viewPTTTDetails(pttt)">Xem chi tiết</button>
            <button @click="deletePTTT(pttt.id)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchpttts } from "@/api/pttt";  // Import fetchpttts from the appropriate path

export default {
  data() {
    return {
      pttts: [],  // Dữ liệu phương thức thanh toán sẽ được lưu ở đây
    };
  },
  async mounted() {
    await this.loadPTTTs();
  },
  methods: {
    async loadPTTTs() {
      try {
        const params = {
          id: 0,  // Ví dụ, nếu muốn lấy tất cả, có thể truyền id = 0
          maPTTT: "",  // Nếu muốn lọc theo mã phương thức thanh toán
          tenPTTT: "",  // Nếu muốn lọc theo tên phương thức thanh toán
          trangThaiPTTT: 0,  // Trạng thái lọc, có thể là 0 hoặc 1
        };
        const ptttData = await fetchpttts(params);  // Fetch dữ liệu phương thức thanh toán
        this.pttts = ptttData;  // Lưu dữ liệu vào pttts
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phương thức thanh toán:", error);
      }
    },
    viewPTTTDetails(pttt) {
      this.$router.push({ name: 'thay-doi-thong-tin-pttt', params: { id: pttt.id } });
    },
    async deletePTTT(id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá phương thức thanh toán này?");
      if (confirmDelete) {
        try {
          // Giả sử có hàm xoá phương thức thanh toán từ API
          await deletePTTTById(id);
          this.pttts = this.pttts.filter(pttt => pttt.id !== id);
          alert("Phương thức thanh toán đã được xoá thành công.");
        } catch (error) {
          console.error("Lỗi khi xoá phương thức thanh toán:", error);
          alert("Có lỗi xảy ra khi xoá phương thức thanh toán.");
        }
      }
    },
  },
};
</script>

<style src="../assets/styles.css" scoped></style>

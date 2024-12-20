<template>
  <div class="xac-nhan-in">
    <div class="card">
      <h2>🎟️ In Vé Xem Phim</h2>
      <h1>{{ tieuDe }}</h1>
      <div v-if="thongTinVe && thongTinVe.trangThaiHoaDon === 3" class="ve-da-in">
        <h2><strong>Ghi chú:</strong> Vé đã được in trước đó!</h2>
      </div>
  
      <!-- Chi tiết vé -->
      <div v-if="thongTinVe && thongTinVe.trangThaiHoaDon !== 3" class="chi-tiet-ve">
        <div class="ve-xem-phim">
          <div class="ve-header">
            <h3>Rạp Chiếu Phim</h3>
          </div>
          <div class="ve-body">
            <p><strong>Mã hóa đơn:</strong> {{ thongTinVe.maHoaDon }}</p>
            <p><strong>Khách hàng:</strong> {{ thongTinVe.khachHang.ho }} {{ thongTinVe.khachHang.tenDem }} {{ thongTinVe.khachHang.ten }}</p>
            <p><strong>Tổng tiền:</strong> {{ thongTinVe.tongSoTien.toLocaleString() }} VND</p>
            <p><strong>Thời gian thanh toán:</strong> {{ dinhDangNgay(thongTinVe.thoiGianThanhToan) }}</p>
          </div>
          <div class="ve-footer">
            <h4>Danh sách vé</h4>
            <ul>
              <li v-for="(ve, index) in thongTinVe.chiTietHoaDonList" :key="index" class="ve-item">
                <p><strong>Ghế:</strong> {{ ve.id_GheAndSuatChieu.id_Ghe.maGhe }}</p>
                <p><strong>Phim:</strong> {{ ve.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}</p>
                <p><strong>Suất chiếu:</strong> {{ dinhDangNgay(ve.id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu) }}</p>
                <p><strong>Giá:</strong> {{ ve.id_GheAndSuatChieu.id_Ghe.giaTien.toLocaleString() }} VND</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div v-else class="thong-bao-loi">
        <p>Không tìm thấy hóa đơn. Vui lòng quét mã lại.</p>
      </div>
  
      <div class="hanh-dong">
        <button class="xac-nhan-btn" @click="xacNhanIn()" :disabled="!thongTinVe">
          ✅ Xác nhận
        </button>
        <button class="huy-bo-btn" @click="huyBo()">❌ Quay lại</button>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import swal from 'sweetalert';
  import { fetchInvoiceByMaHoaDon, requestInvoicePrint } from '@/api/invoice.ts';
  
  const thongTinVe = ref(null);
  const tieuDe = ref('');
  const router = useRouter();
  const route = useRoute();
  
  const xacNhanIn = async () => {
    if (!thongTinVe.value) return;
  
    if (thongTinVe.value.trangThaiHoaDon === 3) {
      swal({
        title: 'Thông báo',
        text: 'Vé đã được in trước đó!',
        icon: 'info',
      });
      return;
    }
  
    const isConfirm = await swal({
      title: 'Xác nhận in vé',
      text: 'Bạn có chắc chắn muốn in vé?',
      icon: 'warning',
      buttons: ['Không, huỷ in vé!', 'Có, tiếp tục!'],
    });
  
    if (isConfirm) {
      try {
        await requestInvoicePrint(thongTinVe.value.maHoaDon);
        swal({ title: 'Thành công!', text: 'Vé đã được in.', icon: 'success' });
        router.push('/quan-ly/ung-dung');
      } catch (error) {
        console.error('Lỗi khi in vé:', error);
        swal('Lỗi!', 'Không thể in vé. Vui lòng thử lại sau.', 'error');
      }
    } else {
      swal('Đã huỷ in vé :)', { icon: 'error' });
    }
  };
  
  const huyBo = () => {
    router.push('/quan-ly/ung-dung');
  };
  
  const timHoaDon = async (maHoaDon) => {
    try {
      const data = await fetchInvoiceByMaHoaDon(maHoaDon);
      thongTinVe.value = data;
      tieuDe.value = thongTinVe.value.trangThaiHoaDon !== 3 ? 'Thông tin chi tiết vé:' : '';
    } catch (error) {
      thongTinVe.value = null;
      tieuDe.value = error.response?.status === 404
        ? 'Không tìm thấy vé, vui lòng quét lại.'
        : 'Đã xảy ra lỗi, vui lòng thử lại.';
    }
  };
  
  const dinhDangNgay = (mangNgay) => {
    const [nam, thang, ngay, gio, phut] = mangNgay;
    return `${ngay}/${thang}/${nam} ${gio}:${phut}`;
  };
  
  onMounted(() => {
    const maHoaDonParam = route.query.MaHoaDon;
    if (!maHoaDonParam) {
      router.push('/quan-ly/ung-dung');
      return;
    }
    timHoaDon(maHoaDonParam);
  });
  </script>
  
  <style scoped>
  .card {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .ve-xem-phim {
    background: #fafafa;
    border: 1px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    position: relative;
  }
  
  .ve-header {
    background: #ff5733;
    color: #fff;
    padding: 10px 0;
    border-radius: 8px 8px 0 0;
  }
  
  .ve-body {
    text-align: left;
    padding: 10px;
  }
  
  .ve-footer {
    margin-top: 10px;
  }
  
  .ve-footer ul {
    list-style: none;
    padding: 0;
  }
  
  .ve-item {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .thong-bao-loi {
    color: #ff4d4d;
    background: #fff0f0;
    border: 1px solid #ffa3a3;
    padding: 15px;
    border-radius: 10px;
  }
  
  .hanh-dong {
    margin-top: 20px;
  }
  
  .xac-nhan-btn,
  .huy-bo-btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .xac-nhan-btn {
    background: #28a745;
    color: #ffffff;
  }
  
  .huy-bo-btn {
    background: #dc3545;
    color: #ffffff;
    margin-left: 10px;
  }
  
  .xac-nhan-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  </style>
  
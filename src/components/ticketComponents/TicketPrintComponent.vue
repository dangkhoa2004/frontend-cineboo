<template>
  <div class="confirm-print">
    <div class="card">
      <h2>🎟️ In Vé Xem Phim</h2>
      <h1>{{ title }}</h1>
      <div v-if="ticketInfo && ticketInfo.trangThaiHoaDon == 3" class="ticket-printed-message">
        <h2><strong>Note:</strong> Vé đã in rồi!</h2>
      </div>

      <!-- Ticket Details -->
      <div v-if="ticketInfo && ticketInfo.trangThaiHoaDon!=3" class="ticket-details">
        <h3>Invoice: {{ ticketInfo.maHoaDon }}</h3>
        <p>
          <strong>Customer:</strong> {{ ticketInfo.khachHang.ten }} {{ ticketInfo.khachHang.ho }}
        </p>
        <p><strong>Total Price:</strong> {{ ticketInfo.tongSoTien.toLocaleString() }} VND</p>
        <p><strong>Payment Time:</strong> {{ formatDate(ticketInfo.thoiGianThanhToan) }}</p>

        <div class="tickets">
          <h4>Tickets</h4>
          <ul>
            <li
              v-for="(ticket, index) in ticketInfo.chiTietHoaDonList"
              :key="index"
              class="ticket-item"
            >
              <p><strong>Seat:</strong> {{ ticket.id_GheAndSuatChieu.id_Ghe.maGhe }}</p>
              <p>
                <strong>Movie:</strong> {{ ticket.id_GheAndSuatChieu.id_SuatChieu.phim.tenPhim }}
              </p>
              <p>
                <strong>Showtime:</strong>
                {{ formatDate(ticket.id_GheAndSuatChieu.id_SuatChieu.thoiGianChieu) }}
              </p>
              <p>
                <strong>Price:</strong>
                {{ ticket.id_GheAndSuatChieu.id_Ghe.giaTien.toLocaleString() }} VND
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="error-message">
        <p>No invoice found. Please scan again.</p>
      </div>

      <div class="actions">
        <button class="confirm-btn" @click="confirmPrint()" :disabled="!ticketInfo">
          ✅ Confirm
        </button>
        <button class="cancel-btn" @click="cancel()">❌ Go Back</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import swal from 'sweetalert'

const ticketInfo = ref(null)
const title = ref('')
const MaHoaDon = ref('')
const router = useRouter()
const route = useRoute()

const confirmPrint = () => {
  if (ticketInfo.value == null) {
    return
  }

  // Check if the ticket is already printed
  if (ticketInfo.value.trangThaiHoaDon == 3) {
    swal({
      title: 'Thông báo',
      text: 'Vé đã in rồi!',
      icon: 'info',
      buttons: ['OK'],
    })
    return
  }

  swal({
    title: 'Xác nhận in vé',
    text: 'Bạn có chắc chắn muốn in vé?',
    icon: 'warning',
    buttons: ['Không, huỷ in vé!', 'Có, tiếp tục!'],
  }).then(async (isConfirm) => {
    if (isConfirm) {
      try {
        swal({
          title: 'In vé phim!',
          text: 'Bạn đã xác nhận in vé.',
          icon: 'success',
        }).then(async () => {
          const response = await axios.put(
            `http://localhost:8080/hoadon/print/thermal/bytes/${ticketInfo.value.maHoaDon}`
          )
          console.log('In vé thành công:', response.data)

          // Optional: you can navigate back after printing
          router.push({ name: 'qr' })
        })
      } catch (error) {
        console.error('Lỗi khi in vé:', error)
        swal('Lỗi!', 'Không thể in vé. Vui lòng thử lại sau.', 'error')
      }
    } else {
      swal('Đã huỷ in vé :)', { icon: 'error' })
    }
  })
}

const cancel = () => {
  router.push({ name: 'qr' })
}

const findInvoice = async (maHoaDon) => {
  try {
    const response = await axios.get(`http://localhost:8080/hoadon/find/MaHoaDon/${maHoaDon}`)
    if (response.status === 200 && response.data) {
      ticketInfo.value = response.data
      if(ticketInfo.value.trangThaiHoaDon!=3){
      title.value = 'Thông tin chi tiết vé:';
      }
    }
  
    else {
      title.value = 'No ticket found, please scan again.'
      ticketInfo.value = null
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      title.value = 'No ticket found, please scan again.'
    } else {
      title.value = 'An error occurred, please try again.'
    }
    ticketInfo.value = null
  }
}

const formatDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray
  return `${day}/${month}/${year} ${hour}:${minute}`
}

onMounted(() => {
  const maHoaDonFromParam = route.query.MaHoaDon
  if (!maHoaDonFromParam) {
    router.push({ name: 'qr' })
    return
  }
  MaHoaDon.value = maHoaDonFromParam
  findInvoice(MaHoaDon.value)
})
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

.ticket-details {
  margin-top: 20px;
  background: #f4f4f4;
  padding: 15px;
  border-radius: 10px;
  text-align: left;
}

.tickets ul {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

.ticket-item {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error-message {
  color: #ff4d4d;
  background: #fff0f0;
  border: 1px solid #ffa3a3;
  padding: 15px;
  border-radius: 10px;
}

.actions {
  margin-top: 20px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn {
  background: #28a745;
  color: #ffffff;
}

.cancel-btn {
  background: #dc3545;
  color: #ffffff;
  margin-left: 10px;
}

.confirm-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>

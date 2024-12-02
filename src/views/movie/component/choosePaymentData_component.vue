<template>
<div id="thong-tin">
  <section class="movie_checkout_content">
    <div class="movie_checkout_details shadow">
      <div class="movie_checkout_details__item">
        <div class="movie_checkout_item__image">
          <img class="movie_checkout_iphone" :src="movieDetails.anhPhim" alt="" />
        </div>
        <div class="movie_checkout_item__details">
          <div class="movie_checkout_item__title">
            <h1>{{ movieDetails.tenPhim }}</h1>
          </div>
          <div class="ticket">
            <div class="movie-info">
              <p><strong>CineBoo Hải Phòng</strong> - RẠP 6</p>
              <p>Suất: <strong>10:45</strong> - Thứ Sáu, 16/10/2024</p>
            </div>
            <hr class="dotted-line" />
            <div class="seat-info">
              <p>
                {{ ticketCount }}x Ghế
                <span class="price">{{ ticketPrice }} ₫</span>
              </p>
              <p>Ghế: {{ getSelectedSeats }}</p>
            </div>
            <hr class="dotted-line" />
            <div class="total-info">
              <p>
                <strong>Tổng cộng</strong><span class="total-price">{{ totalAmount }} ₫</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component hiển thị thông tin khách hàng -->
    <infoCustomerData_component 
	v-model="customerInfo" 
	 @update-payment-method="updatePaymentMethod"
	/> <!-- Truyền và nhận thông tin người dùng -->

    <div class="movie_checkout_container">
      <div class="movie_checkout_actions">
        <a href="#" class="btn draw-border" @click.prevent="handlePayment">TIẾP TỤC THANH TOÁN</a>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import infoCustomerData_component from "./infoCustomerData_component.vue";
import EventBus from "@/store/eventBus.ts"; // Nếu cần dùng EventBus để lưu trữ thông tin
import { createInvoice, createInvoiceQr,setPaymentMethod } from "@/api/invoice"; // Giả sử bạn đã có hàm tạo hóa đơn từ API
import { format } from 'date-fns'; // Định dạng ngày giờ
import { getUserInfo } from "@/api/authService"; // Import hàm lấy thông tin người dùng

export default {
  components: { infoCustomerData_component },
  data() {
    return {
      customerInfo: {}, // Thông tin khách hàng
      ticketPrice: 0, // Giá vé
      selectedSeats: [], // Ghế đã chọn
      movieDetails: {}, // Thông tin phim
      userInfo: {}, // Thông tin người dùng
      idPhongChieu: null,
	  paymentMethod:1,//I really hate optionsAPI. For now, only paymentMethod 1
    };
  },
  computed: {
    getSelectedSeats() {
      return Array.isArray(EventBus.selectedSeats)
        ? EventBus.selectedSeats.join(", ")
        : "";
    },
    totalAmount() {
      return EventBus.totalAmount;
    },
    ticketCount() {
      return EventBus.ticketCount;
    },
  },
  created() {
    const user = getUserInfo();
    console.log('User info:', user);
    if (user) {
      this.userInfo = { ...user };
    } else {
      console.log("Không có thông tin người dùng.");
    }
    this.loadMovieData();
    this.loadSeats();
  },
  methods: {
    // Nạp dữ liệu phim
    async loadMovieData() {
      const movieId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:8080/phim/find/${movieId}`);
        const movieData = await response.json();
        this.movieDetails = movieData;
      } catch (error) {
        console.error("Lỗi khi nạp dữ liệu phim:", error);
      }
    },
	//Grab paymentMethodID from child component infoCustomerData_component
  updatePaymentMethod(newPaymentMethodId) {
      this.paymentMethod = newPaymentMethodId;
	  console.log("NEW PAYMENT ID IS:" +newPaymentMethodId);
    },
	
    // Nạp dữ liệu ghế và giá vé
  async loadSeats() {
  const showtimeId = this.$route.params.idSuatChieu;
  let token = sessionStorage.getItem('token'); //PLS PORT THIS TO A HELPER METHOD LATER
token = token.substring(1,token.length-1);//PLS PORT THIS TO A HELPER METHOD LATER
 
  try {
    const response = await fetch(`http://localhost:8080/ghe/find/ID_SuatChieu/${showtimeId}`, {
      method: 'GET',
      headers: {
        'Authorization': token, //  the JWT to the Authorization header
        'Content-Type': 'application/json',
      },
    });

    const seatsData = await response.json();
    
    if (seatsData.length > 0) {
      this.ticketPrice = seatsData[0].giaTien;
      // Save the `id_PhongChieu` from the returned data
      this.idPhongChieu = seatsData[0].phongChieu.id;
    }
  } catch (error) {
    console.error("Lỗi khi nạp dữ liệu ghế:", error);
  }
}
,
    // Xử lý thanh toán
    // Đánh dấu hàm này là async để có thể sử dụng await
    async handlePayment() {
      const selectedSeatsIndex = EventBus.selectedSeats;

      if (!selectedSeatsIndex || selectedSeatsIndex.length === 0) {
        console.error("Chưa chọn ghế nào");
        alert("Vui lòng chọn ghế trước khi thanh toán.");
        return;
      }

      const userConfirmed = confirm("Bạn có chắc chắn muốn tiếp tục thanh toán?");
      if (!userConfirmed) {
        // Người dùng chọn "Cancel"
        return;
      }

      const customerInfo = this.userInfo;
      const customerID = customerInfo.maKhachHang || customerInfo.id || customerInfo.maNhanVien;
      if (!customerID) {
        console.error("Không xác định được ID khách hàng.");
        alert("Vui lòng đăng nhập để mua vé.");
        window.location.href = "/dang-nhap"; // Chuyển hướng về trang đăng nhập
        return;
      }

      const movieInfo = this.movieDetails;
      if (!movieInfo || !movieInfo.id) {
        console.error("Không có thông tin phim");
        return;
      }

      const currentTime = new Date();
      const formattedTime = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");

      const invoiceData = {
        khachHangId: customerID,
        suatChieuId: this.$route.params.idSuatChieu,//Yêu cầu ID_SuatChieu vào đây, tạm thời lấy từ routeParam
        chiTietHoaDonList: selectedSeatsIndex.map(index => ({
          maGhe: `${index}`
        }))
      };

      try { 
        // Tạo hóa đơn rỗng
        let invoice = await createInvoice(invoiceData);
		 
		//Đặt PTTT
		invoice = await setPaymentMethod(invoice.id,this.paymentMethod);
		
        // Lấy id từ kết quả trả về của createInvoice

        const idHoaDon = invoice.id;
        if (!idHoaDon) {
          console.error("Không tìm thấy ID hóa đơn.");
          return;
        }
        try {
           const qrData = await createInvoiceQr(idHoaDon);

          console.log("Dữ liệu QR trả về:", idHoaDon, qrData);
          if (qrData && qrData.payment) {
            window.location.href = qrData.payment; // Chuyển hướng sang trang thanh toán
          } else {
            console.error("Không tìm thấy URL thanh toán trong kết quả trả về.");
          }
        } catch (error) {
          console.error("Lỗi khi tạo QR thanh toán:", error);
        }
        // try {
        //   const qrData = await createInvoiceQr(idHoaDon);
        //   console.log("Dữ liệu QR trả về:", idHoaDon, qrData);
        //   if (qrData && qrData.payment) {
        //     window.open(qrData.payment, '_blank');
        //   } else {
        //     console.error("Không tìm thấy URL thanh toán trong kết quả trả về.");
        //   }
        // } catch (error) {
        //   console.error("Lỗi khi tạo QR thanh toán:", error);
        // }
      } catch (error) {
        console.error("Lỗi khi tạo hóa đơn hoặc QR thanh toán:", error);
      }
    }
  }
};
</script>
<!-- choosePaymentData_component.vue -->
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
            <div class="seat-info" v-for="(item, index) in getSelectedSeats">
              <p class="selected-seat-names">
                {{ item }}
              </p>
              <p><span class="price">{{ ticketPrice[index] }} ₫</span></p>

            </div>
            <hr class="dotted-line" />
            <div class="total-info">
              <p>
                <strong>Tổng cộng</strong><span class="total-price">{{ totalAmount }} ₫</span>
              </p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component hiển thị thông tin khách hàng -->
    <infoCustomerData_component v-model="customerInfo" @update-payment-method="updatePaymentMethod" />
    <!-- Truyền và nhận thông tin người dùng -->

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
import { createInvoice, createInvoiceQr, setPaymentMethod } from "@/api/invoice"; // Giả sử bạn đã có hàm tạo hóa đơn từ API
import { getUserInfo } from "@/api/authService"; // Import hàm lấy thông tin người dùng
import swal from 'sweetalert';
export default {
  components: { infoCustomerData_component },
  data() {
    return {
      customerInfo: {}, // Thông tin khách hàng
      ticketPrice: [], // Giá vé
      selectedSeats: [], // Ghế đã chọn
      movieDetails: {}, // Thông tin phim
      userInfo: {}, // Thông tin người dùng
      idPhongChieu: [],
      showtime: {},
      paymentMethod: 3,//default
    };
  },
  computed: {
    getSelectedSeats() {
      return EventBus.selectedSeats
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
    if (user) {
      this.userInfo = { ...user };
    } else {
      window.alert("Vui lòng đăng nhập để sử dụng chức năng này")
      window.location.href = '/dang-nhap';
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
    },

    // Nạp dữ liệu ghế và giá vé
    async loadSeats() {
      const showtimeId = this.$route.params.idSuatChieu;
      let token = sessionStorage.getItem('token'); //PLS PORT THIS TO A HELPER METHOD LATER
      token = token.substring(1, token.length - 1);//PLS PORT THIS TO A HELPER METHOD LATER

      try {
        const response = await fetch(`http://localhost:8080/ghe/findWithBooking/${showtimeId}`, {
          method: 'GET',
          headers: {
            'Authorization': token, //  the JWT to the Authorization header
            'Content-Type': 'application/json',
          },
        });

        const seatsData = await response.json();

        if (seatsData.length > 0) {
          seatsData.forEach((element) => {
            this.ticketPrice.push(element.giaTien);
            this.idPhongChieu.push(element.id_PhongChieu);
          });
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
        swal("Thiếu ghế rồi", "Vui lòng chọn ghế trước khi thanh toán.", "errors");
        return;
      }

      const customerInfo = this.userInfo;
      const customerID = customerInfo.khachHang.id;
      if (!customerID) {
        console.error("Không xác định được ID khách hàng.");
        swal("Oops", "Vui lòng đăng nhập để mua vé.", "error");
        window.location.href = "/dang-nhap"; // Chuyển hướng về trang đăng nhập
        return;
      }

      const movieInfo = this.movieDetails;
      if (!movieInfo || !movieInfo.id) {
        console.error("Không có thông tin phim");
        return;
      }

      const invoiceData = {
        khachHangId: customerID,
        suatChieuId: Number(this.$route.params.idSuatChieu),//Yêu cầu ID_SuatChieu vào đây, tạm thời lấy từ routeParam
        phongChieuId: this.idPhongChieu[0],
        chiTietHoaDonList: selectedSeatsIndex.map(index => ({
          maGhe: `${index}`
        }))
      };
      try {
        swal({
          title: "Xác nhận đặt vé",
          text: "Bạn có chắc chắn muốn đặt vé",
          icon: "warning",
          buttons: ['Không, huỷ đặt vé!', 'Có, tiếp tục!'],
        }).then(async (isConfirm) => {
          if (isConfirm) {
            swal({
              title: 'Xác nhận đặt vé!',
              text: 'Bạn đã xác nhận đặt vé',
              icon: 'success'
            }).then(async () => {

              let invoice = await createInvoice(invoiceData);
              invoice = await setPaymentMethod(invoice.id, this.paymentMethod);
              const idHoaDon = invoice.id;
              if (!idHoaDon) {
                console.error("Không tìm thấy ID hóa đơn.");
                return;
              }
              try {
                const qrData = await createInvoiceQr(idHoaDon);
                console.log("Dữ liệu QR trả về:", idHoaDon, qrData);
                if (qrData && qrData.payment) {
                  window.open(qrData.payment, '_blank');
                } else {
                  console.error("Không tìm thấy URL thanh toán trong kết quả trả về.");
                }
              } catch (error) {
                console.error("Lỗi khi tạo QR thanh toán:", error);
              }
            });
          } else {
            swal("Đã huỷ đặt vé :)", "error");
            return;
          }
        });



      } catch (error) {
        console.error("Lỗi khi tạo hóa đơn hoặc QR thanh toán:", error);
      }
    }
  }
};
</script>
<!-- choosePaymentData_component.vue -->
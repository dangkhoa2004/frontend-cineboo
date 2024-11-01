<template>
  <div id="thong-tin">
    <div class="schedule-container">
      <div class="schedule-header">
        <h2>THÔNG TIN</h2>
        <div class="date-selector"></div>
      </div>
      <section class="movie_checkout_content">
        <div class="movie_checkout_details shadow">
          <div class="movie_checkout_details__item">
            <div class="movie_checkout_item__image">
              <img class="movie_checkout_iphone" :src="movie.imageUrl" alt="" />
            </div>
            <div class="movie_checkout_item__details">
              <div class="movie_checkout_item__title">
                <h1>{{ movie.title }}</h1>
              </div>
              <div class="ticket">
                <div class="movie-info">
                  <p>
                    <strong>{{ theaterName }}</strong> - RẠP {{ room }}
                  </p>
                  <p>
                    Suất: <strong>{{ showtime }}</strong> - {{ showtimeDate }}
                  </p>
                </div>
                <hr class="dotted-line" />
                <div class="seat-info">
                  <p>
                    {{ ticketCount }}x Ghế<span class="price"
                      >{{ totalticketPrice }} ₫</span
                    >
                  </p>
                  <p>Ghế: {{ getSelectedSeats }}</p>
                </div>
                <hr class="dotted-line" />
                <div class="total-info">
                  <p>
                    <strong>Tổng cộng</strong
                    ><span class="total-price">{{ totalAmount }} ₫</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <infoCustomerData_component />
        <div class="movie_checkout_container">
          <div class="movie_checkout_actions">
            <a href="" class="btn nav_btn draw-border">TIẾP TỤC THANH TOÁN </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import infoCustomerData_component from "./infoCustomerData_component.vue";
import { onMounted, computed, watch } from "vue";
import EventBus from "@/store/eventBus.ts";
import { fetchShowtimesByMovieId } from "@/api/movie"; // Nhập hàm fetchShowtimesByMovieId từ API

export default {
  components: { infoCustomerData_component },
  data() {
    return {
      ticketCount: 0,
      movie: {
        title: "",
        imageUrl: "",
      },
      theaterName: "", // Thay thế bằng giá trị thực tế từ API
      room: "", // Thay thế bằng giá trị thực tế từ API
      showtime: "", // Thay thế bằng giá trị thực tế từ API
      showtimeDate: "", // Thay thế bằng giá trị thực tế từ API
    };
  },
  computed: {
    getSelectedSeats() {
      return Array.isArray(EventBus.selectedSeats)
        ? EventBus.selectedSeats.join(", ")
        : "";
    },
    totalAmount() {
      const ticketPrice = 160000;
      const ticketTotal = EventBus.ticketCount * ticketPrice;
      return ticketTotal;
    },
    totalticketPrice() {
      const ticketPrice = 160000;
      return this.ticketCount * ticketPrice;
    },
  },
  mounted() {
    const movieId = EventBus.selectedMovieId; // Giả sử bạn lưu ID phim trong EventBus

    // Gọi API để lấy thông tin lịch chiếu cho phim
    fetchShowtimesByMovieId(movieId)
      .then((showtimeData) => {
        this.movie.title = showtimeData.movieTitle; // Lưu tên phim từ API
        this.movie.imageUrl = showtimeData.imageUrl; // Lưu ảnh từ API
        this.theaterName = showtimeData.theaterName; // Lưu tên rạp từ API
        this.room = showtimeData.room; // Lưu phòng từ API
        this.showtime = showtimeData.showtime; // Lưu thời gian suất từ API
        this.showtimeDate = showtimeData.showtimeDate; // Lưu ngày suất từ API
      })
      .catch((error) => {
        console.error("Component: [Đã xảy ra sự cố khi tải thông tin phim]", error);
      });

    // Theo dõi ticketCount từ EventBus
    watch(
      () => EventBus.ticketCount,
      (newCount) => {
        this.ticketCount = newCount;
      }
    );
  },
};
</script>

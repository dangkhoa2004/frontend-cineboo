<template>
<div class="movie-manager">
  <div class="button-group">
    <button @click="goBack">Trở về</button>
  </div>

  <div class="form-group">
    <label for="movie-select">Lựa chọn phim</label>
    <select id="movie-select" v-model="selectedMovie">
      <option v-for="movie in movies" :key="movie.id" :value="movie.id">
        {{ movie.tenPhim }}
      </option>
    </select>
  </div>

  <div class="form-group">
    <label for="room-select">Lựa chọn phòng chiếu</label>
    <select id="room-select" v-model="selectedRoom">
      <option v-for="room in rooms" :key="room.id" :value="room.id">
        {{ room.maPhong }}
      </option>
    </select>
  </div>

  <!-- Chọn khoảng ngày -->
  <div class="form-group date-picker-group">
    <label>Chọn khoảng ngày</label>
    <div class="date-inputs">
      <div>
        <label for="start-date">Ngày bắt đầu</label>
        <input type="date" id="start-date" v-model="startDate" />
      </div>
      <div>
        <label for="end-date">Ngày kết thúc</label>
        <input type="date" id="end-date" v-model="endDate" />
      </div>
    </div>
  </div>

  <div class="form-group">
    <label>Lựa chọn giờ chiếu</label>
    <div class="checkbox-group">
      <div v-for="time in times" :key="time" class="checkbox-item">
        <input type="checkbox" :value="time" v-model="selectedTimes" :id="`time-${time}`" />
        <label :for="`time-${time}`">{{ time }}</label>
      </div>
    </div>
  </div>

  <button @click="createSchedule">Tạo lịch chiếu</button>
</div>
</template>

<script>
import { fetchMovies, fetchPhongChieu } from "@/api/movie";
import { requestWithJWT } from '@/api/api.ts';


export default {
  data() {
    return {
      rooms: [],
      movies: [],
      selectedMovie: null,
      selectedRoom: null,
      selectedTimes: [],
      startDate: null,
      endDate: null,
      times: ["08:00", "12:00", "16:00", "20:00"],
    };
  },
  async mounted() {
    await this.loadMovies();
    await this.loadRooms();
  },
  methods: {
    async loadMovies() {
      try {
        const movieData = await fetchMovies();
        this.movies = movieData;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải danh sách phim',
        });
      }
    },
    async loadRooms() {
      try {
        const roomData = await fetchPhongChieu();
        this.rooms = roomData;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải danh sách phòng chiếu',
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    validateMovieInfo() {
      if (!this.selectedMovie || !this.selectedRoom || !this.startDate || !this.endDate || this.selectedTimes.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Thông tin không đầy đủ',
          text: 'Vui lòng chọn đầy đủ thông tin!',
        });
        return false;
      }
      return true;
    },
    async createSchedule() {
      if (!this.validateMovieInfo()) {
        return;
      }

      // Tạo danh sách các lịch chiếu
      const thoiGianChieuList = [];
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Lặp qua các ngày và giờ chiếu
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        this.selectedTimes.forEach((time) => {
          const [hours, minutes] = time.split(":");
          const dateTime = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes));
          thoiGianChieuList.push(dateTime.toISOString());
        });
      }

      const payload = {
        thoiGianChieuList,
        id_Phim: this.selectedMovie,
        id_PhongChieu: this.selectedRoom,
      };

      try {
        await this.postSchedule(payload);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Lỗi khi tạo lịch chiếu. Vui lòng thử lại.',
        });
      }
    },

    async postSchedule(payload) {
      try {
        // Hiển thị thông báo cho người dùng khi đang tạo lịch chiếu
        Swal.fire({
          title: 'Đang tạo lịch chiếu...',
          text: 'Vui lòng đợi trong giây lát.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await requestWithJWT("post", 'http://localhost:8080/suatchieu/add/multiple', payload);

        if (response.status === 200 && response.data) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Lịch chiếu đã được tạo thành công!',
          });
          setTimeout(() => {
            window.location.reload();  // Refresh the page
          }, 2000);
        } else {
          throw new Error('Failed to create schedule');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi khi gửi dữ liệu, vui lòng thử lại sau!',
        });
      }
    },
    async postSchedule(payload) {
      // Hiển thị hộp thoại xác nhận trước khi gửi dữ liệu
      const result = await Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có chắc chắn muốn tạo lịch chiếu không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      });

      if (result.isConfirmed) {
        try {
          const response = await requestWithJWT("post", 'http://localhost:8080/suatchieu/add/multiple', payload);

          if (response.status === 200 && response.data) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Lịch chiếu đã được tạo thành công!',
            });
            setTimeout(() => {
              window.location.reload();  // Refresh the page
            }, 2000);
          } else {
            throw new Error('Failed to create schedule');
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Có lỗi khi gửi dữ liệu, vui lòng thử lại sau!',
          });
        }
      }
    }

  },
};
</script>
<style src="./assets/styles.css" scoped></style>
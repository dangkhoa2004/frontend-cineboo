<template>
  <div>
    <h1>Danh Sách Phim</h1>
    <div v-for="phim in phimList" :key="phim.id">
      <h2>{{ phim.tenPhim }}</h2>
      <img :src="phim.anhPhim" alt="ảnh phim" />
      <p>Diễn viên: {{ phim.dienVien }}</p>
      <p>Năm phát hành: {{ phim.nam }}</p>
      <p>Mô tả: {{ phim.noiDungMoTa }}</p>
      <p>Thời gian: {{ phim.thoiLuong }} phút</p>
      <p>Quốc gia: {{ phim.quocGia }}</p>
      <p>Giới hạn độ tuổi: {{ phim.gioiHanDoTuoi.tenDoTuoi }}</p>
      <p>Ngày ra mắt: {{ new Date(phim.ngayRaMat).toLocaleDateString() }}</p>
      <p>Trailer: <a :href="phim.trailer" target="_blank">Xem Trailer</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchMovies } from "@/api/movie";
import { Movie } from "@/type";

export default defineComponent({
  setup() {
    const phimList = ref<Movie[]>([]);
    
    const loadMovies = async () => {
      try {
        phimList.value = await fetchMovies();
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      phimList,
    };
  },
});
</script>

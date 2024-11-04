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
      <p>Thể loại:
        <span v-for="theLoai in phim.danhSachTLPhims" :key="theLoai.id">
          {{ theLoai.theLoaiPhim.tenTheLoai }}<span v-if="!isLastGenre(phim, theLoai)">, </span>
        </span>      </p>
    </div>
  </div>
</template>

<script setup lang="ts" >
import {  ref, onMounted } from "vue";
import { fetchMovies } from "./api/movie"
const phimList = ref<any[]>([]);
onMounted(async()=>{
  phimList.value= await fetchMovies();
})

    const isLastGenre = (phim: any, genre: any) => {
      return phim.danhSachTLPhims.indexOf(genre) === phim.danhSachTLPhims.length - 1;
    };

</script>

<template>
<div id="kham-pha"></div>
<section class="section explore_section hidden">
  <p class="title">KHÁM PHÁ</p>
  <h2 class="tagline">Nơi tốt nhất cho bạn có trải nghiệm điện ảnh!</h2>
  <div class="explore_wrapper">
    <div v-for="(movie, index) in randomMovieList" :key="index" class="explore_card">
      <div class="card_img">
        <img :src="movie.imageUrl" alt="" />
        <div class="card_title">{{ movie.title }}</div>
      </div>
    </div>
  </div>
</section>
</template>


<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';

const randomMovieList = ref([]);
const defaultMovies = [
  { title: "JOKER", imageUrl: "src/assets/img/joker.webp" },
  { title: "DOMINO", imageUrl: "src/assets/img/domino.webp" },
  { title: "KUMANTHONG", imageUrl: "src/assets/img/kumanthong.webp" },
];

const loadRandomMovies = async () => {
  try {
    const request = await axios.get("http://localhost:8080/phim/get");
    if (request.status === 200 && request.data) {
      const movieList = request.data;

      for (let i = 0; i < 3;) {
        const randomIndex = Math.floor(Math.random() * movieList.length);
        // Check if the index has already been used
        if (!randomMovieList.value.some(movie => movie.title === movieList[randomIndex].tenPhim)) {
          randomMovieList.value.push({
            title: movieList[randomIndex].tenPhim,
            imageUrl: movieList[randomIndex].anhPhim,
          });
          i++; // Increment only when a unique movie is added
        }
      }
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải danh sách phim ngẫu nhiên.',
    });
    randomMovieList.value = defaultMovies;
  }
};

onMounted(() => {
  loadRandomMovies();
});
</script>
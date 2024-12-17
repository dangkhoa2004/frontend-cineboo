<template>
  <div id="kham-pha"></div>
  <section class="section explore_section hidden">
    <p class="title">KHÁM PHÁ</p>
    <h2 class="tagline">Nơi tốt nhất cho bạn có trải nghiệm điện ảnh!</h2>
    <div class="explore_wrapper">
      <div
          v-for="(movie, index) in randomMovieList"
          :key="index"
          class="explore_card">
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

      for (let i = 0; i < 3; ) {
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

      console.log(randomMovieList.value);
    }
  } catch (error) {
    console.error("Error fetching random movies. Using default movies.");
    randomMovieList.value = defaultMovies;
    console.log(randomMovieList.value);
  }
};

onMounted(() => {
  loadRandomMovies();
});
</script>
<style>
.section {
  max-width: 1200px;
  margin: auto;
  padding: 3.5rem 1rem;
}

.explore_section :is(.title, .tagline) {
  text-align: center;
  margin-inline: auto;
}

.explore_section {
  display: none;
}

.explore_section.hidden {
  display: block; /* Ensures the section appears when not hidden */
}

.title {
  position: relative;
  margin-bottom: .5rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: #0c0a09;
}

.title::after {
  position: absolute;
  content: "";
  height: 2px;
  width: 4rem;
  background: var(--before-btn);
  top: 50%;
  transform: translate(1rem, -50%);
}

.tagline {
  max-width: 600px;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 3rem;
  color: #0c0a09;
}

.explore_wrapper {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.explore_card {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
}

.card_img {
  position: relative;
  isolation: isolate;
}

.card_img img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.card_title {
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding-left: 1rem;
  z-index: 1;
}

</style>
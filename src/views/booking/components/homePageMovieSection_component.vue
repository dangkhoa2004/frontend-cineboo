<template>
<div id="movies"></div>
<section class="section deal_section hidden">
  <p class="title">PHIM SẮP CHIẾU</p>
  <div class="deal_wrapper">
    <div v-for="(movie, index) in moviesList" :key="index" class="deal_card">
      <div class="card_img">
        <img :src="movie.imageUrl" alt="" />
        <div class="card_icons">
          <span @click="toggleHeart(index)">
            <i :class="['fas', 'fa-heart', { 'active': movie.liked }]" />
          </span>
          <span><i class="fas fa-bookmark"></i></span>
          <span @click="openSharePopup(movie.title)">
            <i class="fas fa-share-nodes"></i>
          </span>
        </div>
      </div>
      <div class="card_details">
        <h1>{{ movie.title }}</h1>
        <p>Thời Lượng: <span>{{ movie.duration }} phút</span></p>
        <p>Xếp Hạng: <span>{{ movie.rating }} </span></p>
        <p>Quốc Gia: <span>{{ movie.country }}</span></p>
      </div>
    </div>
  </div>
</section>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';
const moviesList = ref([]);
const defaultMovies = [
  {
    id: "-1",
    title: "Fubao: Bảo Bối Của Ông",
    imageUrl: "src/assets/img/fubao.webp",
    duration: "94 phút",
    rating: "7.8 (246 votes)",
    country: "Hàn Quốc"
  },
  {
    id: "-1",
    title: "Bocchi The Rock! Recap",
    imageUrl: "src/assets/img/bocchi.webp",
    duration: "94 phút",
    rating: "7.8 (246 votes)",
    country: "Mỹ"
  },
  {
    id: "-1",
    title: "Cô Dâu Hào Môn",
    imageUrl: "src/assets/img/codauhaomon.webp",
    duration: "94 phút",
    rating: "7.8 (246 votes)",
    country: "Việt Nam"
  },
];

const loadMovies = async () => {
  try {
    const response = await axios.get("http://localhost:8080/phim/get");
    if (response.status === 200 && response.data) {
      const movieData = response.data;
      const uniqueMovies = [];
      while (uniqueMovies.length < 3) {
        const randomIndex = Math.floor(Math.random() * movieData.length);
        const selectedMovie = movieData[randomIndex];
        if (!uniqueMovies.some(movie => movie.title === selectedMovie.tenPhim)) {
          uniqueMovies.push({
            id: selectedMovie.id,
            title: selectedMovie.tenPhim,
            imageUrl: selectedMovie.anhPhim,
            duration: selectedMovie.thoiLuong,
            rating: selectedMovie.diem,
            country: selectedMovie.quocGia,
          });
        }
      }
      moviesList.value = uniqueMovies;
    } else {
      moviesList.value = defaultMovies;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải danh sách phim.',
    });
    moviesList.value = defaultMovies;
  }
};

const toggleHeart = (index) => {
  moviesList.value[index].liked = !moviesList.value[index].liked;
};
onMounted(() => {
  loadMovies();
});
</script>


<style scoped>

.card_icons span:active {
  transform: scale(0.9);
}

.fas.fa-heart.active {
  color: pink;
}

.share-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup-content {
  text-align: center;
}

.popup-content button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: var(--first-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #0056b3;
}

.title {
  position: relative;
  margin-bottom: .5rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: #0c0a09
}

.deal_wrapper {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem
}

.deal_card {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1)
}

.card_img {
  position: relative;
  isolation: isolate
}

.card_img img {
  width: 750px;
}

.card_icons {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
}

.card_icons span {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2)
}

.card_details {
  color: var(--black);
  padding: 1rem
}

.card_details h4 {
  margin-bottom: .5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--black)
}

.card_details p {
  margin-bottom: .5rem
}

.card_details span {
  font-weight: 700
}

.card_details h5 {
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #78716c
}

.card_details h5 span {
  font-size: 1.1rem;
  color: #0c0a09
}
</style>

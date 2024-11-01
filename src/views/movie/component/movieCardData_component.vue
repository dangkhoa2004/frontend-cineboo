<template>
  <div class="movie-card">
    <a :href="`/phim/${movieId}`" style="color: black">
      <div class="movie-image-container">
        <div class="movie-image-wrapper">
          <img :src="movieImage" :alt="movieTitle" />
        </div>
      </div>
      <div class="movie-card-content">
        <h3 class="movie-card-title">{{ movieTitle }}</h3>
        <div class="movie-card-footer">
          <p class="movie-card-description">{{ movieDescription }}</p>
          <div class="movie-card-icons"></div>
        </div>
        <p class="movie-rating">
          {{
            movieRating !== null && movieRating !== undefined
              ? movieRating
              : "Chưa đánh giá"
          }}
          ({{ movieVotes || 0 }} votes)
        </p>
        <p class="movie-cast">Diễn viên: {{ movieCast }}</p>
        <p class="movie-release-year">Năm phát hành: {{ movieReleaseYear }}</p>
        <p class="movie-duration">Thời gian: {{ movieDuration }} phút</p>
        <p class="movie-country">Quốc gia: {{ movieCountry }}</p>
        <p class="movie-age-rating">Giới hạn độ tuổi: {{ movieAgeRating }}</p>
        <p class="movie-release-date">Ngày ra mắt: {{ movieReleaseDate }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "movieCardData_component",
  props: {
    movieImage: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    movieDescription: {
      type: String,
      required: true,
    },
    movieRating: {
      type: [Number, String],
      default: null,
    },
    movieVotes: {
      type: Number,
      default: 0,
    },
    movieCast: {
      type: String,
      default: "Chưa có thông tin",
    },
    movieReleaseYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    movieDuration: {
      type: Number,
      default: 0,
    },
    movieCountry: {
      type: String,
      default: "Chưa có thông tin",
    },
    movieAgeRating: {
      type: String,
      default: "Không xác định",
    },
    movieReleaseDate: {
      type: String,
      default: "Chưa có thông tin",
    },
    movieTrailer: {
      type: String,
      default: "",
    },
    movieId: {
      type: Number,
      required: true,
    },
  },
};
</script>

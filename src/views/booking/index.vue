<template>
<div id="stars"></div>
<!-- Header -->
<homePageHeader_page />
<!-- Booking Form Section -->
<homePageBooking_component />
<!-- Hot Movie Section -->
<homePageHotMovie_component />
<div id="stars"></div>
<div id="stars2"></div>
<div id="stars3"></div>
<!-- Movies Section -->
<homePageMovieSection_component />
<!-- Theater Section -->
<homePageTheater_component />
<!-- Banner Section -->
<homePageBanner_component />
<!-- Explore Section -->
<homePageExplore_component />
<!-- Footer -->
<homePageFooter_component />
<div class="scroll-to-top" id="scrollToTop" @click="scrollToTop" :class="{ show: isScrollButtonVisible }">
  <span class="fas fa-arrow-up"></span>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import homePageHeader_page from "@/layout/components/lay-header/homePageHeader_component.vue";
import homePageBooking_component from "./components/homePageBooking_component.vue";
import homePageHotMovie_component from "./components/homePageHotMovie_component.vue";
import homePageMovieSection_component from "./components/homePageMovieSection_component.vue";
import homePageTheater_component from "./components/homePageTheater_component.vue";
import homePageBanner_component from "./components/homePageBanner_component.vue";
import homePageExplore_component from "./components/homePageExplore_component.vue";
import homePageFooter_component from "@/layout/components/lay-footer/homePageFooter_component.vue";

export default defineComponent({
  components: {
    homePageHeader_page,
    homePageBooking_component,
    homePageHotMovie_component,
    homePageMovieSection_component,
    homePageTheater_component,
    homePageBanner_component,
    homePageExplore_component,
    homePageFooter_component,
  },
  setup() {
    const isScrollButtonVisible = ref(false);

    const toggleScrollButtonVisibility = () => {
      isScrollButtonVisible.value = window.scrollY > 100;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      window.addEventListener("scroll", toggleScrollButtonVisibility);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", toggleScrollButtonVisibility);
    });

    return {
      isScrollButtonVisible,
      scrollToTop,
    };
  },
});
</script>
<style>
.section {
  max-width: 1200px;
  margin: auto;
  padding: 3.5rem 1rem
}

.about_section {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  align-items: center
}

.about_img img {
  width: 500px;
  height: 750px;
  margin: auto;
  border-radius: 5px
}

.title {
  position: relative;
  margin-bottom: .5rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: #0c0a09
}

.title::after {
  position: absolute;
  content: "";
  height: 2px;
  width: 4rem;
  background: var(--before-btn);
  top: 50%;
  transform: translate(1rem, -50%)
}

.tagline {
  max-width: 600px;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 3rem;
  color: #0c0a09
}

.desc {
  max-width: 600px;
  margin-bottom: 1rem;
  color: #000
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

.explore_card img {
  width: 500px;
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


.explore_section :is(.title, .tagline) {
  text-align: center;
  margin-inline: auto
}

.explore_wrapper {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem
}

.explore_card {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1)
}

.card_title {
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

.one h1 {
  color: var(--first-color);
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 5px;
}

.movie-content {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.movie-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.movie-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.overlay-link {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 20;
}

.movie-image-container {
  overflow: hidden;
}

.movie-image-wrapper {
  position: relative;
  overflow: hidden;
}

.movie-image-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.movie-card-content {
  min-height: 200px;
  background-color: white;
  padding: 1rem;
}

.movie-card-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.movie-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movie-card-description {
  font-size: 0.875rem;
  color: #718096;
}

.booking_section {
  padding-block: 0;
}

.booking_form {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: var(--text-color);
  border-radius: 10px;
  transform: translateY(-50%);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
}

.input_box {
  flex: 1 1 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.input_with_icon {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.input_with_icon i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.75rem;
  color: var(--black);
}

.input_with_icon input,
select {
  display: block;
  width: 100%;
  padding-left: 40px;
  color: #0c0a09;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}
</style>

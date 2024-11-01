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
<style src="./assets/styles.css"></style>

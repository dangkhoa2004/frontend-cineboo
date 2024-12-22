<template>
<onlyPageHeader_component />
<div class="booking-background">
  <div id="stars"></div>
  <div class="booking-content">
    <infoMovieData_component />
    <chooseScheduleData_component />
    <chooseSeatData_component v-if="isShowTimeRoute" :key="routeKey" />
    <choosePaymentData_component v-if="isShowTimeRoute" :key="routeKey" />
  </div>
</div>
<div class="scroll-to-top" id="scrollToTop" @click="scrollToTop" :class="{ show: isScrollButtonVisible }">
  <span class="fas fa-arrow-up"></span>
</div>
<onlyPageFooter_component />
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from 'vue-router';
import infoMovieData_component from "./infoMovieData_component.vue";
import chooseScheduleData_component from "./chooseScheduleData_component.vue";
import chooseSeatData_component from "./chooseSeatData_component.vue";
import choosePaymentData_component from "./choosePaymentData_component.vue";
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";

export default {
  components: {
    onlyPageHeader_component,
    onlyPageFooter_component,
    chooseSeatData_component,
    choosePaymentData_component,
    chooseScheduleData_component,
    infoMovieData_component,
  },
  data() {
    return {
      routeKey: 0
    };
  },
  computed: {
    isShowTimeRoute() {
      const route = useRoute();
      return route.name === 'suat-chieu';
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name === 'suat-chieu') {
        this.routeKey += 1;
      }
    }
  }, setup() {
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
};
</script>

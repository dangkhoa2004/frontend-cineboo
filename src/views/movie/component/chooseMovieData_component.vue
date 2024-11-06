<template>
<div class="scroll-to-top" id="scrollToTop">
  <span class="fas fa-arrow-up"></span>
</div>
<div id="stars"></div>

<onlyPageHeader_component />
<div class="booking-background">
  <div id="stars"></div>
  <div class="booking-content">
    <infoMovieData_component />
    <div class="booking-movie-description">
      <chooseScheduleData_component />
      <!-- Kiểm tra và reload chooseSeatData_component khi route thay đổi -->
      <chooseSeatData_component v-if="isShowTimeRoute" :key="routeKey" />
      <choosePaymentData_component v-if="isShowTimeRoute" :key="routeKey" />
    </div>
  </div>
</div>
<onlyPageFooter_component />
</template>

<script>
import { watch } from 'vue'; // Import watch từ Vue
import { useRoute } from 'vue-router'; // Để theo dõi thay đổi route
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
  }
};
</script>

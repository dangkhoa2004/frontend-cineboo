<template>
  <div class="scroll-to-top" id="scrollToTop">
    <span class="fas fa-arrow-up"></span>
  </div>
  <div id="stars"></div>
  <div id="stars"></div>
  <!-- Header -->
  <onlyPageHeader_component />

  <div class="booking-background">
    <div id="stars"></div>
    <div class="booking-content">
      <infoMovieData_component />
      <div class="booking-movie-description">
        <!-- Component schedule -->
        <chooseScheduleData_component />

        <!-- Component choose seat -->
        <chooseSeatData_component />

        <!-- Component infomation -->
        <choosePaymentData_component />
      </div>
    </div>
  </div>

  <!-- Footer -->
  <onlyPageFooter_component />
</template>
<script>
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
};
</script>

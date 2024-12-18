<template>
  <div style="overflow: hidden">
    <div id="stars"></div>
    <!-- Header -->
    <onlyPageHeader_component />
    <!-- MOVIE DATA LIST -->
    <forgot_password />
    <!-- Footer -->
    <onlyPageFooter_component />
  </div>
</template>

<script>
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";
import forgot_password from "./components/forgot_password.vue";
export default {
  components: {
    onlyPageHeader_component,
    onlyPageFooter_component,
    forgot_password
  },
  mounted() {
  },
};
</script>
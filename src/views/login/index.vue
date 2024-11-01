<template>
<div style="overflow: hidden">
  <div id="stars"></div>
  <!-- Header -->
  <onlyPageHeader_component />
  <!-- MOVIE DATA LIST -->
  <loginPageInput_component />
  <!-- Footer -->
  <onlyPageFooter_component />
</div>
</template>

<script>
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";
import loginPageInput_component from "./component/loginPageInput_component.vue";
import logints from "@/assets/login.ts";
export default {
  components: {
    onlyPageHeader_component,
    onlyPageFooter_component,
    loginPageInput_component,
  },
  mounted() {
    logints();
  },
};
</script>

<template>
<div class="layout">
  <layout-header />
  <!-- Static header -->
  <div class="layout-body">
    <layout-sidebar />
    <!-- Static sidebar -->
    <layout-content>
      <router-view />
    </layout-content>
  </div>
</div>
</template>

<script>
import LayoutHeader from "./components/lay-header/index.vue";
import LayoutSidebar from "./components/lay-sidebar/index.vue";
import LayoutContent from "./components/lay-content/index.vue";
import mainjs from "@/assets/script.ts";

export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutSidebar,
    LayoutContent,
  },
  mounted() {
    mainjs();
  },
};
</script>

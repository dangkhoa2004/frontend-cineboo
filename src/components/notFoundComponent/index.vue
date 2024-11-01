<template>
  <div id="stars" style="overflow: hidden"></div>
  <div class="not-found-404">
    <h1>LÀM GÌ TỒN TẠI: 404 - NOT FOUND</h1>
    <section class="error-container">
      <span>4</span>
      <span><span class="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      window.location.href = "/";
    }, 120000);
  },
};
</script>
<style src="./assets/styles.css"></style>

<template>
  <!--=============== HEADER ===============-->
  <header class="admin_header" id="header">
    <div class="admin_header__container">
      <a href="/quan-ly" class="admin_header__logo">
        <button class="admin_header__toggle">
          <h4>{{ $t("message.home") }}</h4>
        </button>
      </a>
      <button class="admin_header__toggle" id="header-toggle">
        <i class="ri-menu-line"></i>
      </button>
    </div>
  </header>
</template>
<style src="./assets/styles.css"></style>

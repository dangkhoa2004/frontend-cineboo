<template>
  <header class="header" id="home">
    <nav>
      <div class="navbar">
        <div class="logo">
          <a href="/trang-chu">
            <h2>CINEBOO</h2>
          </a>
        </div>
        <div class="menu_btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <ul class="links">
        <li><a href="/trang-chu">TRANG CHỦ</a></li>
        <li><a href="/phim">PHIM</a></li>
        <li><a href="#rap-phim">RẠP</a></li>
        <li><a href="#kham-pha">KHÁM PHÁ</a></li>
        <li><a href="#lien-he">HỖ TRỢ</a></li>
        <li class="mobile-login"><a href="/dang-nhap">ĐĂNG NHẬP</a></li>
      </ul>
      <button class="btn nav_btn draw-border desktop-login">
        <a href="/dang-nhap">ĐĂNG NHẬP</a>
      </button>
    </nav>
    <section class="section header_section">
      <p>Nhanh chóng - Tiện lợi - Ưu đãi</p>
      <h1>
        Điện ảnh đích thực tại <br />
        <span>CineBoo</span>
      </h1>
    </section>
  </header>
</template>

<script lang="ts">
import mainjs from "@/assets/script.ts";

export default {
  mounted() {
    mainjs(); // Gọi hàm mainjs để khởi động các sự kiện
  },
};
</script>

<style src="./assets/styles.css"></style>

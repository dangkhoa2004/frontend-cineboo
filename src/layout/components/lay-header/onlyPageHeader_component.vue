<template>
<header class="extend_header" id="home">
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
      <li><a href="/trang-chu#rap-phim">RẠP</a></li>
      <li><a href="/trang-chu#kham-pha">KHÁM PHÁ</a></li>
      <li><a href="/trang-chu#lien-he">HỖ TRỢ</a></li>
      <li v-if="isLoggedIn()"><a href="/quan-ly">QUẢN LÝ</a></li>
      <li class="mobile-login" v-if="!isLoggedIn()"><a href="/dang-nhap">ĐĂNG NHẬP</a></li>
      <li class="mobile-logout" v-if="isLoggedIn()">
        <a href="/dang-xuat" @click.prevent="logout">ĐĂNG XUẤT</a>
      </li>
    </ul>
    <button class="btn nav_btn draw-border" v-if="!isLoggedIn()">
      <a href="/dang-nhap">ĐĂNG NHẬP</a>
    </button>
    <button class="btn nav_btn draw-border" v-if="isLoggedIn()" @click.prevent="logout">
      ĐĂNG XUẤT
    </button>
  </nav>
</header>
</template>

<script lang="ts">
import mainjs from "@/assets/script";
import { isLoggedIn, logout } from "@/api/authService"; // Nhập các hàm từ authService

export default {
  mounted() {
    mainjs();
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn(); // Kiểm tra trạng thái đăng nhập
    },
    logout() {
      logout(); // Thực hiện đăng xuất
      this.$router.push('/dang-nhap'); // Chuyển hướng về trang chính sau khi đăng xuất
    }
  }
};
</script>

<style src="./assets/styles.css"></style>
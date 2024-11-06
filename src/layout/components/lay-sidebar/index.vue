<template>
  <!--=============== SIDEBAR ===============-->
  <nav class="sidebar" id="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__user">
        <div class="sidebar__img">
          <img src="@/assets/img/avt.jpg" alt="User Avatar" />
        </div>

        <div class="sidebar__info">
          <h3>Đăng Khoa</h3>
          <span>khoacdpp02847@fpt.edu.vn</span>
        </div>
      </div>
      <div class="sidebar__content">
        <div>
          <h3 class="sidebar__title">{{ $t("message.home") }}</h3>

          <div class="sidebar__list">
            <router-link
              to="/quan-ly/hoa-don"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-table-line"></i>
              <span>{{ $t("message.invoice_man") }}</span>
            </router-link>
            <router-link
              to="/quan-ly/bang-phim"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-film-fill"></i>
              <span>{{ $t("message.movie_man") }}</span>
            </router-link>
          </div>
        </div>
        <div>
          <h3 class="sidebar__title">{{ $t("message.contact_man") }}</h3>
          <div class="sidebar__list">
            <router-link
              to="/quan-ly/tin-nhan"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-chat-3-fill"></i>
              <span>{{ $t("message.return_man") }}</span>
            </router-link>
            <router-link
              to="/quan-ly/thong-bao"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-notification-3-fill"></i>
              <span>{{ $t("message.nofication") }}</span>
            </router-link>
          </div>
        </div>
        <div>
          <h3 class="sidebar__title">{{ $t("message.setting") }}</h3>
          <div class="sidebar__list">
            <router-link
              to="/quan-ly/thong-tin"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-user-3-fill"></i>
              <span>{{ $t("message.profile") }}</span>
            </router-link>
            <router-link
              to="/quan-ly/ung-dung"
              class="sidebar__link"
              active-class="active-link"
            >
              <i class="ri-apps-2-fill"></i>
              <span>{{ $t("message.application") }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="sidebar__actions">
        <button class="sidebar__link" @click.prevent="logout">
          <i class="ri-door-open-fill"></i>
          <span>{{ $t("message.signout") }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { logout as authLogout } from "@/api/authService";

export default {
  methods: {
    logout() {
      authLogout();
      window.location.reload();
      this.$router.push('/dang-nhap');
    }
  }
};
</script>

<style src="./assets/styles.css"></style>

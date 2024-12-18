<template><!--=============== SIDEBAR ===============-->
<nav class="sidebar" id="sidebar">
  <div class="sidebar__container">
    <div class="sidebar__user">
      <div class="sidebar__img">
        <img src="@/assets/img/avt.jpg" alt="User Avatar" />
      </div>

      <div class="sidebar__info">
        <h3>{{fullname||'Who the F are you?'}}</h3>
         <span>{{ user?.taiKhoan?.email || 'wHoAreYOu?@email.com' }}</span>
      </div>
    </div>
    <div class="sidebar__content">
      <div>
        <h3 class="sidebar__title">{{ $t("message.home") }}</h3>

        <div class="sidebar__list">
          <router-link to="/quan-ly/hoa-don" class="sidebar__link" active-class="active-link">
            <i class="ri-table-line"></i>
            <span>{{ $t("message.invoice_man") }}</span>
          </router-link>
          <router-link to="/quan-ly/phims" class="sidebar__link" active-class="active-link">
            <i class="ri-film-fill"></i>
            <span>{{ $t("message.movie_man") }}</span>
          </router-link>
          <router-link to="/quan-ly/vouchers" class="sidebar__link" active-class="active-link">
            <i class="ri-ticket-fill"></i>
            <span>{{ $t("message.voucher_man") }}</span>
          </router-link>
        </div>
      </div>
      <div>
        <h3 class="sidebar__title">{{ $t("message.contact_man") }}</h3>
        <div class="sidebar__list">
          <router-link to="/quan-ly/ho-tro" class="sidebar__link" active-class="active-link">
            <i class="ri-chat-3-fill"></i>
            <span>{{ $t("message.contact_man") }}</span>
          </router-link>
          <router-link to="/quan-ly/thong-tin-nguoi-dung" class="sidebar__link" active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.customer_man") }}</span>
          </router-link>
          <router-link to="/quan-ly/bao-cao-thong-ke" class="sidebar__link" active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.report_man") }}</span>
          </router-link>
        </div>
      </div>
      <div>
        <h3 class="sidebar__title">{{ $t("message.setting") }}</h3>
        <div class="sidebar__list">
          <router-link to="/quan-ly/thong-tin" class="sidebar__link" active-class="active-link">
            <i class="ri-user-3-fill"></i>
            <span>{{ $t("message.profile") }}</span>
          </router-link>
          <router-link to="/quan-ly/ung-dung" class="sidebar__link" active-class="active-link">
            <i class="ri-apps-2-fill"></i>
            <span>{{ $t("message.application") }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="sidebar__actions">
      <button class="sidebar__link" @click.prevent="logout">
        <i class="ri-door-open-fill" style="margin-left: 100px;"></i>
        <span>{{ $t("message.signout") }}</span>
      </button>
    </div>
  </div>
</nav>
</template>

<script>
import { logout as authLogout } from "@/api/authService";

export default {
  data() {
    return {
      user: null,
      fullname: null,
    };
  },
  mounted() {
    const savedUser = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    this.user = savedUser;
    this.fullname = `${savedUser.ho || ''} ${savedUser.tenDem || ''} ${savedUser.ten || ''}`.trim();
    console.log(this.fullname);
  },
  methods: {
    logout() {
      authLogout();
      window.location.reload();
      this.$router.push('/dang-nhap');
      this.user = null;
      this.fullname = null;
    },
  },
};
</script>


<style scoped>
button {
  all: unset;
}
</style>
<style src="./assets/styles.css"></style>
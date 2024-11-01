<template>
  <section class="section banner_section">
    <div class="banner_content">
      <div class="banner_card">
        <h1>20K+</h1>
        <p>Đăng ký thành viên</p>
      </div>
      <div class="banner_card">
        <h1>30K+</h1>
        <p>Lượt bán vé</p>
      </div>
      <div class="banner_card">
        <h1>100+</h1>
        <p>Voucher hấp dẫn</p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.banner_content {
  background: var(--text-color);
  padding: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

.banner_card {
  text-align: center;
  flex: 1 1 180px;
}

.banner_card h4 {
  font-size: 2rem;
  font-weight: 600;
  color: #0c0a09;
}

.banner_card p {
  color: #78716c;
}
</style>

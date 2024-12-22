<template>
<div style="overflow: hidden">
    <div id="stars"></div>
    <onlyPageHeader />
    <section>
        <div class="row">
            <h2 class="section-heading">Hỗ trợ</h2>
        </div>
        <div class="row">
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-film"></i>
                    </div>
                    <h3>Phim Mới Nhất</h3>
                    <p>
                        Cập nhật các bộ phim bom tấn mới nhất, mang đến trải nghiệm điện ảnh sống động.
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-ticket-alt"></i>
                    </div>
                    <h3>Đặt Vé Nhanh</h3>
                    <p>
                        Dễ dàng đặt vé trực tuyến, chọn ghế ngồi yêu thích chỉ trong vài bước.
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3>Combo Ưu Đãi</h3>
                    <p>
                        Thưởng thức bỏng ngô, nước ngọt với các combo hấp dẫn cho mọi bộ phim.
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-chair"></i>
                    </div>
                    <h3>Ghế Thoải Mái</h3>
                    <p>
                        Hệ thống ghế ngồi êm ái, mang lại sự thoải mái tối đa khi xem phim.
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-video"></i>
                    </div>
                    <h3>Công Nghệ Hiện Đại</h3>
                    <p>
                        Trải nghiệm âm thanh và hình ảnh chất lượng cao với công nghệ tiên tiến.
                    </p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3>Thành Viên VIP</h3>
                    <p>
                        Nhận ưu đãi đặc biệt và tích điểm thưởng khi trở thành thành viên thân thiết.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <onlyPageFooter />
</div>
</template>
<script>
import onlyPageHeader from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter from "@/layout/components/lay-footer/onlyPageFooter_component.vue";
export default {
    components: {
        onlyPageHeader,
        onlyPageFooter,
    },
}
</script>
<style src="./assets/styles.css" scoped></style>
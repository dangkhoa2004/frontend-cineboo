<template>
<div style="overflow: hidden">
    <div id="stars"></div>
    <onlyPageHeader_component />
    <div class="carousel">
        <div class="list">
            <div class="item" v-for="(slide, index) in slides" :key="index" v-show="currentIndex === index">
                <img :src="slide.image" alt="Slide Image">
                <div class="content">
                    <div class="author">{{ slide.author }}</div>
                    <div class="title">{{ slide.title }}</div>
                    <div class="topic">{{ slide.topic }}</div>
                    <div class="des">{{ slide.description }}</div>
                    <div class="buttons">
                        <button @click="seeMore(slide)">XEM THÊM</button>
                        <button @click="subscribe(slide)">ĐẶT VÉ</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="arrows">
            <button @click="showSlider('prev')">
                < </button>
                    <button @click="showSlider('next')">></button>
        </div>
    </div>
    <onlyPageFooter_component />
</div>
</template>

<script>
import onlyPageHeader_component from "@/layout/components/lay-header/onlyPageHeader_component.vue";
import onlyPageFooter_component from "@/layout/components/lay-footer/onlyPageFooter_component.vue";

export default {
    components: {
        onlyPageHeader_component,
        onlyPageFooter_component,
    },
    data() {
        return {
            slides: [
                {
                    image: 'src/assets/img/img1.jpg',
                    author: 'Sắp chiếu',
                    title: '',
                    topic: 'Chị Dâu',
                    description: 'Chuyện bắt đầu khi bà Nhị - con dâu cả của gia đình quyết định nhân dịp đám giỗ của mẹ chồng, tụ họp cả bốn chị em gái - con ruột trong nhà lại để thông báo chuyện sẽ tự bỏ tiền túi ra sửa sang căn nhà từ đường cũ kỹ trước khi bão về. Vấn đề này khiến cho nội bộ gia đình bắt đầu có những lục đục, chị dâu và các em chồng cũng xảy ra mâu thuẫn, bất hoà. Dần dà những sự thật đằng sau việc "bằng mặt mà không bằng lòng" giữa các chị em cũng dần được hé lộ, những bí mật, nỗi đau sâu thẳm nhất trong mỗi cá nhân cũng dần được bóc tách. Liệu sợi dây liên kết vốn đã mong manh giữa các chị em có bị cắt đứt và liệu “căn nhà” vốn đã dột nát ấy có còn nguyên vẹn sau cơn bão lớn?'
                },
                {
                    image: 'src/assets/img/img2.webp',
                    author: 'Sắp chiếu',
                    title: '',
                    topic: 'Ngài Quỷ',
                    description: 'Một bác sĩ nghi ngờ rằng cái chết kỳ lạ của cô con gái vừa được cấy ghép tim là do buổi trừ tà quái dị gây ra, những âm thanh rên rỉ bên tai khiến người đàn ông tin rằng con gái của mình chưa hề chết. Sau 3 ngày khâm liệm, vị bác sĩ cùng cha xứ quyết tâm tìm ra uẩn khúc về con quỷ ẩn mình trong cơ thể cô bé và đưa cô trở về từ cõi chết.'
                },
                {
                    image: 'src/assets/img/img3.jpeg',
                    author: 'Sắp chiếu',
                    title: '',
                    topic: 'Mufasa: Vua Sư Tử',
                    description: 'Thương hiệu kinh điển và nổi tiếng nhất nhì hãng Disney sẽ trở lại vào cuối năm nay với tác phẩm Mufasa: The Lion King. Phim kể về cuộc đời Mufasa – người cha đáng kính của Simba. Dù là tiền truyện, Mufasa: The Lion King vẫn lồng ghép nhân vật quen thuộc từ The Lion King. Khi Rafiki sẽ kể cho con gái Simba và Nala – cô bé Kiara về ông nội.'
                },
                {
                    image: 'src/assets/img/img4.jpeg',
                    author: 'Sắp chiếu',
                    title: '',
                    topic: 'Kraven - Thợ Săn Thủ Lĩnh',
                    description: 'Kraven the Hunter là câu chuyện đầy khốc liệt và hoành tráng về sự hình thành của một trong những phản diện biểu tượng nhất của Marvel - kẻ thù truyền kiếp của Spiderman. Aaron Taylor-Johnson đảm nhận vai Kraven, một người đàn ông có người cha mafia vô cùng tàn nhẫn, Nikolai Kravinoff (Russell Crowe) - người đã đưa anh vào con đường báo thù với những hệ quả tàn khốc. Điều này thúc đẩy anh không chỉ trở thành thợ săn vĩ đại nhất thế giới, mà còn là một trong những nhân vật đáng sợ nhất.'
                },
            ],
            currentIndex: 0,
            autoNext: null,
        };
    },
    methods: {
        showSlider(direction) {
            if (direction === 'next') {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            } else {
                this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            }
            this.resetTimer();
        },
        resetTimer() {
            clearInterval(this.autoNext);
            this.startAutoNext();
        },
        startAutoNext() {
            this.autoNext = setInterval(() => {
                this.showSlider('next');
            }, 7000);
        },
        seeMore(slide) {
            Swal.fire({
                title: "Thông tin chi tiết",
                text: 'Hiện tại chưa có thông tin',
                icon: "info",
            });
        },
        subscribe(slide) {
            Swal.fire({
                title: "Thông tin chi tiết",
                text: 'Hiện tại chưa có thông tin',
                icon: "info",
            });
        },
    },
    mounted() {
        this.startAutoNext();
    },
    beforeDestroy() {
        clearInterval(this.autoNext);
    },
};
</script>

<style src="./assets/styles.css" scoped></style>
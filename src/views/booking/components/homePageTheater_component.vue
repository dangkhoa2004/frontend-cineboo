<template>
    <div id="rap-phim"></div>
    <section class="popular" id="">
        <div class="section popular_section hidden">
            <div class="popular_content">
                <p class="title">CÁC RẠP PHIM HIỆN CÓ</p>
                <ul class="popular_list">
                    <li>
                        <span><i class="fas fa-location"></i></span>
                        Hải Phòng(Việt Nam)
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<style scoped>
.popular {
    height: 500px;
    background: url(src/assets/img/cine.webp);
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat
}

.popular_section {
    padding-block: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr)
}

.popular_content {
    grid-column: 2/3;
    padding: 2rem 4rem;
    background: #fff
}

.popular_list {
    list-style: none;
    margin-top: 2rem;
    display: grid;
    gap: 2rem
}

.popular_list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #0c0a09
}

.popular_list span {
    padding: 10px 14px;
    font-size: 1.75rem;
    color: #fff;
    background: var(--black);
    border-radius: 100%
}
</style>
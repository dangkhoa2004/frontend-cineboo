<script setup lang="ts">
import { useAboutSectionStore } from '@/store/aboutSectionStore';
// Khởi tạo store
const aboutSectionStore = useAboutSectionStore();
</script>

<template>
<section :class="['section', 'about_section', { hidden: aboutSectionStore.isHidden }]">
    <div class="about_img">
        <img :src="aboutSectionStore.imageSrc" :alt="aboutSectionStore.imageAlt" />
    </div>
    <div class="about_content">
        <p class="title">{{ aboutSectionStore.title }}</p>
        <h2 class="tagline">{{ aboutSectionStore.tagline }}</h2>
        <p class="desc">
            {{ aboutSectionStore.description }}
        </p>
        <div class="about_btn">
            <button class="btn">
                <a :href="aboutSectionStore.buttonLink">{{ aboutSectionStore.buttonText }}</a>
            </button>
        </div>
    </div>
</section>
</template>

<!-- homePageHotMovie_component.vue -->
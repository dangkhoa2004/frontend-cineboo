<template>
    <div class="language-switcher">
        <div class="button-container">
            <button class="chang-language-btn" @click="setLanguage('vi')"
                :class="{ active: currentLanguage === 'vi' }">{{ $t('message.vi_lang') }}
            </button>
            <button class="chang-language-btn" @click="setLanguage('en')"
                :class="{ active: currentLanguage === 'en' }">{{ $t('message.en_lang') }}
            </button>
        </div>
    </div>
</template>

<script>
import { changeLanguage } from '@/config/changLanguage';

export default {
    data() {
        return {
            currentLanguage: 'vi',
        };
    },
    mounted() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.$i18n.locale = savedLanguage;
            this.currentLanguage = savedLanguage;
        } else {
            this.currentLanguage = 'vi';
        }
    },
    methods: {
        setLanguage(lang) {
            changeLanguage(this.$i18n, lang);
            this.currentLanguage = lang;
        },
    },
};
</script>

<style src="./assets/styles.css"></style>

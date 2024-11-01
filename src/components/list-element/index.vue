<template>
<div class="color-picker-container">
    <label for="color-input" class="color-label">Thay đổi màu chủ đạo:</label>
    <input id="color-input" type="color" v-model="color" @input="changeColor" class="color-input">
</div>
</template>

<script>
export default {
    data() {
        return {
            color: ''
        };
    },
    mounted() {
        const savedColor = localStorage.getItem('firstColor');
        if (savedColor) {
            this.color = savedColor;
        } else {
            this.color = getComputedStyle(document.documentElement).getPropertyValue('--first-color').trim();
        }
    },
    methods: {
        changeColor(event) {
            const selectedColor = event.target.value;
            this.color = selectedColor;
            document.documentElement.style.setProperty('--first-color', selectedColor);
            localStorage.setItem('firstColor', selectedColor);
        }
    }
};

</script>
<style src="./assets/styles.css"></style>
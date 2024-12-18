<template>
<form @submit.prevent="updateContent">
    <input v-model="tagline" />
    <textarea v-model="description"></textarea>
    <input v-model="buttonLink" />

    <button type="submit">Update</button>

    <!-- Success or error message -->
    <p v-if="message" :class="messageType">{{ message }}</p>
</form>
</template>

<script setup lang="ts">
import { useAboutSectionStore } from '@/store/aboutSectionStore';
import { ref } from 'vue';

// Initialize the store
const aboutSectionStore = useAboutSectionStore();

// Bind input fields to store values
const title = ref(aboutSectionStore.title);
const tagline = ref(aboutSectionStore.tagline);
const description = ref(aboutSectionStore.description);
const buttonText = ref(aboutSectionStore.buttonText);
const buttonLink = ref(aboutSectionStore.buttonLink);

// Reactive state for message and its type (success or error)
const message = ref('');
const messageType = ref(''); // 'success' or 'error'

// Function to update content and show notification
const updateContent = () => {
    try {
        aboutSectionStore.updateTitle(title.value);
        aboutSectionStore.updateTagline(tagline.value);
        aboutSectionStore.updateDescription(description.value);
        aboutSectionStore.buttonText = buttonText.value;
        aboutSectionStore.buttonLink = buttonLink.value;

        // Show success message
        message.value = 'Content updated successfully!';
        messageType.value = 'success';
    } catch (error) {
        // Show error message if something goes wrong
        message.value = 'Failed to update content. Please try again.';
        messageType.value = 'error';
    }
};
</script>

<style src="./assets/styles.css" scoped>
.success {
    color: green;
}

.error {
    color: red;
}
</style>
<template>
<div class="message-list-app">
    <div class="message-list-header">
        <h1 class="message-list-header-title">{{ $t('message.message') }}</h1>
    </div>
    <div class="message-list-chat-list">
        <div class="message-list-chat-item">
            <img src="@/assets/img/avt.jpg" class="message-list-avatar" alt="Avatar" />
            <div class="message-list-chat-info">
                <h2 class="message-list-chat-name">Hữu Trần</h2>
                <p class="message-list-chat-message">Đừng lo lắng. Hãy nói anh biết...</p>
            </div>
            <span class="message-list-chat-notification">1</span>
        </div>
        <div class="message-list-chat-item">
            <img src="@/assets/img/avt.jpg" class="message-list-avatar" alt="Avatar" />
            <div class="message-list-chat-info">
                <h2 class="message-list-chat-name">Liên Mạnh</h2>
                <p class="message-list-chat-message">Lo chạy deadline đi mày ơi. Anh...</p>
            </div>
            <span class="message-list-chat-notification">1</span>
        </div>
    </div>
</div>
</template>

<script lang="ts">
export default {
    name: "ChatApp",
};
</script>
<style src="./assets/styles.css"></style>
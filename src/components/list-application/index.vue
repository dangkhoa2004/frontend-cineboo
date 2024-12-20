<template>
<div class="all-settings">
    <div class="setting-for">
        <h3>{{ $t('message.appsetting') }}:</h3>
        <listSetting />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.statussetting') }}:</h3>
        <CssManager />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.statussetting') }}:</h3>
        <listPopup />
    </div>
    <div class="setting-for">
        <h3>{{ $t('message.performance') }}:</h3>
        <listPerformance />
    </div>
    <div class="setting-for">
        <qrSystem />
    </div>
    <div class="setting-for">
        <hotMovie />
    </div>
</div>
</template>

<script lang="ts">
import CssManager from '../list-element/index.vue';
import listPopup from '../list-popup/index.vue';
import listPerformance from '../list-perfomance/index.vue';
import listSetting from '../list-settings/index.vue';
import qrSystem from '../qr-system/index.vue';
import hotMovie from '../hot-movie/index.vue';

export default {
    name: "ChatApp",
    components: {
        listPopup, listSetting, CssManager, listPerformance, qrSystem, hotMovie
    }
};
</script>

<style src="./assets/styles.css"></style>
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
    </div>
</template>

<script lang="ts">
import CssManager from '../list-element/index.vue';
import listPopup from '../list-popup/index.vue';
import listPerformance from '../list-perfomance/index.vue';
import listSetting from '../list-settings/index.vue';

export default {
    name: "ChatApp",
    components: {
        listPopup, listSetting, CssManager, listPerformance
    }
};
</script>

<style src="./assets/styles.css"></style>
<template>
    <div id="map"></div>
    <PopupComponent :isVisible="isPopupVisible" @close="closePopup" />
    <button class="checkin-button" v-if="!isPopupVisible" @click="togglePopup">{{ $t('message.timeset') }}</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as L from 'leaflet';
import PopupComponent from '../timeset-popup/index.vue';

export default defineComponent({
    name: 'MapComponent',
    components: {
        PopupComponent
    },
    setup() {
        const isPopupVisible = ref(false);
        const togglePopup = () => {
            isPopupVisible.value = !isPopupVisible.value;
        };
        const closePopup = () => {
            isPopupVisible.value = false;
        };

        onMounted(() => {
            const map = L.map('map').setView([20.8379059, 106.7135343], 18);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
            }).addTo(map);

            const customIcon = L.divIcon({
                className: 'custom-icon',
                html: '<i class="fas fa-map-marker-alt" style="font-size: 30px; color: var(--first-color);"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });

            L.marker([20.8379059, 106.7135343], { icon: customIcon }).addTo(map)
                .bindPopup('Địa điểm của bạn!')
                .openPopup();
        });

        return {
            isPopupVisible,
            togglePopup,
            closePopup
        };
    },
});
</script>
<style src="./assets/styles.css"></style>
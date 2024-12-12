<template>
<div class="chart-wrapper">
    <div class="chart-container">
        <BarChartEachMonthRevenue :year="currentYear" />
    </div>
    <div class="chart-container">
        <PieChartMovieRevenue />
    </div>
    <div class="chart-container">
        <ScatterUsersSpentAmount />
    </div>
</div>
</template>

<script>
import BarChartEachMonthRevenue from './BarChartEachMonthRevenue.vue';
import PieChartMovieRevenue from './PieChartMovieRevenue.vue';
import ScatterUsersSpentAmount from './ScatterUsersSpentAmount.vue';
import { ref } from 'vue';

export default {
    name: "ChatApp",
    components: {
        BarChartEachMonthRevenue, PieChartMovieRevenue, ScatterUsersSpentAmount
    },
    setup() {
        const currentYear = ref(new Date().getFullYear());
        return { currentYear };
    }
};
</script>

<style scoped>
.chart-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.chart-container {
    flex: 1 1 30%;
    width: 100%;
    background-color: none;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chart-container>* {
    width: 100%;
    height: 100%;
}
</style>
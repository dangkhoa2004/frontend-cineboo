<template>
<div class="chart-container">
  <Scatter :data="data" :options="options" />
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { requestWithJWT } from "@/api/api.ts";
import { Scatter } from 'vue-chartjs';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// Scatter chart data
const data = ref({
  datasets: [
    {
      label: 'Scatter Dataset 1',
      fill: false,
      borderColor: 'white',
      backgroundColor: '#f87979',
      data: [],
    },
  ],
});

// Chart options
const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
  elements: {
    point: {
      radius: 8,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const point = context.raw;
          const datasetIndex = context.datasetIndex;
          const datasetMessages = [
            `Khách hàng: ${point.label}: ${point.y} VNĐ`,
            `Khách hàng: ${point.label}: ${point.y} Điểm tích luỹ`,
          ];
          return datasetMessages[datasetIndex];
        },
      },
    },
    legend: {
      position: 'top',
      labels: {
        color: 'black',
        font: {
          size: 14,
        },
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      grid: {
        color: '#084975',
      },
    },
  },
});

const fetchData = async () => {
  try {
    const response = await requestWithJWT("GET", 'http://localhost:8080/thongke/scatter');
    const responseData = response.data;

    const newDataSet = {
      datasets: [
        {
          label: 'Tổng tiêu dùng của từng khách hàng',
          fill: false,
          borderColor: 'white',
          pointBackgroundColor: "gold",
          data: responseData.map(item => ({
            x: item.id * 0.01,
            y: item.tongSoTien,
            label: item.ten
          }))
        },
        {
          label: 'Tổng điểm tích luỹ của từng khách hàng',
          fill: false,
          borderColor: 'white',
          backgroundColor: '#f87979',
          pointBackgroundColor: "plum",
          data: responseData.map(item => ({
            x: item.id * 0.02,
            y: item.diem,
            label: item.ten
          }))
        },
      ],
    };

    data.value = newDataSet;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>
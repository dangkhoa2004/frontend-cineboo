<template>
<div class="chart-container">
  <Pie id="my-pie-chart" :options="chartOptions" :data="chartData" />
</div>
</template>

<script setup>
import { requestWithJWT } from "@/api/api.ts";
import { ref, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
      luotMua: []
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const dataset = context.dataset;
          const point = context.raw;
          const index = context.dataIndex;
          const luotMua = dataset.luotMua[index];
          return `Số lượng vé bán ra: ${luotMua}. Tổng doanh thu:  ${point} VNĐ`;
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
  hover: {
    mode: 'nearest'
  }
});

const fetchData = async () => {
  try {
    const response = await requestWithJWT("GET", 'http://localhost:8080/thongke/pie');
    const responseData = response.data;

    const newDataSet = {
      labels: responseData.map(item => item.tenPhim),
      datasets: [
        {
          backgroundColor: responseData.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
          data: responseData.map(item => item.doanhThu),
          luotMua: responseData.map(item => item.luotMua)
        }
      ]
    };

    chartData.value = newDataSet;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>
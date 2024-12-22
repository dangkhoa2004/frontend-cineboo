<template>
<div class="chart-container">
  <Bar id="my-chart-id" :options="options" :data="data" />
</div>
</template>

<script setup>
import { requestWithJWT } from "@/api/api.ts";
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, onMounted, watch } from 'vue';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  year: {
    type: Number,
    required: true
  }
});

const year = ref(props.year);
const data = ref({
  labels: [],
  datasets: [
    { data: [] }
  ]
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  color: 'black',
  backgroundColor: 'rgba(75, 192, 192, 0.2)',
  borderColor: 'rgba(75, 192, 192, 1)',
  borderWidth: 1,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(75, 192, 192, 0.2)'
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(75, 192, 192, 0.2)'
      }
    }
  }
});

const fetchData = async () => {
  try {
    const response = await requestWithJWT("get", `http://localhost:8080/thongke/bar/${year.value}`);
    const responseData = response.data;

    const newDataSet = {
      labels: responseData.map(item => item.month),
      datasets: [
        {
          label: 'Tổng doanh thu tháng',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: responseData.map(item => item.totalAmount),
        },
        {
          label: 'Tổng đơn hàng trong tháng',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: responseData.map(item => item.totalInvoices),
        }
      ]
    };

    data.value = newDataSet;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.',
    });;
  }
};

onMounted(fetchData);

// Watch for changes in the year prop and refetch data if it changes
watch(year, fetchData);
</script>
<template>
  <Pie id="my-pie-chart" :options="chartOptions" :data="chartData" />
</template>
  
  <script setup>
  import {requestWithJWT} from "@/api/api.ts";
import { ref,onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import axios from 'axios'
ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
})

const chartOptions = ref({
  options: {
  hover: {
    mode: 'nearest'
  }
},
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          const dataset = context.dataset;
          const point = context.raw; // Access the raw data point
          const index = context.dataIndex;
          const luotMua =dataset.luotMua[index];
           
          return `Số lượng vé bán ra: ${luotMua}. \nTổng doanh thu:  ${point} VNĐ`;
        },
      },
    },
  },
})

 
const fetchData = async () => {
  try {
    const response = await requestWithJWT("GET",'http://localhost:8080/thongke/pie')
    const responseData = await response.data

    //Replace the entire thing since
    //Cuz iteraing data doesnt work
    let newDataSet = ref({
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
          luotMua:[]
        },
      ],
    })
    for (let i = 0; i < responseData.length; i++) {
      newDataSet.value.labels.push(responseData[i]['tenPhim']);//Pie name

      var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
      
      newDataSet.value.datasets[0].backgroundColor.push(randomColor);//Pie color

      newDataSet.value.datasets[0].data.push(responseData[i]['doanhThu']);
      newDataSet.value.datasets[0].luotMua.push(responseData[i]['luotMua']);
    }

    chartData.value = newDataSet.value
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(fetchData);
</script>
  
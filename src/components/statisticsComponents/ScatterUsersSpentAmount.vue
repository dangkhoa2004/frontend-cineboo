<template>
  <Scatter :data="data" :options="options" />
</template>
  
  <script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios';
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

    // Scatter chart data
    let data = ref(
      {
      datasets: [
        {
          label: 'Scatter Dataset 1',
          fill: false,
          borderColor: 'white',
          backgroundColor: '#f87979',
          data: [
          ],
        },
      ],
    })

    // Chart options
    const options = ref({
      responsive: true,
      maintainAspectRatio: true,//set this true to avoid canvas height increasing like mad when in dev mode
      pointBackgroundColor: 'gold',
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
          radius: 8, // You can control the point size here
        },
      },
      plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          const point = context.raw; // Access the raw data point
          const datasetIndex = context.datasetIndex;
          const datasetMessages = [
       `Khách hàng: ${point.label}: ${point.y} VNĐ`,
           `Khách hàng: ${point.label}: ${point.y} Điểm tích luỹ`,
          ]; 
          return datasetMessages[datasetIndex];
        },
      },
    },
  },
      // Background color for the entire chart area
      backgroundColor: '#f0f0f0', // Set the chart's background color here
      scales: {
        x: {
          display: false,
        },
        y: {
          grid: {
            color: '#084975', // Grid line color
          },
        },
      },
    })

 

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/thongke/scatter') ;
    const responseData =  await response.data;
     
    //Replace the entire thing since
    //Cuz iteraing data doesnt work
    let newDataSet = ref(
      {
      datasets: [
        {
          label: 'Tổng tiêu dùng của từng khách hàng',
          fill: false,
          borderColor: 'white', 
          pointBackgroundColor:"gold",
          data: [ 
          ],
        },
         {
          label: 'Tổng điểm tích luỹ của từng khách hàng',
          fill: false,
          borderColor: 'white',
          backgroundColor: '#f87979',
          pointBackgroundColor:"plum",
          data: [ 
          ],
        },
      ],
    })  
    for(let i =0 ; i<responseData.length;i++){  
      newDataSet.value.datasets[0].data.push({
        x:responseData[i]['id']*0.01,
        y:responseData[i]['tongSoTien'],
        label: responseData[i]['ten']
      })
         newDataSet.value.datasets[1].data.push({
        x:responseData[i]['id']*0.02,
        y:responseData[i]['diem'],
        label: responseData[i]['ten']
      })
    }

   
    data.value = newDataSet.value;
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Call fetchData on component mount
onMounted(fetchData);  
</script>
  

  
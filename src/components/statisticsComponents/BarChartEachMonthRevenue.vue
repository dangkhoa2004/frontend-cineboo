<template>
    <Bar
      id="my-chart-id"
      :options="options"
      :data="data"
    />
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {ref,onMounted} from 'vue';  
  import axios from 'axios';
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const props = defineProps({
  year: {
    required: true
  }
});

    const year = ref(props.year);
        const data=ref({
          labels: [],
          datasets: [ 
            { data: [] } 
          ]
        });

        const options=ref({
          responsive: true,
          maintainAspectRatio:true,
          color:"red",
          backgroundColor:"plum"
        });
      
        const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/thongke/bar/${year.value}`) ;
    const responseData =  await response.data;
     
    //Replace the entire thing since
    //Cuz iteraing data doesnt work
    let newDataSet = ref(
      {
        labels: [],
      datasets: [
        {
          label: 'Tổng doanh thu tháng',
          fill: false,
          borderColor: '#f87979', 
          pointBackgroundColor:"gold",
          data: [ 
          ],
        },
         {
          label: 'Tổng đơn hàng trong tháng',
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
      newDataSet.value.labels.push(responseData[i]['month']);  
      newDataSet.value.datasets[0].data.push(responseData[i]['totalAmount']);
      
         newDataSet.value.datasets[1].data.push(responseData[i]['totalInvoices']);
    }

   
    data.value = newDataSet.value;
    console.log("Checking data value");
    console.log(data.value.labels[1])
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(fetchData);
  </script>
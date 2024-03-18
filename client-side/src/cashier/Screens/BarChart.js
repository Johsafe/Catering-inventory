import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from 'axios'; // Importing axios for making HTTP requests
import { base_url } from "../../Utils/Utils";

const BarChart = () => {
  const [foodRevenueData, setFoodRevenueData] = useState({});

  useEffect(() => {
    const fetchFoodRevenueData = async () => {
      try {
        const response = await axios.get(`${base_url}stats/food-revenue`);
        const foodRevenueItems = response.data;
        console.log(response.data);

        const labels = foodRevenueItems.map(item => item.CookedFood.foodName);
        const data = foodRevenueItems.map(item => item.totalRevenue);

        setFoodRevenueData({ labels, data });
      } catch (error) {
        console.error('Error fetching food revenue data:', error);
      }
    };

    fetchFoodRevenueData();
  }, []); 

    // Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Generate 15 RGB colors
const backgroundColor = Array.from({ length: 40 }, () => getRandomColor());


  const chartData = {
    labels: foodRevenueData.labels || [],
    datasets: [
      {
        label: "Revenue",
        backgroundColor:backgroundColor,
        // backgroundColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(75, 192, 192)',
        //   'rgb(255, 205, 86)',
        //   'rgb(201, 203, 207)',
        //   'rgb(54, 162, 235)'
        // ],
        // borderColor: "rgb(255, 99, 132)",
        data: foodRevenueData.data || [],
      },
    ],
  };

  // Define options for the chart
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Sales Revenue of the Foods', // Title for the chart
        font: {
          size: 20
        }
      }
    }
  };

  return (
    <div style={{ width: '900px', height: '500px' }}>
      <Bar data={chartData} options={chartOptions} width={90} height={50} />
    </div>
  );
};

export default BarChart;

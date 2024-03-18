
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";
import axios from 'axios'; 
import { base_url } from "../../Utils/Utils";

const PolarAreaChart = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    // Function to fetch food data from the database
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`${base_url}recipe/cookedFood`);;
        const foodItems = response.data;

        const labels = foodItems.map(food => food.foodName);
        const data = foodItems.map(food => food.quantity);

        setFoodData({ labels, data });
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };
    fetchFoodData();
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



  // Define the data object for the chart
  const chartData = {
    labels: foodData.labels || [],
    datasets: [{
      label: 'Quantity',
      data: foodData.data || [],
      backgroundColor:backgroundColor,
    }]
  };

   // Define options for the chart
   const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Available Foods',
        font: {
          size: 20
        }
      }
    }
  };

  return (
    <div style={{width:'500px',height:'500px'}}>
      <PolarArea data={chartData} options={chartOptions} width={50} height={50}  />
    </div>
  );
};

export default PolarAreaChart;

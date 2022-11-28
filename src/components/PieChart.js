import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

function PieChart({ chartData }) {
  if (!chartData) {
    return <div>Loading...</div>;
  }

  if (chartData.length === 5) {
    chartData.push({
      name: '其他',
      value: (100 - (chartData.reduce((acc, item) => acc + item.value, 0))).toFixed(2),
    });
  }

  const data = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        label: '# of Votes',
        data: chartData.map((item) => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  
  return (
    <div className="max-w-[350px] mx-auto ">
      <Pie data={data}  />
    </div>
    
  )
}

export default PieChart;
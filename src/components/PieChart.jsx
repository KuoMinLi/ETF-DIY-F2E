import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';
import { backgroundColor, borderColor } from '../data/chartColor';

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
        backgroundColor,
        borderColor,
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
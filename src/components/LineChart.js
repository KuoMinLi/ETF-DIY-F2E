import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

function LineChart({ chartData }) {
  return (
    <div className="max-w-[700px] mx-auto">
      <Line data={chartData}  />
    </div>
    
  )
}

export default LineChart;
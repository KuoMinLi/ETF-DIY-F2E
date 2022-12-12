import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div className=" md:max-w-[700px]  lg:max-w-[650px] xl:max-w-[750px] mx-auto">
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;

import { useMemo } from "react";

const LineChartDataFormat = (data) => {

  const chartData = useMemo(() => {
    const firstPrice = data[0]?.close;

    // 篩選數值是否有null，有則刪除
    const filterData = data.filter((item) => item.close !== null);

    const ans = {
      labels: filterData.map((item) => item.date),
      datasets: [
        {
          label: "報酬率(%)",
          data: filterData.map((item) => {            
            const RoR = (item.close/ firstPrice *100)-100;
            return RoR.toFixed(2);
          }),
        },
      ],
    };
    return ans;
  }, [data]);

  return chartData;
}

export default LineChartDataFormat;

import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { codeNameData } from "../data/codeNameData";
import { fugleAPIGetFiveYear } from "../api/stockAPI";
import { getETFListByCode } from "../api/etfAPI";
import periodRoR from "./calculate/periodRoR";

const ETFIItem = () => {
  const { userId } = useParams();
  const [allData, setAllData] = useState([]); //取回的五年資料 
  const [data, setData] = useState([]); // 線圖資料
  const [ETFData, setETFData] = useState([]); // ETF content 資料

  const ETFName = codeNameData.filter((item) => item.code === userId)[0].name;
  
  // 監聽期間變化
  const changePeriod = (num) => {
    const newData = allData.reverse().slice(0, num).reverse();
    setData(newData);
  };

  // 取得ETF資料
  useEffect(() => {
    (async () => {
      try {
        const resultAll = await fugleAPIGetFiveYear(userId);
        setAllData(resultAll);
        setData(resultAll.reverse());
        const ETFResult = await getETFListByCode(userId);
        setETFData(ETFResult.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  const chartData = useMemo(() => {
    const ans = {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Price",
          data: data.map((item) => item.close),
        },
      ],
    };
    return ans;
  }, [data]);

  const pieChartData = useMemo(() => {
    const { content } = ETFData;
    // 避免資料還沒回來就先render
    if (!content) {
      return content;
    }

    // 將content的資料加上產業類別
    const contentData = content.map((item) => {
      const industry = codeNameData.filter(
        (i) => i.code === parseInt(item.code)
      )[0].industry;
      return { ...item, industry };
    });

    // 將產業類別分類
    const contentRatio = contentData.reduce((acc, cur) => {
      if (!acc[cur.industry]) {
        acc[cur.industry] = cur.percentage;
      } else {
        acc[cur.industry] += cur.percentage;
      }
      return acc;
    }, {});

    // 將產業類別轉成pieChart需要的格式
    const pieChartData = Object.keys(contentRatio).map((item) => {
      return { name: item, value: contentRatio[item] };
    });
    pieChartData.sort((a, b) => b.value - a.value);

    // 只取前五名
    const top5 = pieChartData.slice(0, 5);
    return top5;

  }, [ETFData]);

  const ETFRatioData = useMemo(() => {
    const { content } = ETFData;

    // 避免資料還沒回來就先render
    if (!content) {
      return content;
    }

    const top5 = content.slice(0, 5);
    const otherPercentage = content.slice(5).reduce((acc, cur) => {
      return acc + cur.percentage;
    }, 0);
    const other = {
      name: "其他",
      percentage: otherPercentage.toFixed(2),
    };

    const ans = [...top5, other];
    return ans;
  }, [ETFData]);


  return (
    <div className="   px-4 md:px-6 py-2 md:py-6 mx-auto w-full  max-w-[1000px]">
      <h1 className="mb-4 mx-auto">
        <span className="mx-4 font-bold text-xl">{userId}</span>
        <span className="mx-4 font-bold text-xl">{ETFName}</span>
      </h1>
      <div className="">
        <div className="flex">
          <button className="mx-2 btn" onClick={() => changePeriod(120)}>
            近半年
          </button>
          <button className="mx-2 btn" onClick={() => changePeriod(240)}>
            近一年
          </button>
          <button className="mx-2 btn" onClick={() => changePeriod(960)}>
            近三年
          </button>
        </div>
        <LineChart className="h-full" chartData={chartData} />
      </div>
      <div className="mt-5 ">
        <div className=" moverflow-x-scroll  my-8">
          <table className="table-auto text-center w-full mx-auto shadow-sm px-8">
            <thead>
              <tr>
                <th className="px-4 py-2">期間</th>
                <th className="px-4 py-2">近五年</th>
                <th className="px-4 py-2">近三年</th>
                <th className="px-4 py-2">近一年</th>
                <th className="px-4 py-2">近半年</th>
                <th className="px-4 py-2">近一個月</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">報酬率(%)</td>
                {periodRoR(allData).map((item, index) => {
                  return (
                    <td key={`td_${index}`} className="border px-4 py-2">
                      {item["data"]}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" md:flex mt-4">
          <div className="md:w-1/2 mb-4">
            <h1 className="font-bold h3 py-2 text-center"> 產業占比</h1>
            <PieChart chartData={pieChartData} />
          </div>
          <table className="table-auto text-center mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ETF</th>
                <th className="px-4 py-2">持股比例(%)</th>
              </tr>
            </thead>
            <tbody>
              {ETFRatioData?.map((item) => {
                return (
                  <tr key={item.name}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.percentage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ETFIItem;

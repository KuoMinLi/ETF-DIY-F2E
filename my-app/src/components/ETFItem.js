import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Button } from "flowbite-react";
import { codeNameData} from "../data/codeNameData";
import { ETFData } from "../data/ETFdata";
import { fugleAPIGetAll } from "../api/stockAPI";

const ETFIItem = () => {
  const { userId } = useParams();

  const [day, setDay] = useState(364);
  const ChangeDay = (num) => {
    setDay(num);
  };

  const ETFContentData =[...ETFData].find((item)=> item.code === userId).content;

  const [data, setData] = useState([]);
  useEffect(() => {
    let nowDate = new Date().getTime();
    const fetchData = async () => {
      try {
        const result = await fugleAPIGetAll({
          methods: "get",
          params: {
            symbolId: userId,
            from: FormatDate(nowDate - day * 24 * 60 * 60 * 1000),
            to: FormatDate(nowDate),
          }
        });
        setData(result.data.candles.reverse());
      }
      catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
      
  }, [userId, day]);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Price",
        data: data.map((item) => item.close),
      },
    ],
  };

  const CalculateData = (data) => {
    const period = [
      { name: "一個月", value: 20 },
      { name: "半年", value: 120 },
      { name: "一年", value: 240 },
      // { name: "三年", value: 1080 },
      // { name: "五年", value: 1800 },
    ];
    const newData = period.map((item) => {
      let day = data.length - item.value;
      item["data"] = (([...data].pop()?.close-[...data][day]?.close)/[...data][day]?.close*10000/100).toFixed(2)  || 0;
      return item;
    });
    return newData.reverse();
  }

  const FormatDate = (date) => {
    const reformatDate = new Intl.DateTimeFormat("nu", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(date)
      .split("/")
      .join("-");
    return reformatDate;
  };






  return (
    <div className="w-2/3  h-[800px] overflow-y-scroll px-10 py-8">
      <h1 className="mb-4">
        <span className="mx-4 font-bold text-xl">{userId}</span>
        <span className="mx-4 font-bold text-xl">{codeNameData[userId]}</span>
      </h1>
      <div className="flex">
        <Button className="mx-2" onClick={() => ChangeDay(180)}>
          近半年
        </Button>
        <Button className="mx-2" onClick={() => ChangeDay(360)}>
          近一年
        </Button>
        <Button className="mx-2" onClick={() => ChangeDay(1080)}>
          近三年
        </Button>
      </div>
      <LineChart chartData={chartData} />
      <div className="mt-5">
        
        <table className="table-auto text-center">
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
                <td className="border px-4 py-2">88</td>
                <td className="border px-4 py-2">44</td>
                {CalculateData(data).map((item) => {
                  return (
                    <td key={item.value} className="border px-4 py-2">{item["data"]}</td>
                  )
                })}
              </tr>
          </tbody> 
        </table>
        <div className=" flex ">
          <PieChart chartData={ETFContentData} />
          <table className="table-auto text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">ETF</th>
                <th className="px-4 py-2">持股比例(%)</th>
              </tr> 
            </thead>  
            <tbody> 
              {ETFContentData.map((item) => {
                return (
                  <tr key={item.name}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.percentage}</td>  
                  </tr> 
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default ETFIItem;

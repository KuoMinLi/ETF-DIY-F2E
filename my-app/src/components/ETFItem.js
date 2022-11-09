import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Button } from "flowbite-react";
import { codeNameData} from "../data/codeNameData";
import { ETFData } from "../data/ETFdata";
import { fugleAPIGetFiveYear } from "../api/stockAPI";

let allData = [];
const ETFIItem = () => {
  const { userId } = useParams();
  const ETFName = codeNameData.filter(item=> item.code === userId)[0].name;
  const ChangeDay = (num) => {
    let newData = [...allData].reverse().slice(0, num).reverse();
    setData(newData);
  };

  const ETFContentData =[...ETFData].find((item)=> item.code === userId).content;

  const [data, setData] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const result = await fugleAPIGetFiveYear(userId);
        allData = result[0].concat(result[1], result[2], result[3], result[4]);
        setData(allData.reverse());
      }
      catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
      
  }, [userId]);

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
      { name: "三年", value: 960 },
      { name: "五年", value: 1200 },
    ];
    const newData = period.map((item) => {
      let day = data.length - item.value;
      item["data"] = (([...data].pop()?.close-[...data][day]?.close)/[...data][day]?.close*10000/100).toFixed(2)  || 0;
      return item;
    });
    return newData.reverse();
  }

  



  


  return (
    <div className="w-2/3  h-[800px] overflow-y-scroll px-10 py-8">
      <h1 className="mb-4">
        <span className="mx-4 font-bold text-xl">{userId}</span>
        <span className="mx-4 font-bold text-xl">{ETFName}</span>
      </h1>
      <div className="flex">
        <Button className="mx-2" onClick={() => ChangeDay(120)}>
          近半年
        </Button>
        <Button className="mx-2" onClick={() => ChangeDay(240)}>
          近一年
        </Button>
        <Button className="mx-2" onClick={() => ChangeDay(960)}>
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
                {CalculateData(allData).map((item) => {
                  return (
                    <td key={item.value} className="border px-4 py-2">{item["data"]}</td>
                  )
                })}
              </tr>
          </tbody> 
        </table>
        <div className=" flex mt-4">
          <div className="w-1/2">
            <h1 class="font-bold py-2 text-center" > 產業占比</h1>
            <PieChart chartData={ETFContentData} />
          </div>
         
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

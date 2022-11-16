import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { Button } from "flowbite-react";
import { codeNameData} from "../data/codeNameData";
import { ETFData } from "../data/ETFdata";
import { fugleAPIGetFiveYear } from "../api/stockAPI";
import axios from "axios";

let allData = [];
const ETFIItem = () => {
  const { userId } = useParams();
  const ETFName = codeNameData.filter(item=> item.code === userId)[0].name;
  const ChangeDay = (num) => {
    const newData = [...allData].reverse().slice(0, num).reverse();
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
      const day = data.length - item.value;
      item["data"] = (([...data].pop()?.close-[...data][day]?.close)/[...data][day]?.close*10000/100).toFixed(2)  || 0;
      return item;
    });
    return newData.reverse();
  }

  const adddatanew = () =>{
    axios.post("https://etf-diy-kml.herokuapp.com/twsecode",{
    data: codeNameData.slice(0,1000)
  })
  .then((res)=>{
    console.log(res);
  }
  )
  .catch((err)=>{
    console.log(err);
  }
  )
}

console.log();

  


  return (
    <div className="  md:h-[85vh] md:overflow-y-scroll px-4 md:px-6 py-2 md:py-6 mx-auto max-w-[800px]">
      <h1 className="mb-4">
        <span className="mx-4 font-bold text-xl">{userId}</span>
        <span className="mx-4 font-bold text-xl">{ETFName}</span>
      </h1>
      <div className="">
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
          <Button className="mx-2" onClick={() => adddatanew()}>
            add
          </Button>
        </div>
        <LineChart chartData={chartData} />
      </div>
      <div className="mt-5 ">
        <div className="shadow-sm moverflow-x-scroll  my-8">
          <table className="table-auto text-center w-full ">
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
        </div>   
        <div className=" md:flex mt-4">
          <div className="md:w-1/2 mb-4">
            <h1 className="font-bold py-2 text-center" > 產業占比</h1>
            <PieChart chartData={ETFContentData} />
          </div>
          <table className="table-auto text-center mx-auto">
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

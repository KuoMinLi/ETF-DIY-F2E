import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { codeNameData } from "../data/codeNameData";
import { fugleAPIGetFiveYear } from "../api/stockAPI";
import { getETFListByCode } from "../api/etfAPI";
import { apiDIYPost, apiDIYGet } from "../api/diyAPI";
import periodRoR from "./calculate/periodRoR";
import { useSelector } from "react-redux";
import { getETFLike, addETFLike, deleteETFLike } from "../api/etfAPI";
import DiyItem from "./DIY/DiyItem";
import MySwalToast from "./utilities/MySwalToast";
import { apiDIYDelete } from "../api/diyAPI";

const ETFIItem = (props) => {
  const navigate = useNavigate();
  const { etfId } = useParams();
  const [ETFName, setETFName] = useState(""); // ETF名稱
  const [allData, setAllData] = useState([]); //取回的五年資料
  const [data, setData] = useState([]); // 線圖資料
  const [ETFData, setETFData] = useState([]); // ETF content 資料
  const [isETFLike, setIsETFLike] = useState(false); // 是否已收藏
  const [isDIY, setIsDIY] = useState(false); // 是否為DIY

  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  // 監聽期間變化
  const changePeriod = (num) => {
    const newData = [...allData].reverse().slice(0, num).reverse();
    setData(newData);
  };

  // 取得ETF資料
  useEffect(() => {
    (async () => {
      try {
        const diyETF = await apiDIYGet(token);
        const isDiy = diyETF.data.map((item) => item._id).includes(etfId);
        setIsDIY(isDiy);

        if (isDiy) {
          const res = await DiyItem(etfId, token);
          console.log(res);
          setETFName(res.diyData.name);
          setAllData(res.ETFAvgPriceArr);
          setData(res.ETFAvgPriceArr.reverse());
          setETFData(res.diyData);

          return;
        } else {
          if (ETFName === undefined) {
            navigate("/error");
            return;
          }

          const resultAll = await fugleAPIGetFiveYear(etfId);
          const itemName = codeNameData.filter((item) => item.code === etfId)[0]
            ?.name;
          setETFName(itemName);
          setAllData(resultAll);
          setData(resultAll.reverse());

          const ETFResult = await getETFListByCode(etfId);
          const ETFResultData = ETFResult.data[0];
          console.log(ETFResultData);
          setETFData(ETFResultData);

          const ETFLike = await getETFLike(token);
          if (
            ETFLike.data.map((item) => item.ETFid).includes(ETFResultData._id)
          ) {
            setIsETFLike(true);
          } else {
            setIsETFLike(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [etfId]);

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

  const handleAddLike = () => {
    if (token === null) {
      MySwalToast('請先登入', false);
      navigate("/login");
      return;
    }

    if (isETFLike) {
      (async () => {
        try {
          const res = await deleteETFLike(token, ETFData._id);
          MySwalToast(res.message, true);
          setIsETFLike(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          const res = await addETFLike(token, ETFData._id);
          MySwalToast(res.message, true);
          setIsETFLike(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleEdit = () => {
    navigate(`/etfdiy/${etfId}/edit`);
  };

  const handleDelete = () => {
    (async () => {
      try {
        const res = await apiDIYDelete(etfId, token);
        MySwalToast(res.message, true);
        navigate("/etfdiy");
      } catch (error) {
        console.log(error);
      }
    })();
  };


  return (
    <div className=" pt-8  px-4 md:px-6 md:py-2  mx-auto w-full  max-w-[1000px]">
      {!isDIY && (
        <h1 className="h4 sm:h2 mb-4 mx-auto">
          <span className="mx-4 font-bold ">{etfId}</span>
          <span className="mx-4 font-bold ">{ETFName}</span>
          <span>
            <i
              className={` cursor-pointer text-btn-primary fa-heart text-2xl ${
                isETFLike ? "fa-solid" : "fa-regular"
              }`}
              onClick={() => {
                handleAddLike();
              }}
            ></i>
          </span>
        </h1>
      )}
      {isDIY && (
        <h1 className="h4 sm:h2 mb-4 mx-auto flex justify-between items-center">
          <span className=" mx-4 font-bold "> {ETFName}</span>
          <div className="">
            <button
              className=" btn-sm h5 mx-2 "
              onClick={() => {
                handleEdit();
              }}
            >
              <i className="fa-solid fa-pen mr-2"></i>
              <span>編輯自組</span>
            </button>
            <button
            className=" btn-sm h5  mx-2"
            onClick={() => {
              handleDelete();
            }}
          >
            <i className="fa-solid fa-trash mr-2"></i>
            <span>刪除自組</span>
          </button>
          </div>
          
        </h1>
      )}
      <div className="">
        <div className="flex max-w-[700px] mb-4 ">
          <button className="mx-2 btn-sm" onClick={() => changePeriod(120)}>
            近半年
          </button>
          <button className="mx-2 btn-sm" onClick={() => changePeriod(240)}>
            近一年
          </button>
          <button
            className="mx-2 btn px-4 py-2 rounded-xl"
            onClick={() => changePeriod(960)}
          >
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

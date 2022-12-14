import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { apiDIYGet, apiDIYDelete } from "../api/diyAPI";
import periodRoR from "./calculate/periodRoR";
import { useSelector, useDispatch } from "react-redux";
import { getETFLike, addETFLike, deleteETFLike } from "../api/etfAPI";
import getDiyData from "./getData/getDiyData";
import MySwalToast from "./utilities/MySwalToast";
import lineChartDataFormat from "./chart/lineChartDataFormat";
import pieChartDataFormat from "./chart/pieChartDataFormat";
import getETFData from "./getData/getETFData";
import etfRatio from "./calculate/etfRatio";
import loadingSVG from "./icon/Loading.svg";

const ETFIItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { etfId } = useParams();
  const [ETFName, setETFName] = useState(""); // ETF名稱
  const [allData, setAllData] = useState([]); //取回的五年資料
  const [data, setData] = useState([]); // 線圖資料
  const [ETFData, setETFData] = useState([]); // ETF content 資料
  const [isETFLike, setIsETFLike] = useState(false); // 是否已收藏
  const [isDIY, setIsDIY] = useState(false); // 是否為DIY
  const [isLoad, setIsLoad] = useState(false); // 是否已載入

  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  const isListRender = (value) => {
    return {
      type: "isLISTRENDER",
      payload: value,
    };
  };

  // 監聽期間變化
  const changePeriod = (num) => {
    const newData = [...allData].reverse().slice(0, num).reverse();
    setData(newData);
  };

  // 取得ETF資料
  useEffect(() => {
    window.scrollTo(0, 0);
    if (etfId.split("").length > 6) {
      return;
    }
    (async () => {
      try {
        setIsLoad(true);
        const res = await getETFData(etfId);
        setETFName(res.itemName);
        setAllData(res.resultAll);
        setData(res.resultAll.reverse());
        setETFData(res.ETFResultData);
        setIsLoad(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [etfId, token]);

  useEffect(() => {
    if (token) {
      (async () => {
        const ETFLike = await getETFLike(token);
        if (ETFLike.data.map((item) => item.ETFid).includes(ETFData._id)) {
          setIsETFLike(true);
        } else {
          setIsETFLike(false);
        }
      })();
    }
  }, [token, ETFData._id]);

  // 將Token變化時，重新取得DIY資料
  useEffect(() => {
    if (token) {
      (async () => {
        setIsLoad(true);
        const diyETF = await apiDIYGet(token);
        const isDiy = diyETF.data.map((item) => item._id).includes(etfId);
        setIsDIY(isDiy);

        if (isDiy) {
          setIsLoad(true);
          const res = await getDiyData(etfId, token);
          setETFName(res.diyData.name);
          setAllData(res.ETFAvgPriceArr);
          setData(res.ETFAvgPriceArr.reverse());
          setETFData(res.diyData);
          setIsLoad(false);
          return;
        } else {
          if (ETFName === undefined) {
            navigate("/error");
            return;
          }
        }
      })();
    }
  }, [token, etfId]);

  const handleAddLike = () => {
    if (token === null) {
      MySwalToast("請先登入", false);
      navigate("/login");
      return;
    }

    if (isETFLike) {
      (async () => {
        try {
          const res = await deleteETFLike(token, ETFData._id);
          MySwalToast(res.message, true);
          setIsETFLike(false);
          dispatch(isListRender(true));
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
          dispatch(isListRender(true));
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
        dispatch(isListRender(true));
        navigate("/etfdiy");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className=" relative pt-8  px-4 md:px-6 md:py-2  mx-auto w-full  max-w-[1000px] min-h-[calc(100vh_-_23.5rem)]">
      {isLoad && (
        <>
          <div className="absolute w-full bg-[#EFEFEF] h-full flex items-start justify-center">
            <img className="pt-[20vh] w-[150px] " src={loadingSVG} alt="" />
          </div>
        </>
      )}

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
        <h1 className="h4 sm:h2 mb-4 mx-auto sm:flex justify-between items-center">
          <span className=" mx-4 font-bold "> {ETFName}</span>
          <div className="mt-4 sm:mt-0">
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
        <div className="overflow-x-auto "></div>
      </div>
      <div className="mt-5 ">
        <div className=" overflow-x-auto  pb-8 sm:pb-4">
          <div className="pb-5">
            <LineChart
              className="h-full"
              chartData={lineChartDataFormat(data)}
            />
          </div>

          <table className="table-auto text-center w-full mx-auto shadow-sm  px-8 min-w-[600px]  md:h4">
            <thead>
              <tr>
                <th className="px-4 py-2 md:py-4">期間</th>
                <th className="px-4 py-2 md:py-4">近五年</th>
                <th className="px-4 py-2 md:py-4">近三年</th>
                <th className="px-4 py-2 md:py-4">近一年</th>
                <th className="px-4 py-2 md:py-4">近半年</th>
                <th className="px-4 py-2 md:py-4">近一個月</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 md:py-4">報酬率(%)</td>
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
            <PieChart chartData={pieChartDataFormat(ETFData)} />
          </div>
          <table className="table-auto text-center mx-auto">
            <thead>
              <tr className="h5 sm:h4 ">
                <th className="px-4 py-2">股票名稱</th>
                <th className="px-4 py-2">持股比例(%)</th>
              </tr>
            </thead>
            <tbody className="shadow-md ">
              {etfRatio(ETFData)?.map((item) => {
                return (
                  <tr key={item.name}>
                    <td className="border px-4 py-2 font-medium">
                      {item.name}
                    </td>
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

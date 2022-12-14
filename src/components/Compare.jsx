import { useMemo } from "react";
import { useState, useEffect } from "react";
import periodRoR from "./calculate/periodRoR";
import lineChartDataFormat from "./chart/lineChartDataFormat";
import pieChartDataFormat from "./chart/pieChartDataFormat";
import getETFData from "./getData/getETFData";
import getDiyData from "./getData/getDiyData";
import LineChart from "./LineChart";
import filterDate from "./calculate/filterDate";
import { borderColor, backgroundColor } from "../data/chartColor";
import { getETFList } from "../api/etfAPI";
import { apiDIYGet } from "../api/diyAPI";
import { useSelector } from "react-redux";
import MySwalToast from "./utilities/MySwalToast";
import etfRatio from "./calculate/etfRatio";
import loadingSVG from "./icon/Loading.svg";

const Compare = () => {
  const [inputCode, setInputCode] = useState(""); // 輸入的ETF code
  const [ETFCodes, setETFCodes] = useState([]); // ETF code 資料
  const [allData, setAllData] = useState([]); // 選取個股資料
  const [etfList, setEtfList] = useState([]); // ETF清單
  const [diyList, setDiyList] = useState([]); // DIY清單
  const [isLoad, setIsLoad] = useState(false); // 是否已載入

  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const result = await getETFList();
        setEtfList(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await apiDIYGet(token);
        const data = result.data.map((item) => {
          return {
            ...item,
            id: item._id,
            code: "",
          };
        });
        setDiyList(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  useEffect(() => {
    setIsLoad(true);
    setAllData([]);

    const promises = ETFCodes.map(async (code) => {
      try {
        const diyData = diyList.find((item) => item.name === code);

        let res;
        if (diyData) {
          res = await getDiyData(diyData.id, token);
          const ETFName = res.diyData.name;
          const FiveYearData = res.ETFAvgPriceArr.reverse();
          const RoRData = periodRoR(FiveYearData);
          const LineData = res.ETFAvgPriceArr;
          const ContentData = res.diyData;
          return { ETFName, code, RoRData, LineData, ContentData };
        } else {
          res = await getETFData(code);
          const ETFName = res.itemName;
          const FiveYearData = res.resultAll.reverse();
          const RoRData = periodRoR(FiveYearData);
          const LineData = res.resultAll;
          const ContentData = res.ETFResultData;
          return { ETFName, code, RoRData, LineData, ContentData };
        }
      } catch (error) {
        console.log(error);
      }
    });

    Promise.all(promises).then((results) => {
      setAllData(results);
      setIsLoad(false);
    });
  }, [ETFCodes]);

  const totalLineData = useMemo(() => {
    const allLineDataFormat = allData.map((item, index) => {
      const data = lineChartDataFormat(item.LineData);
      data.datasets[0].label = item.ETFName;
      data.datasets[0].borderColor = borderColor[index];
      data.datasets[0].backgroundColor = backgroundColor[index];
      return data;
    });
    
    return {
      labels: filterDate(allLineDataFormat.map((itme) => itme.labels))[0],
      datasets: allLineDataFormat.map((item) => item.datasets[0]),
    };
  }, [allData]);

  const totalRoRData = useMemo(() => {
    const allRoRData = [...allData].map((item) => item.RoRData);
    const RoRTitle = allRoRData[0]?.map((item) => item.name);
    const RoRData = allRoRData.map((item) => item.map((item) => item.data));

    return RoRTitle?.map((item, index) => [
      item,
      ...RoRData.map((i) => i[index]),
    ]);
  }, [allData]);

  const totalRatio = useMemo(() => {
    const allRatioData = [...allData].map((item) => etfRatio(item.ContentData));

    const totalRatioTitle = [1, 2, 3, 4, 5];
    return totalRatioTitle?.map((item, index) => [
      item,
      ...allRatioData.map((i) => i[index] || 0),
    ]);
  }, [allData]);

  const totalPieData = useMemo(() => {
    const allPieData = [...allData].map((item) => item.ContentData);
    const allPieDataFormat = allPieData.map((item) => pieChartDataFormat(item));
    return allPieDataFormat;
  }, [allData]);

  const handleAddCode = () => {
    if (inputCode === "") {
      MySwalToast("請輸入查詢股票代碼", false);
      return;
    }

    if (ETFCodes.indexOf(inputCode) !== -1) {
      MySwalToast("股票代碼重複", false);
      return;
    }

    if (etfList.map((item) => item.code).indexOf(inputCode) === -1) {
      if (diyList.map((item) => item.name).indexOf(inputCode) === -1) {
        MySwalToast("請輸入正確股票代碼", false);
        return;
      }
    }
    if (ETFCodes.length >= 4) {
      MySwalToast("最多只能比較四支股票", false);
      return;
    }

    setETFCodes([...ETFCodes, inputCode]);
    setInputCode("");
  };

  const handleDeleteCode = (code) => {
    setETFCodes(ETFCodes.filter((item) => item !== code));
  };

  return (
    <>
      <div className="relative max-w-[1232px] mt-7 px-8 pb-8 sm:px-[50px] mx-auto min-h-[calc(100vh_-_24.5rem)]">
        {isLoad && (
          <>
            <div className="absolute z-20 w-full bg-[#EFEFEF] h-full flex items-start justify-center">
              <img className="pt-[20vh] w-[150px] " src={loadingSVG} alt="" />
            </div>
          </>
        )}
        <div className="text-start   mx-auto ">
          <h1 className="h2 font-bold mb-4">ETF 績效比較</h1>
          <h2 className="h3 mb-4">熱門選擇</h2>
          <div className="gap-4 flex flex-col items-start md:space-x-4 md:mb-8  md:inline">
            <button
              className="btn h5 md:h4"
              onClick={() => {
                setETFCodes(["0050", "0056"]);
              }}
            >
              指數VS高股息
            </button>
            <button
              className="btn h5 md:h4"
              onClick={() => {
                setETFCodes(["0053", "0055"]);
              }}
            >
              電子VS金融
            </button>
            <button
              className="btn h5 md:h4"
              onClick={() => {
                setETFCodes(["0050", "0051"]);
              }}
            >
              台灣前百大公司
            </button>
          </div>

          <form className="my-8">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="code-search"
                list="code-list"
                className="h-[54px] md:h-[76px] rounded-full block w-full   p-4 pl-10  h4 md:h3 text-gray-900 border border-gray-500  bg-gray-50  placeholder:h5 md:placeholder:h4"
                placeholder="輸入股票代碼搜尋"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <datalist id="code-list">
                {diyList
                  .filter((item) => item.name.includes(inputCode))
                  .map((etf) => (
                    <option key={etf.id} value={etf.name}>
                      自組ETF
                    </option>
                  ))}
                {etfList
                  .filter(
                    (item) =>
                      item.name.includes(inputCode) ||
                      item.code.toString().includes(inputCode)
                  )
                  .map((etf) => (
                    <option key={etf.id} value={etf.code}>
                      {etf.name}
                    </option>
                  ))}
              </datalist>

              <button
                type="button"
                className="absolute right-1.5 md:right-2.5 bottom-1.5 md:bottom-2.5 btn md:h4  h5"
                onClick={() => {
                  handleAddCode();
                }}
              >
                新增比較項目
              </button>
            </div>
          </form>

          {allData.length !== 0 && (
            <div className="overflow-x-auto">
              <div className=" relative   min-w-[550px] shadow-md sm:rounded-lg ">
                <table className="w-full h5 text-left  text-gray-500 dark:text-gray-400">
                  <thead className="h4 sm:h3 text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                      <th
                        className="sr-only py-3 px-6 bg-L1  dark:bg-gray-800"
                        scope="col"
                      ></th>
                      {allData.map((item) => {
                        return (
                          <td key={item.code} className="">
                            <div className="ml-4 flex items-center space-x-2 pb-2">
                              <i className="fa-solid fa-chart-simple"></i>
                              <div className="flex flex-wrap items-end gap-1 relative">
                                <span>{item.ETFName}</span>
                                <span className="h5">
                                  {item.code.split("")[0] === "0"
                                    ? "[" + item.code + "]"
                                    : ""}
                                </span>
                                <span
                                  className="text-sm font-bold z-10 absolute -top-2 -right-1 cursor-pointer"
                                  onClick={() => {
                                    handleDeleteCode(item.code);
                                  }}
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        colSpan="5"
                        className="py-3 px-6 bg-L2  dark:bg-gray-800"
                      >
                        績效數據
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalRoRData?.map((item) => {
                      return (
                        <tr
                          key={item}
                          className="border-b border-gray-200 dark:border-gray-700 text-d1"
                        >
                          {item.map((i, index) => {
                            return (
                              <td
                                key={index}
                                className={`
                          table-item
                          ${index === 0 && "text-d1 font-bold "}
                          ${item.length < 4 ? "text-left" : "text-center"}
                          `}
                              >
                                {index === 0 ? i : i + "%"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="h-full py-4">
                  <LineChart chartData={totalLineData} />
                </div>
                <table className="w-full h5 text-left text-gray-500 ">
                  <thead className="h4 sm:h3 text-gray-700 uppercase ">
                    <tr>
                      <th
                        scope="col"
                        colSpan="5"
                        className="py-3 px-6 bg-L2  dark:bg-gray-800"
                      >
                        持倉數據
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalRatio?.map((item) => {
                      return (
                        <tr
                          key={item}
                          className="border-b border-gray-200 dark:border-gray-700 text-d1"
                        >
                          {item.map((i, index) => {
                            return (
                              <td
                                key={index}
                                className={`
                            table-item
                            ${index === 0 && "text-d1 font-bold "}
                            ${item.length < 4 ? "text-left" : "text-center" }
                            `}
                              >
                                {index === 0
                                  ? "持倉 Top" + i
                                  : i.name === undefined
                                  ? ""
                                  : i.name +
                                    "[" +
                                    i.code +
                                    "]：" +
                                    i.percentage +
                                    "%"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    <tr className="border-b border-gray-200  text-d1 ">
                      <th
                        className={`table-item ${
                          totalPieData.length < 3 ? "text-left" : "text-center"
                        }`}
                      >
                        產業占比 Top1
                      </th>
                      {totalPieData?.map((item, index) => {
                        return (
                          <td
                            key={index}
                            className={`
                            table-item
                            ${
                              totalPieData.length < 3
                                ? "text-left"
                                : "text-center"
                            }
                            `}
                          >
                            {item[0].name +
                              "： " +
                              item[0].value.toFixed(2) +
                              "%"}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Compare;

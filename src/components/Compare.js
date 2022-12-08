import { useState, useEffect } from "react";
import periodRoR from "./calculate/periodRoR";
import LineChartDataFormat from "./chart/LineChartDataFormat";
import getETFData from "./getData/getETFData";
import LineChart from "./LineChart";

const Compare = () => {
  const [allData, setAllData] = useState([]); //取回的五年資料
  const [data, setData] = useState([]); // 線圖資料

  useEffect(() => {
    (async () => {
      try {
        const res = await getETFData("0050");
        setAllData(res.resultAll);
        setData(res.resultAll.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log( periodRoR(allData))


  return (
    <>
      <div className="max-w-[1232px] mt-7 px-8 pb-8 sm:px-[50px] mx-auto min-h-[calc(100vh_-_24.5rem)]">
        <div className="text-start  min-w-[900px] mx-auto ">
          <h1 className="h2 font-bold mb-4">ETF 績效比較</h1>
          <h2 className="h3 mb-4">熱門選擇</h2>
          <div className="space-x-4 mb-8">
            <button className="btn h4">指數VS高股息</button>
            <button className="btn h4">電子VS金融</button>
            <button className="btn h4">台灣前百大公司</button>
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
                className="h-[68px] sm:h-[76px] rounded-full block w-full   p-4 pl-10 h4 sm:h3 text-gray-900 border border-gray-500  bg-gray-50 focus:ring-btn-primary focus:border-btn-primary "
                placeholder="輸入關鍵字、股票代碼搜尋"
              />

              <button
                type="button"
                className="absolute right-2.5 bottom-2.5 btn h4 "
              >
                新增個股
              </button>
            </div>
          </form>

          <div className="overflow-x-auto relative   shadow-md sm:rounded-lg ">
            <table className="w-full h5 text-left text-gray-500 dark:text-gray-400">
              <thead className="h4 sm:h3 text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    colSpan="4"
                    className="py-3 px-6 bg-L2  dark:bg-gray-800"
                  >
                    績效數據
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    一個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    三個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    六個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66% </td>
                </tr>
              </tbody>
              
            </table>
            <LineChart className="h-full" chartData={LineChartDataFormat(data)} />
            <table className="w-full h5 text-left text-gray-500 dark:text-gray-400">
              <thead className="h4 sm:h3 text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    colSpan="4"
                    className="py-3 px-6 bg-L2  dark:bg-gray-800"
                  >
                    績效數據
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    一個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    三個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    六個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66% </td>
                </tr>
              </tbody>
              
            </table>
            <table className="w-full h5 text-left text-gray-500 dark:text-gray-400">
              <thead className="h4 sm:h3 text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    colSpan="4"
                    className="py-3 px-6 bg-L2  dark:bg-gray-800"
                  >
                    績效數據
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    一個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    三個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    六個月
                  </th>
                  <td className="py-4 px-6">14.66%</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">20.66% </td>
                </tr>
              </tbody>
              
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;

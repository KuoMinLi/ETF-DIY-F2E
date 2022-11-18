import { useState, useEffect } from "react";
import axios from "axios";
import { fugleAPIGetFiveYear } from "../api/stockAPI";

const Compare = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://api.fugle.tw/realtime/v0/intraday/quote?symbolId=0050`
        );
        setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-[1232px] p-2.5 mx-auto h-[80vh]">
        <div className="text-start  mt-10">
          <h1 className="h1 mb-4">績效比較</h1>
          <h2 className="h3 mb-4">熱門選擇</h2>
          <div className="space-x-8 mb-8">
            <button className="btn h4">指數VS高股息</button>
            <button className="btn h4">電子VS金融</button>
            <button className="btn h4">台灣前百大公司</button>
          </div>

          <div class="overflow-x-auto relative shadow-md sm:rounded-lg ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6 bg-btn-primary dark:bg-gray-800">
                    Product name
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple MacBook Pro 17"
                  </th>
                  <td class="py-4 px-6">
                    Sliver
                  </td>
                  <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    Laptop
                  </td>
                  <td class="py-4 px-6">
                    $2999
                  </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Microsoft Surface Pro
                  </th>
                  <td class="py-4 px-6">
                    White
                  </td>
                  <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    Laptop PC
                  </td>
                  <td class="py-4 px-6">
                    $1999
                  </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Magic Mouse 2
                  </th>
                  <td class="py-4 px-6">
                    Black
                  </td>
                  <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    Accessories
                  </td>
                  <td class="py-4 px-6">
                    $99
                  </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Google Pixel Phone
                  </th>
                  <td class="py-4 px-6">
                    Gray
                  </td>
                  <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    Phone
                  </td>
                  <td class="py-4 px-6">
                    $799
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple Watch 5
                  </th>
                  <td class="py-4 px-6">
                    Red
                  </td>
                  <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    Wearables
                  </td>
                  <td class="py-4 px-6">
                    $999
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default Compare;
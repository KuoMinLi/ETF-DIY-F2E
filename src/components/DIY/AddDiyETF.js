import  SliderComponents  from "../utilities/Slider";

import { useState } from "react";


const AddDiyETF = () => {
  
  const [data, setData] = useState(20);
  const [ratio, setRatio] = useState();
  
  const handleData = (num,code) => {

    const newData = {
      ...ratio,
      [code]: num,
    };
    
    setRatio(newData);
  };

  console.log(ratio);

  const code = "2330";
  const code2 = "3333";


  
  return (
    <>
      <div className="max-w-[1232px] p-8 sm:px-24 mx-auto ">
        <div className="text-start  mt-10">
          <h1 className="h1 mb-4">新增自組ETF</h1>
          <h2 className="h3 mb-4">熱門選擇</h2>
          <div className="space-x-8 mb-8">
            <button className="btn h4">台灣TOP5</button>
            <button className="btn h4">電子五哥</button>
            <button className="btn h4">航海王</button>
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
                id="default-search"
                className="h-[68px] sm:h-[76px] rounded-full block w-full   p-4 pl-10 h5 sm:h4 text-gray-900 border border-gray-500  bg-gray-50 focus:ring-btn-primary focus:border-btn-primary "
                placeholder="輸入關鍵字搜尋"
                required
              />
              <button
                type="button"
                className="absolute right-2.5 bottom-2.5 btn "
              >
                Search
              </button>
            </div>
          </form>

          

          {ratio && 
            <>
              <p>{code}:{ratio[code]}</p>
              <p>{code2}:{ratio[code2]}</p>
            </>
            
          }

          <SliderComponents data={data} handleData={handleData} code={code}/>


          <div className="mt-5 ">
            <div className=" overflow-x-auto  my-8">
              <table className="table-auto text-center h4 sm:h3 w-full mx-auto shadow-sm px-8">
                <thead>
                  <tr>
                    <th className="px-4 py-2 sr-only">股票名稱</th>
                    <th className="px-4 py-2">近一個月</th>
                    <th className="px-4 py-2">近半年</th>
                    <th className="px-4 py-2">近一年</th>
                    <th className="px-4 py-2">股票產業</th>
                    <th width="30%" className="px-4 py-2 min-w-[250px]">
                      股票佔比
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 relative">
                      <div className="">
                        <p>台積電</p>
                        <p>2330</p>
                      </div>
                      <button className="absolute top-0 right-0">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </td>
                    <td className="border px-4 py-2">+1.2%</td>
                    <td className="border px-4 py-2">+1.2%</td>
                    <td className="border px-4 py-2">+1.2%</td>
                    <td className="border px-4 py-2">電子</td>
                    <td className="border px-4 py-2">
                      <SliderComponents data={data} handleData={handleData} code={code2}/>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="border px-4 py-2">合計</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center">
                        <div className="w-3/4">
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                              <div
                                style={{ width: "100%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-btn-primary"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/4">100%</div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDiyETF;

import SliderComponents from "../utilities/Slider";
import { fugleAPIGetOneYear } from "../../api/stockAPI";
import { codeNameData } from "../../data/codeNameData";
import periodRoR from "../calculate/periodRoR";
import { useState, useEffect, useMemo } from "react";
import {
  apiDIYPost,
  apiDIYGet,
  apiDIYGetPublic,
  apiDIYPatch,
} from "../../api/diyAPI";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MySwalToast from "../utilities/MySwalToast";
import loadingSVG from "../icon/Loading.svg";

const AddDiyETF = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { etfId } = useParams();
  const defaultPercentage = 20; // 20是預設比例
  const defaultETFName = "自組ETF1"; // 預設ETF名稱

  const [inputName, setInputName] = useState(defaultETFName);
  const [inputCode, setInputCode] = useState("");
  const [targetCode, setTargetCode] = useState(
    JSON.parse(localStorage.getItem("targetCode")) || []
  );
  const [allData, setAllData] = useState([]);
  const [publicETF, setPublicETF] = useState([]);
  const [myDIYETF, setMyDIYETF] = useState([]);
  const [isLoad, setIsLoad] = useState(false); // 是否已載入

  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  const isListRender = (value) => {
    return {
      type: "isLISTRENDER",
      payload: value,
    };
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoad(true);
        const result = await apiDIYGet(token);
        setMyDIYETF(result.data);
        const resPublic = await apiDIYGetPublic();
        setPublicETF(resPublic.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoad(false);
    })();
  }, [token]);

  useEffect(() => {
    if (etfId && myDIYETF.length > 0) {
      const target = myDIYETF.find((item) => item._id === etfId);
      setContent(target);
    }
  }, [etfId, myDIYETF]);

  const setContent = (data) => {
    setAllData([]);
    setInputName(data.name);
    setTargetCode(data.content.map((item) => item.code));
    setRatio(
      data.content.reduce((acc, cur) => {
        acc[cur.code] = cur.percentage;
        return acc;
      }, {})
    );
  };

  const handleClickPublicETF = (_id) => {
    const target = publicETF.find((item) => item._id === _id);
    setContent(target);
  };

  useEffect(() => {
    // 判定是否有值
    if (!targetCode) {
      return;
    }

    // targetCode = ["2330","2331"]
    // 取得股票資料
    const targetCodeData = targetCode.map(async (code) => {
      let codeData = [];
      try {
        const resultAll = await fugleAPIGetOneYear(code);

        // 這邊要reverse，因為fugleAPIGetOneYear取得的資料是由近到遠
        codeData = resultAll.reverse();
      } catch (error) {
        console.log(error);
      }
      return {
        code,
        codeData,
      };
    });

    // 將股票資料存入allData
    Promise.all(targetCodeData).then((data) => {
      setAllData(data);
    });
  }, [targetCode]);

  // 監聽inputCode的提交，並將code加入targetCode
  const handleTargetCode = (code) => {
    if (code === "") {
      return;
    }

    if (targetCode.length >= 5) {
      MySwalToast("最多只能選擇5支股票", false);
      return;
    }

    if (targetCode.includes(code)) {
      MySwalToast("已經有這個股票了", false);
      return;
    } else if (
      codeNameData.filter((item) => item.code === +code).length === 0
    ) {
      MySwalToast("請輸入正確代碼", false);

      return;
    } else {
      const newCode = [...targetCode, code];
      setInputCode("");
      setTargetCode(newCode);
      localStorage.setItem("targetCode", JSON.stringify(newCode));

      // 將比例加入 ratio
      handleRatio(defaultPercentage, code);
    }
  };

  // 監聽個股變化比例
  const [ratio, setRatio] = useState(
    JSON.parse(localStorage.getItem("ratio")) || {}
  );
  const handleRatio = (percentage, code) => {
    const newData = {
      ...ratio,
      [code]: percentage,
    };
    setRatio(newData);
    localStorage.setItem("ratio", JSON.stringify(newData));
  };



  // 監聽個股刪除按鈕
  const handleDelete = (code) => {
    const newCode = targetCode.filter((item) => item !== code);
    handleRatio(0, code);
    setTargetCode(newCode);
    localStorage.setItem("targetCode", JSON.stringify(newCode));
  };

  // 計算總比例
  const totalRatio = useMemo(() => {
    if (!ratio) {
      return 0;
    }
    // 全部轉型成數字
    const totalNumber = Object.values(ratio).map((item) => {
      if (typeof item === "object") {
        return parseInt(item.join());
      } else {
        return item;
      }
    });

    if (totalNumber.length === 0) {
      return 0;
    }
    const total = totalNumber.reduce((a, b) => a + b);
    return total;
  }, [ratio]);

  // 監聽總比例，若總比例不等於100，狀態為true
  const [totalRatioError, setTotalRatioError] = useState(true);
  useEffect(() => {
    //若總比例大於100，則顯示錯誤訊息
    if (totalRatio > 100) {
      MySwalToast("比例超過100%", false);
      setTotalRatioError(true);
    } else if (totalRatio < 100) {
      setTotalRatioError(true);
    } else {
      setTotalRatioError(false);
    }
  }, [totalRatio]);

  // 將股票資料轉換成表格資料
  const tableData = useMemo(() => {
    const ans = allData.map((item) => {
      const { code, codeData } = item;
      const { name, industry } = codeNameData.filter(
        (i) => i.code === parseInt(code)
      )[0];
      let percentage = ratio[code]; //預設比例
      
       // 將比例從陣列轉換成數字
       if (typeof percentage === "object") {
        percentage = parseInt(percentage.join());
      }

      const codeRoR = periodRoR(codeData);
      return {
        name,
        code,
        industry,
        percentage,

        // RoR代表的是這個股票的報酬率(RoR交易日)
        RoR20: codeRoR[4].data,
        RoR120: codeRoR[3].data,
        RoR240: codeRoR[2].data,
      };
    });
    return ans;
  }, [allData, ratio]);

  const [diyData, setDiyData] = useState([]);

  // 監聽資料，將資料存入diyData
  useEffect(() => {
    const content = tableData.map((item) => {
      const { name, code } = item;
      let { percentage } = item;

      // 將比例從陣列轉換成數字
      if (typeof percentage === "object") {
        percentage = parseInt(percentage.join());
      }

      return {
        name,
        code,
        percentage,
      };
    });

    const data = {
      name: inputName,
      content,
    };
    setDiyData(data);
  }, [tableData, inputName]);

  // 監聽提交按鈕，送出資料
  const handleSubmit = () => {
    if (totalRatioError) {
      MySwalToast("比例不等於100%", false);
      return;
    }

    if (inputName === "") {
      MySwalToast("請輸入名稱", false);
      return;
    }

    (async () => {
      try {
        const result = etfId
          ? await apiDIYPatch(etfId, diyData, token)
          : await apiDIYPost(diyData, token);

        MySwalToast("新增成功", true);
        resetForm();
        dispatch(isListRender(true));
        navigate(`/etfdiy/${result.data._id}`);
      } catch (error) {
        MySwalToast(error.response.data.message, false);
      }
    })();
  };

  const resetForm = () => {
    setTargetCode([]);
    setRatio({});
    setInputName("");
    localStorage.removeItem("targetCode");
    localStorage.removeItem("ratio");
  };

  return (
    <>
      <div className="relative pt-8  px-4 md:px-6 md:py-2  mx-auto w-full  max-w-[1000px]  min-h-[calc(100vh_-_8.6rem)] ">
        {isLoad && (
          <>
            <div className="absolute z-20 w-full bg-[#EFEFEF] h-full flex items-start justify-center">
              <img className="pt-[20vh] w-[150px] " src={loadingSVG} alt="" />
            </div>
          </>
        )}
        <div className="text-start ">
          <h1 className="h2 font-bold mb-4">
            {etfId ? "修改自組ETF" : "新增自組ETF"}
          </h1>
          <form action="" className="my-4">
            <label className="h4 sm:h3 " htmlFor="">
              請輸入自組ETF名稱
            </label>
            <input
              type="text"
              className="w-full h4 sm:h3 pl-10 mt-2 rounded-full p-2 text-gray-900 border border-gray-500  bg-gray-50 focus:ring-btn-primary focus:border-btn-primary"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <p className="text-red-500 px-8 pt-1"></p>
          </form>
          <h2 className="h3 mb-4">熱門選擇</h2>
          <ul className=" mb-8 flex flex-wrap gap-2">
            {publicETF.map((item) => {
              const { name, _id } = item;
              return (
                <li key={_id}>
                  <button
                    className="btn h5 md:h4 "
                    onClick={() => {
                      handleClickPublicETF(_id);
                    }}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>

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
                placeholder="輸入關鍵字、股票代碼搜尋"
                onChange={(e) => setInputCode(e.target.value)}
                value={inputCode}
              />
              <datalist id="code-list">
                {codeNameData
                  .filter(
                    (item) =>
                      item.name.includes(inputCode) ||
                      item.code.toString().includes(inputCode)
                  )
                  .map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
              </datalist>

              <button
                type="button"
                className="absolute right-1.5 md:right-2.5 bottom-1.5 md:bottom-2.5 btn md:h4  h5 "
                onClick={() => handleTargetCode(inputCode)}
              >
                新增個股
              </button>
            </div>
          </form>
          {targetCode.length > 0 && (
            <div className="mt-5  ">
              <div className=" overflow-x-auto my-8">
                <table className="min-w-[900px]  table-auto text-center h4 sm:h3 w-full mx-auto shadow-sm px-8">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 min-w-[140px]">股票名稱</th>
                      <th className="px-4 py-2 min-w-[120px]">近一月</th>
                      <th className="px-4 py-2 min-w-[120px]">近半年</th>
                      <th className="px-4 py-2 min-w-[120px]">近一年</th>
                      <th className="px-4 py-2 min-w-[140px]">股票產業</th>
                      <th width="30%" className="px-4 py-2 min-w-[250px]">
                        股票佔比
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      const {
                        name,
                        code,
                        RoR20,
                        RoR120,
                        RoR240,
                        industry,
                        percentage,
                      } = item;
                      return (
                        <tr key={index}>
                          <td className="border px-4 py-2 relative">
                            <div className="">
                              <p>{name}</p>
                              <p>{code}</p>
                            </div>
                            <button
                              className="absolute top-0 right-0"
                              onClick={() => {
                                handleDelete(code);
                              }}
                            >
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
                          <td className="border px-4 py-2">{RoR20}%</td>
                          <td className="border px-4 py-2">{RoR120}%</td>
                          <td className="border px-4 py-2">{RoR240}%</td>
                          <td className="border px-4 py-2">{industry}</td>
                          <td className="border px-4 py-2">
                            <SliderComponents
                              percentage={percentage}
                              handleRatio={handleRatio}
                              code={code}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="h-[76px]">
                      <td className="border px-4 py-2 ">合計</td>
                      <td className="border px-4 py-2"></td>
                      <td className="border px-4 py-2"></td>
                      <td className="border px-4 py-2"></td>
                      <td className="border px-4 py-2"></td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center gap-4 items-center">
                          <div className="w-full max-w-[200px]">
                            <div className="relative pt-1">
                              <div className=" overflow-hidden h-2 text-xs flex rounded-full bg-[#ab8dff]">
                                <div
                                  style={{ width: totalRatio + "%" }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-btn-primary"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="">{totalRatio}%</div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn h4"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  儲存自組ETF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddDiyETF;

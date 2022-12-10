import { Outlet, useNavigate, useParams, Link } from "react-router-dom";
import { getETFList } from "../api/etfAPI";
import { useEffect, useState } from "react";
import ETFListAddRoR from "./calculate/ETFListAddRoR";
import { categoryList } from "../data/categoryList";
import { useSelector, useDispatch } from "react-redux";
import { getETFLike } from "../api/etfAPI";
import MySwalChangePage from "./utilities/MySwalChangePage";

const ETFListView = () => {
  const navigate = useNavigate();
  const { category, etfId } = useParams();
  const handleETFcode = (code) => {
    navigate(`/${category}/${code}`);
  };

  const [ETFList, setETFList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryRoR, setCategoryRoR] = useState([]);

  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  const isListRenderstate = useSelector((state) => state.ListRender);
  const [isListRender, setIsListRender] = useState(isListRenderstate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isListRender) {
      const isListRenderfun = (value) => {
        return {
          type: "isLISTRENDER",
          payload: value,
        };
      };
      dispatch(isListRenderfun(false));
    }
  }, [isListRender, dispatch]);

  // const categoryList = {
  //   index: "指數型",
  //   topic: "主題型",
  //   dividend: "高股息",
  //   liker: "我的收藏",
  // }

  // 若不屬於上述四種類別，則導回首頁
  if (categoryList[category] === undefined) {
    navigate("/error");
  }

  // 取得ETF清單
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getETFList();
        setETFList(data);
      } catch (error) {
        console.log(error);
      }
    })();

    // 若為我的收藏，但尚未登入，則導回登入頁面
    if (category === "liker" && token === null) {
      MySwalChangePage("請先登入會員", navigate);
    }
  }, [token]);

  // 取得各類別的RoR
  useEffect(() => {
    (async () => {
      if (category === "liker" && token !== null) {
        try {
          const likeList = await getETFLike(token);
          const likeCodeList = likeList.data.map((item) => {
            const ietmId = ETFList.filter((ETF) => ETF.id === item.ETFid)[0];
            return ietmId;
          });

          if (
            likeCodeList.length === 0 ||
            likeCodeList.includes(undefined) === true
          ) {
            return;
          }
          setCategoryData(likeCodeList);
          setIsListRender(isListRenderstate);
          navigate(`/${category}/${likeCodeList[0].code}`);
        } catch (error) {
          console.log(error);
        }
      } else {
        const categoryData = filterCategory(ETFList, categoryList[category]);
        setCategoryData(categoryData);

        if (categoryData.length === 0) {
          return;
        }
        navigate(`/${category}/${categoryData[0].code}`);
      }
    })();
  }, [ETFList, category, isListRenderstate]);

  // 依類別取出ETF資料
  const filterCategory = (data, id) => {
    const ans = data.filter((item) => item.category === id);
    return ans;
  };

  // 依資料計算出ROR
  useEffect(() => {
    (async () => {
      try {
        const categoryRoR = await ETFListAddRoR(categoryData);
        setCategoryRoR(categoryRoR);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryData]);

  // 依照數值返回對應icon
  const icon = (data) => {
    let icon = "";
    if (data > 0) {
      icon = "▲";
    } else if (data < 0) {
      icon = "▼";
    } else {
      icon = "-";
    }
    return icon;
  };

  const iconCategory = [
    {
      category: "index",
      name: "指數型",
      icon: "fa-chart-simple",
    },
    {
      category: "topic",
      name: "主題型",
      icon: "fa-microchip",
    },
    {
      category: "dividend",
      name: "高股息",
      icon: "fa-sack-dollar",
    }
  ] 

  return (
    <>
      <div className="lg:flex mx-auto justify-between mt-4   px-3  max-w-[1296px] min-h-[calc(100vh_-_23.5rem)]">
        <div className=" md:w-1/3  lg:w-1/4">
          <ul className="flex md:block -mx-1 flex-wrap">
            <li className="px-1 py-2 w-1/3 md:w-auto">
              <div className="p-2   mx-auto max-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  {iconCategory.map((item) => {
                    return (
                      <Link
                        to={`/${item.category}`}
                        className={`${
                          category === item.category
                            ? "text-d1 font-black"
                            : "text-d2"
                        }`}
                      >
                      <div className="flex flex-col items-center">
                        <i className={`fa-solid ${item.icon}`}></i>
                        <p className="">{item.name}</p>
                      </div>
                      </Link>
                    );
                  }
                  )}
                </div>
              </div>
            </li>
            {categoryRoR.map((item) => {
              return (
                <li className="px-1 py-2 w-1/3 md:w-auto" key={item.id}>
                  <div
                    className={`cursor-pointer p-2 border-2  shadow-lg hover:shadow-xl text-d2 bg-gray-100 transition duration-300 rounded-lg  mx-auto max-w-[200px] 
                      ${
                        item.code === etfId
                          ? "border-[#345FF8] font-bold text-d1 "
                          : ""
                      }`}
                    onClick={() => handleETFcode(item.code)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span>{item.code}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>近一個月</span>
                      <span
                        className={`
                          font-bold text-xl 
                          ${
                            item.changePercent > 0
                              ? " text-red-500"
                              : " text-green-500"
                          }
                        `}
                      >
                        {item.changePercent}% {icon(item.changePercent)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default ETFListView;

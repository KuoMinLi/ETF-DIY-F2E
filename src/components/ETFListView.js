import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getETFList } from "../api/etfAPI";
import { useEffect, useState } from "react";
import ETFListAddRoR from "./calculate/ETFListAddRoR";
import { categoryList } from "../data/categoryList";

const ETFListView = () => {
  let navigate = useNavigate();
  const { category, userId } = useParams();
  const handleETFcode = (code) => {
    navigate(`/${category}/${code}`);
  };
  
  const [ETFList, setETFList] = useState([]);
  const [categoryRoR, setCategoryRoR] = useState([]);
  
  // const categoryList = {
  //   index: "指數型",
  //   topic: "主題型",
  //   dividend: "高股息",
  //   lover: "我的收藏",
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
  }, []);

  // 取得各類別的RoR
  useEffect(() => {
    (async () => {
      try {       
        const categoryData = filterCategory(ETFList, categoryList[category]);
        const categoryRoR = await ETFListAddRoR(categoryData);
        console.log(categoryData)
        setCategoryRoR(categoryRoR);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [ETFList, category]);

  
  // 依類別取出ETF資料
  const filterCategory = (data , id) => {
    const ans = data.filter((item) => item.category === id);
    return ans;
  };

  
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

  return (
    <>
      <div className="lg:flex mx-auto justify-between mt-4  max-w-[1280px] ">
        <div className=" md:w-1/3  lg:w-1/4">
          <ul className="flex md:block -mx-1 flex-wrap">
            {categoryRoR.map((item) => {
              return (
                <li className="px-1 py-2 w-1/3 md:w-auto" key={item.id}>
                  <div
                    className={
                      "cursor-pointer p-2 border-2 border-gray-400  mx-auto max-w-[200px] " +
                      (item.code === userId ? "bg-gray-500 text-" : "bg-gray-100")
                    }
                    onClick={() => handleETFcode(item.code)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span>{item.code}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>近一個月</span>
                      <span className={"font-bold text-xl"
                      + (item.changePercent > 0 ? " text-red-500" : " text-green-500")}>
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

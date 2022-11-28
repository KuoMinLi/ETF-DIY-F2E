import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getETFList } from "../api/etfAPI";
import { useEffect, useState, useMemo } from "react";
import { fugleAPIGetOneMonth } from "../api/stockAPI";
import classNames from "classnames";
import { useCallback } from "react";

const ETFIndex = () => {
  let navigate = useNavigate();
  const { userId } = useParams();
  const handleETFcode = (code) => {
    navigate(`/etfindex/${code}`);
  };

  const [ETFList, setETFList] = useState([]);

  const category = "指數型";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getETFList();
        console.log(data);
        const categoryData = filterCategory(data);
        const ETFListData = await ETFListAddRoR(categoryData);
        setETFList(ETFListData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filterCategory = (data) => {
    const ans = data.filter((item) => item.category === category);
    return ans;
  };

  const ETFListAddRoR = async (data) => {
    const ans = await Promise.all(
      data.map(async (item) => {
        const { code } = item;
        const allPrice = await fugleAPIGetOneMonth(code);

        // 計算漲跌幅
        const nowPrice = allPrice[0].close;
        const lastPrice = allPrice[allPrice.length - 1].close;
        const change = nowPrice - lastPrice;
        const changePercent = +((change / lastPrice) * 100).toFixed(2);
        return { ...item, changePercent };
      })
    );
    return ans;
  };

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
            {ETFList.map((item) => {
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

export default ETFIndex;

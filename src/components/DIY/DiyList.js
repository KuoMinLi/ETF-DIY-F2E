import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { apiDIYPost, apiDIYGet } from "../../api/diyAPI";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import MySwalChangePage from "../utilities/MySwalChangePage";

const DiyList = () => {
  const navigate = useNavigate();
  const { etfId } = useParams();
  const [diyList, setDiyList] = useState([]);
  const token =
    useSelector((state) => state.Token) || localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      MySwalChangePage("請先登入會員", navigate);
    }
  }, [token, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const result = await apiDIYGet(token);
        setDiyList(result.data);
        if (result.data.length > 0) {
          navigate(`/etfdiy/${result.data[0]._id}`);
        } else {
          navigate(`/etfdiy/etfadddiy`);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div className="lg:flex mx-auto justify-between mt-4 px-3  max-w-[1296px] min-h-[calc(100vh_-_23.5rem)]">
        <div className="  lg:w-1/4">
          <ul className="flex lg:block -mx-1 flex-wrap">
            {diyList.map((item) => {
              return (
                <li key={item._id} className="px-1 py-2 w-1/3 lg:w-auto">
                  <Link
                    to={`${item._id}`}
                    className={`block cursor-pointer  border-2  shadow-lg hover:shadow-xl text-d2 bg-gray-100 transition duration-300 rounded-lg  mx-auto max-w-[200px] 
                      ${item._id === etfId ? "border-[#345FF8] font-bold text-d1 " : ""}`}
                    
                  >
                    <div className="p-4 flex items-center gap-4 ">
                      <h3 className=" uppercase">{item.name}</h3>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li  className="px-1 py-2 w-1/3 lg:w-auto">
              <Link
                to="etfadddiy"
                className="block  bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 mx-auto max-w-[200px]"
              >
                <div className="p-4 flex items-center   gap-4">
                  <h3 className="text-gray-700 uppercase">新增</h3>
                  <span className="text-gray-500 ">
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DiyList;

import { Outlet, Link } from "react-router-dom";
import { apiDIYPost, apiDIYGet } from "../../api/diyAPI";
import { useSelector} from "react-redux";
import { useState, useEffect, useMemo } from "react";





const DiyList = () => {

  const [diyList, setDiyList] = useState([]);
  const token = useSelector(state => state.Token) || localStorage.getItem("token");

  useEffect(() => {
    (async() => {
      try{
        const result = await apiDIYGet(token);
        console.log(result);
        setDiyList(result.data);
      } catch (err){
        console.log(err);
      }
    })();
  }, []);


  const handleDIY = (id) => {
    console.log(id);
  }


  return (
    <>
       <div className="lg:flex mx-auto justify-between mt-4  max-w-[1280px] ">
        <div className=" md:w-1/3  lg:w-1/4">
          <ul className="flex md:block -mx-1 flex-wrap">
            {diyList.map((item) => {
              return (
                <li
                  key={item._id}
                  className="w-1/2 md:w-full px-1 mb-2"
                >
                  <Link
                    to={`${item._id}`}
                    className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <div className="p-4 flex items-center gap-4">
                      <h3 className="text-gray-700 uppercase">{item.name}</h3>
                      <span className="text-gray-500 "><i className="fa-solid fa-pen"></i></span>
                    </div>
                  </Link>
                </li>
              );
            }
            )}
            <li
              key="new"
              className="w-1/2 md:w-full px-1 mb-2"
            >
              <Link
                to="etfadddiy"
                className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="p-4 flex items-center gap-4">
                  <h3 className="text-gray-700 uppercase">新增</h3>
                  <span className="text-gray-500 "><i className="fa-solid fa-plus"></i></span>
                </div>
              </Link>
            </li>  
          </ul>
        </div>
        <Outlet handleDIY={handleDIY}/>
      </div>
    </>
  );
}

export default DiyList;


import { Outlet } from "react-router-dom";

const DiyList = () => {
  return (
    <>
       <div className="lg:flex mx-auto justify-between mt-4  max-w-[1280px] ">
        <div className=" md:w-1/3  lg:w-1/4">
          <ul className="flex md:block -mx-1 flex-wrap">
            <li className="w-1/2 md:w-full px-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">近一個月</span>
                  <span className="font-bold text-xl text-red-500">+1.2% ▲</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">近三個月</span>
                  <span className="font-bold text-xl text-red-500">+1.2% ▲</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default DiyList;


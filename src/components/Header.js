import { Navbar, Dropdown } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.Token);

  const logoutToken = () => {
    return {
      type: "LOGOUT",
    }
  }

  console.log('header', token)

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const isShow = show ? "block" : "hidden";

  return (
    <>
      {/* <div className="bg-[#191919] ">
        <div className="max-w-[1280px] mx-auto flex items-baseline  justify-between p-10  text-[28px]">
          <div className=" w-[136.5px] leading-10   font-black text-btn-primary cursor-pointer">
            ETF自由配
          </div>
          <div className="text-L2 h3 flex space-x-5">
            <div className="">ETF專區</div>
            <div className="">自組ETF</div>
            <div className="">績效比較</div>
          </div>
          <div className="text-white sm:hidden">
            <i className="fa-solid fa-bars"></i>
          </div>
          <button className="md:order-2  h4 text-L1 bg-btn-primary py-3 px-6  rounded-full ">
            登入/註冊
          </button>
        </div>
      </div> */}
      <div className="bg-[#191919] py-[12.5px] ">
        <Navbar className=" bg-transparent max-w-[1232px] mx-auto flex items-baseline  justify-between  ">
          <Navbar.Brand onClick={() => navigate("/")}>
            <span className=" text-[28px] w-[136.5px] leading-10  font-black text-btn-primary cursor-pointer">
              ETF自由配
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <div className="flex md:order-2">
          {
            !token && <Link
              className="h4 text-L1 bg-btn-primary py-3 px-6 rounded-full"
              to="/login"
            >
              登入/註冊
            </Link>
          }
          {
            token && <Link
              className="h4 text-L1 bg-btn-primary py-3 px-6 rounded-full"
              onClick={() => { dispatch(logoutToken()) }}

              to="/"
            >
              登出
            </Link>
          }
          </div>
          <Navbar.Collapse>
            <div className="text-L2 h3 flex ">
              <Dropdown arrowIcon={false} inline={true} label={"ETF專區"}>
                <li className="flex items-center justify-start py-2 px-4 h4 text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => navigate("/etfindex/0050")}>
                  指數型
                </li>
                <li className="flex items-center justify-start py-2 px-4 h4 text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => navigate("/etfindex")}>
                 高股息
                </li>
                <li className="flex items-center justify-start py-2 px-4 h4 text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => navigate("/etfindex")}>
                低波動
                </li>
                <li className="flex items-center justify-start py-2 px-4 h4 text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => navigate("/etfindex")}>
                主題型
                </li>
              </Dropdown>
            </div>
            <div className="text-L2 h3 flex space-x-5 cursor-pointer" onClick={() => navigate("/etfindex")}>自組ETF</div>
            <div className="text-L2 h3 flex space-x-5 cursor-pointer" onClick={() => navigate("/compare")}>績效比較</div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;

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


  const [menushow, setMenuShow] = useState(false);
  const handleMenuShow = () => {
    setMenuShow(!menushow);
  };
  const isMenuShow = menushow ? "max-h-450px bg-L1 p-8" : "max-h-[0px]";

  const [etfListShow, setEtfListShow] = useState(false);
  const handleEtfListShow = () => {
    setEtfListShow(!etfListShow);
  };
  const isEtfListShow = etfListShow ? "block" : "hidden";

  return (
    <>
      <nav className="bg-d1 ">
        <div className="max-w-[1296px] mx-auto flex items-baseline  justify-between px-5 py-[25px] md:px-10 md:py-7  text-[28px]">
          <h1 className=" w-[140px] leading-10   font-black text-btn-primary">
            <Link to="/">ETF自由配</Link>
          </h1>
          <span className="text-white md:hidden order-last cursor-pointer"
          onClick={ () => {handleMenuShow()}}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <ul className={`text-L2 h3 md:flex  item-basline 
          px-8 rounded-lg  md:space-x-5 overflow-hidden right-5 
          md:overflow-visible top-24 w-[375px] md:w-auto md:top-0  z-20 md:z-0 absolute
          transition-all duration-300
          md:relative md:max-h-fit ${isMenuShow} `}>
            <span>
              <i className="md:hidden fa-solid fa-times absolute right-5 top-5 cursor-pointer md:hidden"></i>
            </span>
            <li className=" md:hidden w-[140px] leading-10   font-black text-btn-primary">
              <Link to="/">ETF自由配</Link>
            </li>
            <li className="cursor-pointer relative " >  
              <Link className="hover:text-L1 " aria-disabled onClick={()=>{ handleEtfListShow() }}>ETF專區</Link>
              <ul className={`rounded-lg md:absolute p-5 w-36  md:z-20 md:top-10 md:left-0   md:bg-d3 ${isEtfListShow} `} > 
                <li><Link to="/etfindex
                ">指數型</Link></li>
                <li><Link>主題型</Link></li>
                <li><Link>高股息</Link></li>
                <li><Link>我的收藏</Link></li>
              </ul>
            </li>
            <li className="hover:text-L1">
              <Link to="/etfadddiy">自組ETF</Link>
            </li>
            <li className="hover:text-L1">
            <Link to= "/compare">績效比較</Link>
            </li>
          </ul>
          <div className="hidden md:block">
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
        </div>
      </nav>
    </>
  );
};

export default Header;

import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.Token) || localStorage.getItem('token');

  const logoutToken = () => {
    localStorage.removeItem('token');
    return {
      type: "LOGOUT",
    }
  }


  const handleReset = () => {
    setMenuShow(false);
    setEtfListShow(false);
  }

  const [menushow, setMenuShow] = useState(false);
  const handleMenuShow = () => {
    setMenuShow(!menushow);
  };
  const isMenuShow = menushow ? "max-h-fit bg-L1 p-8" : "max-h-[0px]";

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
            <Link to="/"  onClick={ () => {handleMenuShow()}} >ETF自由配</Link>
          </h1>
          <span className="text-white md:hidden order-last cursor-pointer"
          onClick={ () => {handleMenuShow()}}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <ul className={`text-d1 md:text-L2 h3 md:flex  item-center 
          px-8 rounded-lg  md:space-x-5 overflow-hidden md:overflow-visible right-5 md:right-0
           top-24 md:-top-7  md:w-auto  z-20  absolute 
          md:transition-all md:duration-300 w-[375px] 
          md:relative  ${isMenuShow} `}>
            <span>
              <i className="md:hidden fa-solid fa-times absolute right-5 top-5 cursor-pointer" onClick={ () => {handleMenuShow()}}></i>
            </span>
            <li className=" md:hidden w-[140px] leading-10   font-black text-btn-primary">
              <Link to="/" onClick={() => {handleReset()}}>ETF自由配</Link>
            </li>
            <li className="cursor-pointer relative " >  
              <Link className="hover:font-bold md:hover:text-L1 " aria-disabled onClick={()=>{ handleEtfListShow() }}>ETF專區</Link>
              <ul className={`rounded-lg md:absolute p-5 w-36  z-20 md:top-10 md:left-0   md:bg-d3  ${isEtfListShow} `} > 
                <li className="hover:font-bold md:hover:text-L1"><Link to="/index/0050" onClick={() => {handleReset()}}>指數型</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link to="/topic/00881" onClick={() => {handleReset()}}>主題型</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link to="/dividend/0056" onClick={() => {handleReset()}}>高股息</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link onClick={() => {handleReset()}}>我的收藏</Link></li>
              </ul>
            </li>
            <li className="hover:font-bold md:hover:text-L1">
              <Link to="/etfadddiy" onClick={() => {handleReset()}}>自組ETF</Link>
            </li>
            <li className="hover:font-bold md:hover:text-L1">
            <Link to= "/compare" onClick={() => {handleReset()}}>績效比較</Link>
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

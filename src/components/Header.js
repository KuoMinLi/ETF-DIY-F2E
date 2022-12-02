import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const useDocumentEventListener = (eventName, handler, options) => {
  useEffect(() => {
    document.addEventListener(eventName, handler, options);
    return () => document.removeEventListener(eventName, handler, options);
  }, [eventName, handler, options]);
}

const Header = () => {
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

  const ref = useRef(null);

  useDocumentEventListener('click', (e) => {
    if (ref.current && ref.current.contains(e.target)) {

      if (e.target.nodeName === "A") {
        handleReset();
      }
    }
  }, false);

  return (
    <>
      <nav className="bg-d1 " >
        <div className="max-w-[1296px] mx-auto flex items-baseline  justify-between px-5 py-[25px] md:px-10 md:py-7  text-[28px]">
          <h1 className=" w-[140px] leading-10   font-black text-btn-primary">
            <Link to="/" >ETF自由配</Link>
          </h1>
          <span className="text-L1 md:hidden order-last cursor-pointer"
          onClick={ () => {handleMenuShow()}}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <ul className={`text-d1 md:text-L2 h3 md:flex  item-center 
          px-10 rounded-lg  md:space-x-5 overflow-hidden md:overflow-visible right-5 md:right-0
           top-24 md:-top-7  md:w-auto  z-20  absolute 
          md:transition-all md:duration-300 w-[375px] 
          md:relative  ${isMenuShow} `} ref={ref}>
            <span>
              <i className="md:hidden fa-solid fa-times absolute right-10 top-10 cursor-pointer" onClick={ () => {handleMenuShow()}}></i>
            </span>
            <li className=" md:hidden w-[140px] leading-10  pt-10 font-black text-btn-primary">
              <Link to="/" >ETF自由配</Link>
            </li>
            <li className="cursor-pointer relative " >  
              <span className="hover:font-bold md:hover:text-L1 cursor-pointer "  onClick={()=>{ handleEtfListShow() }}>ETF專區</span>
              <ul className={`rounded-lg md:absolute p-5 w-36  z-20 md:top-10 md:left-0   md:bg-d3  ${isEtfListShow} `} > 
                <li className="hover:font-bold md:hover:text-L1"><Link to="/index/0050" >指數型</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link to="/topic/00881" >主題型</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link to="/dividend/0056" >高股息</Link></li>
                <li className="hover:font-bold md:hover:text-L1"><Link >我的收藏</Link></li>
              </ul>
            </li>
            <li className="hover:font-bold md:hover:text-L1">
              <Link to="/etfadddiy">自組ETF</Link>
            </li>
            <li className="hover:font-bold md:hover:text-L1">
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

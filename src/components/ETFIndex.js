import { Outlet,  useNavigate } from "react-router-dom";
import { ETFData } from "../data/ETFdata";

const ETFIndex = () => {
  let navigate = useNavigate();
  const handleETFcode = (code) => {
    navigate(`/etfindex/${code}`);
  };

  const icon = (data) => {
    let icon = "";
    if (data >0) {
      icon = "▲";
    } else if (data < 0) {
      icon = "▼";
    } else {
      icon = "-";
    } 
    return icon; 
  }


  return (
    <>
      <div className="lg:flex mx-auto justify-between mt-4  max-w-[1280px] md:h-[85vh]">
        <div className=" md:w-1/3  lg:w-1/4">
          <ul className="flex md:block -mx-1 flex-wrap">
            {ETFData.map((item,index)=>{
              return(
                  <li className="px-1 py-2 w-1/3 md:w-auto" key={index}>
                    <div className="cursor-pointer p-2 border-2 border-gray-400  mx-auto max-w-[200px]" onClick={()=> handleETFcode(item.code)}>
                      <div className="flex justify-between items-center mb-2">
                        <span>{item.code}</span>
                        <span>{item.name}</span>
                      </div>
                      <div  className="flex justify-between items-center">
                        <span>近一個月</span>
                        <span className="font-bold text-xl">
                           {14.66}% {icon(14.66)}
                          
                        </span>
                      </div>

                    </div>
                  </li>
              )
            })}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ETFIndex;
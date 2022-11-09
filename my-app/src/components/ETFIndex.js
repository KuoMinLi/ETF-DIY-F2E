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
      <div className="container flex mx-auto justify-around mt-4 px-8 h-[800px]">
        <div className="w-1/3  lg:w-1/4">
          <ul>
            {ETFData.map((item,index)=>{
              return(
                  <li className="py-2" key={index}>
                    <div className="cursor-pointer p-2 border-2 border-gray-400 w-1/2 mx-auto max-w-[200px]" onClick={()=> handleETFcode(item.code)}>
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
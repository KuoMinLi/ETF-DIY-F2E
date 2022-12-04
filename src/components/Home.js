import star from './icon/ic_star.png' ;
import { getETFList } from '../api/etfAPI';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { categoryList } from '../data/categoryList';


const Home = () => {
  const navigate = useNavigate();
  const [etfList, setEtfList] = useState([]);
  const [inputCode, setInputCode] = useState('');
  
  useEffect(() => {
    (async() => {
      try {
        const result = await getETFList();
        setEtfList(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  const handleClick = () => {
    const { category } = etfList.filter((item) => {
      return item.code === inputCode
    })[0];
    Object.keys(categoryList).forEach((key) => {
      if (categoryList[key] === category) {
        navigate(`/${key}/${inputCode}`);
      }
    });
  }

  return (
    <>
      <section
        className=" w-full relative h-[265px] sm:h-[700px]"
        style={{
          background:
            "linear-gradient(264.94deg, rgba(114, 79, 255, 0.4) -2.73%, rgba(0, 0, 0, 0) 32.68%), linear-gradient(98.19deg, rgba(113, 152, 255, 0.5) -6.94%, rgba(47, 47, 47, 0) 28.99%), #050B2A",
        }}
      >
        <div
          className=" absolute opacity-75 h-full  
          bg-[url('https://i.imgur.com/so1wjrK.png')]
          sm:bg-[url('https://i.imgur.com/xzlLWH8.png')]
          bg-no-repeat bg-center bg-cover w-full "
        ></div>
        <div className="absolute top-0 left-0 w-full h-full  text-L1">
          <div className="max-w-[1296px] mx-auto h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="px-8  sm:pl-[160px]">
                <h1 className="h3 sm:h1"> 今年我想來點...</h1>
                <h3 className="sm:mt-3 h5 sm:h3 text-L2">半導體、金融、航運</h3>
                <Link to="/register"><button className="block mt-5 sm:mt-8 btn sm:h2 h4">加入您的ETF</button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" px-7 py-12  sm:py-[120px]"
        style={{
          background:
            "linear-gradient(264.94deg, rgba(114, 79, 255, 0.4) -17.73%, rgba(0, 0, 0, 0) 22.68%), linear-gradient(98.19deg, rgba(113, 152, 255, 0.5) -21.94%, rgba(47, 47, 47, 0) 18.99%), #050B2A",
        }}
      >
        <div className=" flex flex-col items-center  sm:text-center  mx-auto ">
          <h2 className=" h3 sm:h1  text-L1">你知道嗎？</h2>
          <p className="h5 sm:h3  mt-5 sm:mt-10 text-L2">
            近年來各家證券公司推行許多ETF產品<br></br>
            但太陽餅裡沒有太陽，長頸鹿美語不是長頸鹿教的<br></br> 你買的
            主題型ETF裡成分股真的符合 該主題嗎?
          </p>
          <form className="mt-5 sm:mt-10 w-full max-w-[635px]">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-8 pointer-events-none ">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 sm:w-7 sm:h-7  text-d3 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="code-search"
                list="code-list"
                className="h-[48px] sm:h-[78px] rounded-full block w-full pl-10  py-3 sm:py-7 sm:pl-[76px] h5 sm:h4 text-gray-900 border border-gray-500  bg-[#F5F5F5] focus:ring-btn-primary focus:border-btn-primary  placeholder:text-d3
                placeholder:h5 sm:placeholder:h4"
                placeholder="輸入ETF代碼"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <datalist id="code-list">
                {etfList
                  .filter((item) =>
                    item.name.includes(inputCode) ||
                    item.code.toString().includes(inputCode)
                  )
                .map((etf) => (
                  <option key={etf.id} value={etf.code}>
                    {etf.name}
                  </option>
                ))}
              </datalist>
              <button
                type="button"
                className="absolute  bottom-1 right-1 sm:bottom-1 h5 sm:h3 btn px-3 py-2.5 sm:px-8 sm:py-[17px] "
                onClick={handleClick}
              >
                立即查詢
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="bg-[#EFEFEF] sm:py-20">
        <div className=" px-3  py-10 sm:flex container max-w-[1296px] sm:justify-center  flex-row-reverse mx-auto md:h-[480px]">
          <div className="sm:w-1/2 min-h-[240px]  bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')]"></div>
          <div className="mt-5 sm:mt-0 sm:w-1/2 sm:flex sm:flex-col sm:justify-center text-center sm:text-start sm:pl-10 sm:mr-6">
            <div className="">
              <h3 className=" h3 sm:h2 lg:h1 text-d1 font-bold">你還在付高額經理費嗎？</h3>
              <p className=" sm:mt-7 mx-auto sm:mx-0 text-start w-2/3 sm:w-auto h5 md:h4 lg:h3 mt-2 text-d3 ">
                台灣ETF管理費平均為0.84%，<br></br> 主題型更高達2%以上！<br></br>{" "}
                你還想被券商賺管理費嗎？<br></br> 現在就開始自己組ETF!
              </p>
              <Link to="/register"><button className="mt-4 mx-auto sm:mx-0 sm:mt-7 btn sm:h2 h4">
                加入您的ETF
              </button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#EFEFEF] sm:py-20">
        <div className="px-3 py-10 sm:flex container max-w-[1296px]  sm:justify-center mx-auto md:h-[480px]">
          <div className="sm:w-1/2 min-h-[240px] bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
          <div className="mt-5 sm:mt-0 sm:w-1/2 sm:flex sm:flex-col sm:justify-center text-center sm:text-start sm:ml-6 sm:pl-10">
            <div className="">
              <h3 className=" h3 sm:h2 lg:h1  text-d1 font-bold">少年股神就是你</h3>
              <p className=" sm:mt-7 mx-auto sm:mx-0 text-start w-2/3 sm:w-auto h5 md:h4 lg:h3 mt-2 text-d3 ">
                巴菲特靠著每年超過10%績效逐漸將資產擴大，<br></br>{" "}
                你想知道目前績效如何？<br></br> 立即加入檢視你的績效
              </p>
              <button className="mt-4 mx-auto sm:mx-0 sm:mt-7 btn sm:h2 h4">
                立即加入
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#E9E9E9]">
        <div className="max-w-[1296px] mx-auto  px-3 py-10 sm:py-[112.5px]">
          <h3 className="h3 sm:h1 text-center  mb-9 sm:mb-16 text-d1 font-bold">三個步驟，比較績效</h3>
          <ul className="flex gap-8 sm:gap-10 justify-center flex-wrap sm:flex-nowrap ">
            <li>
              <p className="text-center h4 sm:h2  mb-4 sm:mb-6 text-d1 sm:text-d2">1.註冊/登入會員</p>
              <img className="max-w-[360px] w-full" 
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </li>
            <li>
              <p className="text-center h4 sm:h2 mb-4 sm:mb-6 text-d1 sm:text-d2">2.新增自選ETF</p>
              <img className="max-w-[360px] w-full" 
              src="https://images.unsplash.com/photo-1423666523292-b458da343f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80" alt="" />
            </li>
            <li>
              <p className="text-center h4 sm:h2 mb-4 sm:mb-6 text-d1 sm:text-d2">3.比較績效</p>
              <img className="max-w-[360px] w-full" 
              src="https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </li>
          </ul>
        </div>
      </section>
      <section className='bg-[#FBFBFB]'>
        <div className="max-w-[1296px] mx-auto py-10 sm:pt-[80px] sm:pb-[120px]">
          <h3 className='h3 sm:h1 text-center text-d1 font-bold'>財經KOL，唯一推薦</h3>
          <ul className='mt-10 sm:mt-16 flex gap-8 flex-wrap sm:flex-nowrap'>
            <li className='flex flex-col items-center  px-7 sm:px-9'>
              <img className='w-32 h-32 rounded-full object-cover outline outline-offset-4 outline-3 outline-[#345FF8]'
              src="https://images.unsplash.com/photo-1611403119860-57c4937ef987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
              <h4 className='mt-[14px] sm:mt-4  h4 text-d2'>骨癌</h4>
              <div className="mt-[14px] sm:mt-5  flex">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
              <p className='mt-[14px] sm:mt-4  h5 sm:h4 text-d3'>平常都是別人給我五星好評，今天換我給人五星好評，是股市新手小白小萌新菜雞都應該用一下，了解各個ETF到底包什麼，也順便回測自己的持股</p>
            </li>
            <li className='flex flex-col items-center px-7 sm:px-9'>
              <img className='w-32 h-32 rounded-full object-cover outline outline-offset-4 outline-3 outline-[#345FF8]'
              src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
              <h4 className='mt-[14px] sm:mt-4  h4 text-d2'>dian3403</h4>
              <div className="mt-[14px] sm:mt-5  flex">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
              <p className='mt-[14px] sm:mt-4  h5 sm:h4 text-d3'>平常都是別人給我五星好評，今天換我給人五星好評，是股市新手小白小萌新菜雞都應該用一下，了解各個ETF到底包什麼，也順便回測自己的持股</p>
            </li>
            <li className='flex flex-col items-center px-7 sm:px-9'>
              <img className='w-32 h-32 rounded-full object-cover outline outline-offset-4 outline-3 outline-[#345FF8]'
              src="https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
              <h4 className='mt-[14px] sm:mt-4  h4 text-d2'>kiki</h4>
              <div className="mt-[14px] sm:mt-5  flex">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
              <p className='mt-[14px] sm:mt-4  h5 sm:h4 text-d3'>平常都是別人給我五星好評，今天換我給人五星好評，是股市新手小白小萌新菜雞都應該用一下，了解各個ETF到底包什麼，也順便回測自己的持股</p>
            </li>
            
          </ul>
        </div>
      </section>
      <section className="relative h-[300px] sm:h-[600px] bg-no-repeat bg-center bg-cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80')"}}>
        <div className="absolute bg-d1 h-full w-full opacity-40 top-0"></div>
        <div className="absolute top-0 w-full">
            <div className="max-w-[1296px] mx-auto  mt-[82px] sm:mt-[220px] flex flex-col items-center ">
              <h3 className='h3 sm:h1 text-L1 text-center max-w-[280px] sm:max-w-[1296px]'>你就是王牌基金管理人，立刻管理配置</h3>
              <button className='mt-10 btn sm:h2 h4 '>立即加入</button>
            </div>     
        </div>
      </section>
    </>
  );
};

export default Home;

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        className="h-full w-full relative h-[265px] sm:h-[700px]"
        style={{
          background:
            "linear-gradient(264.94deg, rgba(114, 79, 255, 0.4) -2.73%, rgba(0, 0, 0, 0) 32.68%), linear-gradient(98.19deg, rgba(113, 152, 255, 0.5) -6.94%, rgba(47, 47, 47, 0) 28.99%), #050B2A",
        }}
      >
        <div
          className=" absolute opacity-75 h-full  bg-[url('https://i.imgur.com/xzlLWH8.png')]
          bg-no-repeat bg-center bg-cover w-full "
        ></div>
        <div className="absolute top-0 left-0 w-full h-full  text-L1">
          <div className="max-w-[1220px] mx-auto h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="pl-[160px]">
                <h1 className="h3 sm:h1"> 今年我想來點...</h1>
                <h3 className="h5 sm:h3">半導體、金融、航運</h3>
                <button className="block mt-5 sm:mt-8 btn">加入您的ETF</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        clsssName=""
        style={{
          background:
            "linear-gradient(264.94deg, rgba(114, 79, 255, 0.4) -2.73%, rgba(0, 0, 0, 0) 32.68%), linear-gradient(98.19deg, rgba(113, 152, 255, 0.5) -6.94%, rgba(47, 47, 47, 0) 28.99%), #050B2A",
        }}
      >
        <div className=" text-center text-L1 mx-auto px-3 py-12 sm:py-[120px]">
          <h2 className=" h3 sm:h1 ">你知道嗎？</h2>
          <p className="h5 sm:h3  mt-8">
            近年來各家證券公司推行許多ETF產品<br></br>
            但太陽餅裡沒有太陽，長頸鹿美語不是長頸鹿教的<br></br> 你買的
            主題型ETF裡成分股真的符合 該主題嗎?
          </p>
          <button className="mx-auto block mt-5 sm:mt-8 btn">立刻前往</button>
        </div>
      </section>
      <section className="bg-[#FEFEFE] px-3 py-10 sm:flex container max-w-7xl sm:justify-center  flex-row-reverse mx-auto md:h-[480px]">
        <div className="sm:w-1/2 min-h-[240px]  bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')]"></div>
        <div className="mt-5 sm:mt-0 sm:w-1/2 sm:flex sm:flex-col sm:justify-center text-center sm:text-start sm:pl-10 sm:mr-6">
          <div className="">
            <h3 className=" h3 sm:h2 lg:h1 ">你還在付高額經理費嗎？</h3>
            <p className=" sm:mt-7 mx-auto sm:mx-0 text-start w-2/3 sm:w-auto h5 md:h4 lg:h3 mt-2 text-d3 ">
              台灣ETF管理費平均為0.84%，<br></br> 主題型更高達2%以上！<br></br>{" "}
              你還想被券商賺管理費嗎？<br></br> 現在就開始自己組ETF!
            </p>
            <button className="mt-4 mx-auto sm:mx-0 sm:mt-8 btn">
              加入您的ETF
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#FEFEFE] px-3 py-10 sm:flex container max-w-7xl sm:justify-center mx-auto md:h-[480px]">
        <div className="sm:w-1/2 min-h-[240px] bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
        <div className="mt-5 sm:mt-0 sm:w-1/2 sm:flex sm:flex-col sm:justify-center text-center sm:text-start sm:ml-6 sm:pl-10">
          <div className="">
            <h3 className=" h3 sm:h2 lg:h1 ">少年股神就是你</h3>
            <p className=" sm:mt-7 mx-auto sm:mx-0 text-start w-2/3 sm:w-auto h5 md:h4 lg:h3 mt-2 text-d3 ">
              巴菲特靠著每年超過10%績效逐漸將資產擴大，<br></br>{" "}
              你想知道目前績效如何？<br></br> 立即加入檢視你的績效
            </p>
            <button className="mt-4 mx-auto sm:mx-0 sm:mt-8 btn">
              加入您的ETF
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

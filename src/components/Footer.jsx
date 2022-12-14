import call from './icon/ic_call.png'
import mail from './icon/ic_mail.png'

const Footer = () => {
  return (
    <>
      <section className='bg-d2'>
        <div className="text-L1 sm:flex px-5 py-10 sm:p-[60px] max-w-[1296px] mx-auto justify-between ">
          <div className="">
            <h3 className='text-[28px] leading-[40.54px] font-bold mb-8'>ETF自由配</h3>
            <p className='h4 mb-5 font-normal flex items-center'>
              <span className=' mr-[6px]'>
              <i className="w-[24px] fa-solid fa-head-side-virus"></i>
              </span>
              <span className='mr-2 sm:mr-4'>作者:</span>
              <span className='mr-2 sm:mr-4'>KuoMin Li</span>
              <span className='mr-2 sm:mr-4'><a href="https://github.com/KuoMinLi/ETF-DIY-F2E"><i className="fa-brands fa-github"></i></a></span>
              <span className='mr-2 sm:mr-4'><a href="https://www.linkedin.com/in/goergeli/"><i className="fa-brands fa-linkedin"></i></a></span>
            
            </p>
            <p className='h4 font-normal'>
              <span className='mr-[6px]'>
                <img className='inline' src={mail} alt="" />
              </span>
              <span className='mr-2 sm:mr-4'>聯絡信箱</span>
              <span>tw.kuomin@gmail.com</span>
            </p>
          </div>
          <div className="mt-6 flex items-end">
            <p className=" text-L2 h5">@ 2022 ETF自由配. All Rights Reserved</p>
          </div>
        </div>
      </section>

    </>
  );
}

export default Footer;
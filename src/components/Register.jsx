import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUserSignUp } from "../api/userAPI";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MySwalToast from "./utilities/MySwalToast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token) || localStorage.getItem("token");
 
  useEffect(() => {
    if (token !== null) {
      navigate("/etfdiy");
    }
  }, [token, navigate]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginToken = (token) => {
    return {
      type: "LOGIN",
      payload: token,
    };
  };

  const onSubmit = (formData) => {
    const body = {
      data: formData,
    };
    (async () => {
      try {
        const response = await apiUserSignUp(body);
        dispatch(loginToken(response.token));
        localStorage.setItem('token', response.token);
        MySwalToast("註冊成功", true);
        navigate("/etfdiy/add");
      } catch (error) {
        MySwalToast(error.response.data.message, false);
      }
    })();
    navigate("/login");
  };

  return (
    <>
      <div className=" min-h-[calc(100vh_-_23.5rem)] sm:p-8 flex items-center justify-center  max-w-[1200px] mx-auto">
        <div className="md:shadow-lg flex justify-center items-center  rounded-xl px-4 sm:px-8  py-12 gap-8">
          <div className="outline outline-offset-2 outline-[#345FF8] p-8  rounded-lg shadow-lg md:w-1/2  md:p-12">
            <h1 className="h3 sm:h1 text-d1 mb-4 sm:mb-8">會員註冊</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4 flex ">
                <label className="block text-d2 h4 mr-2  sm:h3  min-w-[110px]">
                  Email*
                </label>
                <div className="">
                  <input
                    type="email"
                    className="shadow  appearance-none border rounded w-full py-2 px-3 h5  text-d3  sm:h4     focus:outline-none focus:shadow-outline"
                    placeholder="email@gmail.com"
                    {...register("email", {
                      required: { value: true, message: "此欄位必填寫" },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "不符合 Email 規則",
                      },
                    })}
                  />
                  <p className="text-red-500 ml-2 mt-2 h5 italic">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex ">
                <label className="block text-d2 h4 mr-2  sm:h3 min-w-[110px] ">
                  名稱*
                </label>
                <div className="">
                  <input
                    type="text"
                    className="shadow  appearance-none border rounded w-full py-2 px-3 h5  text-d3  sm:h4     focus:outline-none focus:shadow-outline"
                    placeholder="巴菲特"
                    {...register("name", {
                      required: { value: true, message: "此欄位必填寫" },
                    })}
                  />
                  <p className="text-red-500 ml-2 mt-2 h5 italic">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex ">
                <label className="block text-d2 h4 mr-2  sm:h3 min-w-[110px]">
                  密碼*
                </label>
                <div className="">
                  <input
                    type="password"
                    className="shadow  appearance-none border rounded w-full py-2 px-3 h5  text-d3  sm:h4     focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    {...register("password", {
                      required: { value: true, message: "此欄位必填寫" },
                      minLength: { value: 8, message: "密碼至少為 8 碼" },
                    })}
                  />
                  <p className="text-red-500 ml-2 mt-2 h5 italic">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex ">
                <label className="block text-d2 h4 mr-2  sm:h3 min-w-[110px]">
                  確認密碼*
                </label>
                <div className="">
                  <input
                    type="password"
                    className="shadow  appearance-none border rounded w-full py-2 px-3 h5  text-d3  sm:h4     focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    {...register("confirmPassword", {
                      required: { value: true, message: "此欄位必填寫" },
                      minLength: { value: 8, message: "密碼至少為 8 碼" },
                    })}
                  />
                  <p className="text-red-500 ml-2 mt-2 h5 italic">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3   mb-4">
                <div className="min-w-[110px]"></div>
                <button
                  className="bg-btn-primary hover:opacity-80 text-L1  w-full h5 sm:h4 btn focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  註冊
                </button>
              </div>
              <div className="px-3 text-end text-sm font-medium h5 sm:h4 text-gray-500 dark:text-gray-300">
                已經是會員?{" "}
                <Link
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  to="/Login"
                >
                  點此登入
                </Link>
              </div>
            </form>
          </div>
          <div className="md:flex md:w-1/2  items-center hidden   rounded-xl md:h-[500px]">
            <img
              className="object-cover  h-full  "
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUserSignIn } from "../api/userAPI";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token) || localStorage.getItem("token");

  useEffect(() => {
    if (token !== null) {
      navigate("/etfdiy");
    }
  }, [token, navigate]);


  // const MySwal = withReactContent(Swal)
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.addEventListener('mouseenter', Swal.stopTimer)
  //     toast.addEventListener('mouseleave', Swal.resumeTimer)
  //   }
  // })

  // Toast.fire({
  //   icon: 'success',
  //   title: 'Signed in successfully'
  //   })

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
        const response = await apiUserSignIn(body);
        dispatch(loginToken(response.token));
        localStorage.setItem('token', response.token);

        // MySwal.fire({ 這邊要加個彈跳視窗!!!

        // 成功登入後導回個人頁面
        navigate("/etfadddiy");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <div className=" h-[calc(100vh_-_8.6rem)] sm:p-8 flex items-center justify-center  max-w-[1200px] mx-auto">
        <div className="md:shadow-lg flex justify-center items-center  rounded-xl px-8  py-12 gap-8">
          <div className="outline outline-offset-2 outline-[#345FF8] p-8 rounded-lg shadow-lg md:w-1/2 md:p-12">
            <h1 className="h3 sm:h1 text-d1 mb-4 sm:mb-8">會員登入</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4">
                <label className="block text-d2 h5  mb-2 sm:h3 ">
                  帳號 (Email)
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 h5  text-d3  sm:h4    focus:outline-none focus:shadow-outline"
                  placeholder="Email"
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
              <div className="mb-4">
                <label className="block text-d2  h5 sm:h3 mb-2">
                  密碼 (Password)
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-d3 mb-3 focus:outline-none focus:shadow-outline"
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
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <button
                  className="bg-btn-primary hover:opacity-80 text-L1  h5 sm:h4 btn focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  登入
                </button>
              </div>
              <div className="text-sm font-medium h5 sm:h4 text-gray-500 dark:text-gray-300">
                還沒有會員?{" "}
                <Link
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  to="/register"
                >
                  點此註冊
                </Link>
              </div>
            </form>
          </div>
          <div className="md:flex md:w-1/2 items-center hidden   rounded-xl md:h-[500px]">
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
}

export default Login;

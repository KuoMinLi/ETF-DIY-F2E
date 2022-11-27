import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  return (
    <>
      <div className=" h-[calc(100vh_-_10rem)] sm:p-8 flex items-center justify-center  max-w-[1200px] mx-auto">
        <div className="md:shadow-lg flex justify-center items-center  rounded-xl p-8 gap-8">
          <div className="outline outline-offset-2 outline-[#345FF8] p-8 rounded-lg shadow-lg md:p-12">
            <h1 className="h3 sm:h1 text-d1 mb-4 sm:mb-8">Login</h1>
            <form>
              <div className="mb-4">
                <label className="block text-d2 h5  mb-2 sm:h3 ">Email</label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 h5  text-d3 leading-tight sm:h4     focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-d2  h5 sm:h3 mb-2">Password</label>
                <input
                  type="password"
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-d3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******************"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <button
                  className="bg-btn-primary hover:opacity-80 text-L1  h5 sm:h4 py-2 px-4 sm:py-3 sm:px-6 rounded-full focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline h5 sm:h4 text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="#"
                  class="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div>
            </form>
          </div>
          <div className="flex items-center hidden md:block  rounded-xl md:h-[500px]">
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

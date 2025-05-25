import { Link, useNavigate } from "react-router";
// import LoginPhoto from "../../assets/LoginPhoto.png";
import LoginPhoto from "../../assets/login.jpg";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { FaExclamationCircle } from "react-icons/fa";
import { useFormik } from "formik";
import type { ILogin } from "../../interfaces/Auth";
import * as Yup from "yup";
import { signin } from "../../lib/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/store/store";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginLoading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: ILogin) {
    const res = await dispatch(signin(values));

    if (!res.type.endsWith("/rejected")) {
      toast.success(res.payload.message || "Login successful");
      localStorage.setItem("Token", res.payload.token);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center  px-4">
        <div className="grid grid-cols-12 gap-3 w-full mx-6 items-center">
          <div className="col-span-12 lg:col-span-6 ">
            <div className="py-1 font-light">
              <h1 className="text-5xl md:text-6xl py-5 font-bold">
                Welcome Back
                <span className="text-blue-500 hover:text-blue-700">.</span>
              </h1>
            </div>
            <form onSubmit={formik.handleSubmit} className="py-1">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12">
                  <div className="relative">
                    <input
                      className={`block w-full mt-1 p-2 pr-10  text-base border rounded-md focus:outline-none ${
                        formik.errors.email && formik.touched.email
                          ? "border-red-600"
                          : "border-gray-300"
                      }`}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.errors.email && formik.touched.email && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600">
                        <FaExclamationCircle />
                      </span>
                    )}
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-1 text-red-400 text-sm font-medium">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="col-span-12">
                  <div className="relative">
                    <input
                      className={`block w-full mt-1 p-2 pr-10  text-base border rounded-md focus:outline-none ${
                        formik.errors.password && formik.touched.password
                          ? "border-red-600"
                          : "border-gray-300"
                      }`}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.errors.password && formik.touched.password ? (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-600">
                        <FaExclamationCircle />
                      </span>
                    ) : null}

                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-1 text-red-400 text-sm font-medium">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6 ">
                <p className="text-left my-3 text-base font-normal text-gray-500">
                  {" "}
                  <Link
                    to="/forget-password"
                    className="text-blue-600 cursor-pointer hover:text-blue-900"
                  >
                    Forgot your password ?
                  </Link>{" "}
                </p>

                <button
                  disabled={!formik.isValid || !formik.dirty}
                  className=" w-full font-normal flex items-center justify-center focus:outline-none rounded-md cursor-pointer bg-blue-500 text-white hover:bg-blue-600 duration-500"
                >
                  {loginLoading ? (
                    <span className="flex-grow p-2 rounded-md">
                      <div className="flex items-center justify-center p-1">
                        <ImSpinner9 className="animate-spin text-white " />
                      </div>
                    </span>
                  ) : (
                    <>
                      <span className="flex-grow p-2 rounded-md">Login </span>
                      <span className=" rounded-e-md bg-blue-600 p-3 px-4 border-s-2 border-gray-500 border-s-white">
                        <FaArrowRightLong />
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center my-2 text-xl text-gray-500 font-light ">
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 cursor-pointer hover:text-blue-900"
                  >
                    Create an account
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>

          <div className=" col-span-12 lg:col-span-6 hidden lg:block">
            <div className="image flex justify-center">
              <img src={LoginPhoto} alt="LoginPhoto" className="w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

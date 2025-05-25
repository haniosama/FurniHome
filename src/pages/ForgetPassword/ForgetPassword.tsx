import { Link, useNavigate } from "react-router";
import resetPasswordPhoto from "../../assets/resetPassword.jpg";
import forgetPasswordPhoto from "../../assets/verifyCode.jpg";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/store/store";
import { useState } from "react";
import { changePassword, emailVerification } from "../../lib/slices/auth";
import toast from "react-hot-toast";
import type { IChangePassword } from "../../interfaces/Auth";
import { ImSpinner9 } from "react-icons/im";

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [displayNow, setDisplayNow] = useState("email");
  const { verifyCodeLoading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = Yup.object().shape({
    email:
      displayNow === "email"
        ? Yup.string().email("Invalid email").required("Email required")
        : Yup.string(),

    providedCode:
      displayNow === "verified"
        ? Yup.string().length(6, "Must be 6 digits").required("Code required")
        : Yup.string(),

    newPassword:
      displayNow === "verified"
        ? Yup.string().min(6).max(15).required("Password required")
        : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      providedCode: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: IChangePassword) {
    if (displayNow === "email") {
      const res = await dispatch(emailVerification(values));

      if (!res.type.endsWith("/rejected")) {
        toast.success(res.payload.message || "Verification code sent");
        setTimeout(() => {
          setDisplayNow("verified");
          formik.resetForm({
            values: {
              email: "",
              providedCode: "",
              newPassword: "",
            },
          });
        }, 500);
      }
    } else if (displayNow === "verified") {
      const res = await dispatch(changePassword(values));

      if (!res.type.endsWith("/rejected")) {
        toast.success(res.payload.message || "Verification successful");
        setTimeout(() => {
          setDisplayNow("email");
          navigate("/login");
        }, 500);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center  px-4">
        <div className="grid grid-cols-12 gap-3 w-full mx-6 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="py-1 font-light">
              <h1 className="text-5xl md:text-6xl py-5 font-bold">
                {displayNow === "email" ? "Forget Password" : "Reset Password"}

                <span className="text-blue-500 hover:text-blue-700">.</span>
              </h1>
            </div>
            <form onSubmit={formik.handleSubmit} className="py-1">
              <div className="grid grid-cols-12 gap-2">
                {displayNow === "email" ? (
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
                ) : (
                  ""
                )}

                {displayNow === "verified" ? (
                  <>
                    <div className="col-span-12">
                      <div className="relative">
                        <input
                          className={`block w-full mt-1 p-2 pr-10  text-base border rounded-md focus:outline-none ${
                            formik.errors.providedCode &&
                            formik.touched.providedCode
                              ? "border-red-600"
                              : "border-gray-300"
                          }`}
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          id="providedCode"
                          name="providedCode"
                          placeholder="Code"
                          value={formik.values.providedCode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        {formik.errors.providedCode &&
                          formik.touched.providedCode && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600">
                              <FaExclamationCircle />
                            </span>
                          )}
                      </div>
                      {formik.errors.providedCode &&
                        formik.touched.providedCode && (
                          <p className="mt-1 text-red-400 text-sm font-medium">
                            {formik.errors.providedCode}
                          </p>
                        )}
                    </div>

                    <div className="col-span-12">
                      <div className="relative">
                        <input
                          className={`block w-full mt-1 p-2 pr-10  text-base border rounded-md focus:outline-none ${
                            formik.errors.newPassword &&
                            formik.touched.newPassword
                              ? "border-red-600"
                              : "border-gray-300"
                          }`}
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          placeholder="New Password"
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        {formik.errors.newPassword &&
                          formik.touched.newPassword && (
                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-600">
                              <FaExclamationCircle />
                            </span>
                          )}

                        <span
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {formik.errors.newPassword &&
                        formik.touched.newPassword && (
                          <p className="mt-1 text-red-400 text-sm font-medium">
                            {formik.errors.newPassword}
                          </p>
                        )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6 mt-5">
                <button
                  disabled={!formik.isValid || !formik.dirty}
                  className="w-full font-normal flex items-center justify-center focus:outline-none rounded-md cursor-pointer bg-blue-500 text-white hover:bg-blue-600 duration-500"
                >
                  {verifyCodeLoading ? (
                    <span className="flex-grow p-2 rounded-md">
                      <div className="flex items-center justify-center p-1">
                        <ImSpinner9 className="animate-spin text-white " />
                      </div>
                    </span>
                  ) : (
                    <>
                      <span className="flex-grow p-2 rounded-md">
                        {displayNow === "email"
                          ? "Send Code"
                          : displayNow === "verified"
                          ? "Change Password"
                          : ""}
                      </span>
                      <span className=" rounded-e-md bg-blue-600 p-3 px-4 border-s-2 border-gray-500 border-s-white">
                        <FaArrowRightLong />
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center my-3 text-xl text-gray-500 font-light ">
                  Remember Password ?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 cursor-pointer hover:text-blue-900"
                  >
                    Login{" "}
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>

          <div className=" col-span-12 lg:col-span-6 hidden lg:block">
            <div className="image flex justify-center">
              {displayNow === "email" ? (
                <img
                  src={forgetPasswordPhoto}
                  alt="LoginPhoto"
                  className="w-3/4"
                />
              ) : (
                <img
                  src={resetPasswordPhoto}
                  alt="LoginPhoto"
                  className="w-3/4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;

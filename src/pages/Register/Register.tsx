import { Link, useNavigate } from "react-router";
import RegisterPhoto from "../../assets/register.jpg";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { useFormik } from "formik";
import type { IRegister } from "../../interfaces/Auth";
import * as Yup from "yup";
import { signup } from "../../lib/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/store/store";
import toast from "react-hot-toast";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { FiChevronDown, FiUpload } from "react-icons/fi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerLoading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^\w+((\s*\w+)*)?$/,
        "Username must be characters & numbers only"
      )
      .min(5, "Must be 5 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Username Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Password Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone - Must be egyptian number ")
      .required("Phone Required"),
    role: Yup.string().required("Role Required"),
    avatar: Yup.mixed().nullable(),
  });
  const formik = useFormik<{
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    avatar: File | null;
  }>({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      avatar: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: IRegister) {
    const res = await dispatch(signup(values));

    if (!res.type.endsWith("/rejected")) {
      toast.success(res.payload.status || "Register successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="grid grid-cols-12 gap-3 w-full mx-6 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="py-1 font-light">
              <p className="text-gray-500 text-2xl ms-1">Start for free</p>

              <h1 className="text-4xl md:text-5xl py-3 font-semibold">
                Create new account
                <span className="text-blue-500 hover:text-blue-700">.</span>
              </h1>

              <h4 className="mb-5 text-gray-500 text-2xl font-light ms-1">
                Already A Member?
                <span className="cursor-pointer">
                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-700  "
                  >
                    {" "}
                    Login
                  </Link>
                </span>
              </h4>
            </div>
            <form onSubmit={formik.handleSubmit} className="py-1">
              <div className="grid grid-cols-12  gap-2">
                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full mt-1 p-2 pr-10 text-base border rounded-md focus:outline-none transition-colors duration-200 ${
                        formik.errors.username && formik.touched.username
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-white"
                      } hover:border-blue-500 focus:border-blue-600`}
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Name"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.errors.username && formik.touched.username && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600">
                        <FaExclamationCircle />
                      </span>
                    )}
                  </div>
                  {formik.errors.username && formik.touched.username && (
                    <p className="mt-1 text-red-400 text-sm font-medium">
                      {formik.errors.username}
                    </p>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full mt-1 p-2 pr-10 text-base border rounded-md focus:outline-none transition-colors duration-200 ${
                        formik.errors.email && formik.touched.email
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-white"
                      } hover:border-blue-500 focus:border-blue-600`}
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
                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full mt-1 p-2 pr-10 text-base border rounded-md focus:outline-none transition-colors duration-200 ${
                        formik.errors.password && formik.touched.password
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-white"
                      } hover:border-blue-500 focus:border-blue-600`}
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
                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full mt-1 p-2 pr-10 text-base border rounded-md focus:outline-none transition-colors duration-200 ${
                        formik.errors.phone && formik.touched.phone
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-white"
                      } hover:border-blue-500 focus:border-blue-600`}
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600">
                        <FaExclamationCircle />
                      </span>
                    )}
                  </div>
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="mt-1 text-red-400 text-sm font-medium">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative">
                    <select
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`appearance-none block w-full mt-1 p-2 pr-10 text-base border rounded-md transition-colors duration-200
                      ${
                        formik.errors.role && formik.touched.role
                          ? "border-red-600 bg-red-50"
                          : formik.values.role === ""
                          ? "text-gray-500 border-gray-300"
                          : "text-black border-gray-300"
                      }
                      hover:border-blue-500
                      focus:outline-none focus:ring-0 focus:border-blue-600
                    `}
                      name="role"
                      id="role"
                    >
                      <option value="" disabled hidden>
                        Choose role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>

                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />

                    {formik.errors.role && formik.touched.role && (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-600">
                        <FaExclamationCircle />
                      </span>
                    )}
                  </div>

                  {formik.errors.role && formik.touched.role && (
                    <p className="mt-1 text-red-400 text-sm font-medium">
                      {formik.errors.role}
                    </p>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                  <div className="relative w-full mt-1 border border-gray-300 rounded-md p-2 cursor-pointer hover:border-blue-500 focus-within:border-blue-600">
                    <span
                      className="block text-gray-500 truncate"
                      style={{ maxWidth: "calc(100% - 40px)" }}
                    >
                      {formik.values.avatar instanceof File
                        ? formik.values.avatar.name
                        : "Upload your avatar"}
                    </span>

                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          formik.setFieldValue("avatar", e.target.files[0]);
                        }
                      }}
                    />

                    <FiUpload
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                <button
                  disabled={!formik.isValid || !formik.dirty}
                  className=" w-full mt-10  font-normal flex items-center justify-center focus:outline-none rounded-md cursor-pointer bg-blue-500 text-white hover:bg-blue-600 duration-500"
                >
                  {registerLoading ? (
                    <span className="flex-grow p-2 rounded-md">
                      <div className="flex items-center justify-center p-1">
                        <ImSpinner9 className="animate-spin text-white " />
                      </div>
                    </span>
                  ) : (
                    <>
                      <span className="flex-grow p-2 rounded-md">
                        Register{" "}
                      </span>
                      <span className=" rounded-e-md bg-blue-600 p-3 px-4 border-s-2 border-gray-500 border-s-white">
                        <FaArrowRightLong />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className=" col-span-12 lg:col-span-6 hidden lg:block">
            <div className="image flex justify-center">
              <img src={RegisterPhoto} alt="RegisterPhoto" className="w-fir" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;

import axios from "axios";
import { useFormik } from "formik";
import type { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

type FormValues = {
  shippingAddress: ShippingAddress;
};

export default function CheckOut() {
  const [typeOrder, setTypeOrder] = useState<"cash" | "online">("cash");
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("Token");

  const handleOnlineOrder = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const url = window.location.origin;
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.cartId}?url=${url}`,
        values,
        {
          headers: { token },
        }
      );
      if (data.status === "success") {
        // notify("loading", "redirect to payment gateway");
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const handleCashOrder = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartItems.cartId}`,
        values,
        {
          headers: { token },
        }
      );
      if (data.status === "success") {
        // setcartItems([]);
        navigate("/allorders");
      }
    } catch (error) {
      console.error(error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const onSubmitFunction =
    typeOrder === "cash" ? handleCashOrder : handleOnlineOrder;

  const formik = useFormik<FormValues>({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: onSubmitFunction,
  });

  return (
    <>
      <Helmet>
        <title>Check out</title>
      </Helmet>

      <div className="container mx-auto px-4 my-8 max-w-xl">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6">
          Checkout Form
        </h3>

        <div
          className="flex gap-4 mb-4"
          role="group"
          aria-label="Select payment type"
        >
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              typeOrder === "cash"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-pressed={typeOrder === "cash"}
            onClick={() => setTypeOrder("cash")}
          >
            Cash
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded ${
              typeOrder === "online"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-pressed={typeOrder === "online"}
            onClick={() => setTypeOrder("online")}
          >
            Online
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Selected: <strong>{typeOrder}</strong> payment
        </p>

        <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">
              Details
            </label>
            <input
              type="text"
              id="details"
              name="shippingAddress.details"
              placeholder="Enter details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.shippingAddress?.details &&
                formik.errors.shippingAddress?.details
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              required
              autoComplete="address-line1"
            />
            {formik.touched.shippingAddress?.details &&
              formik.errors.shippingAddress?.details && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.shippingAddress.details}
                </p>
              )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="shippingAddress.phone"
              placeholder="Enter phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.shippingAddress?.phone &&
                formik.errors.shippingAddress?.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              required
              autoComplete="tel"
            />
            {formik.touched.shippingAddress?.phone &&
              formik.errors.shippingAddress?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.shippingAddress.phone}
                </p>
              )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="shippingAddress.city"
              placeholder="Enter city"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.shippingAddress?.city &&
                formik.errors.shippingAddress?.city
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              required
              autoComplete="address-level2"
            />
            {formik.touched.shippingAddress?.city &&
              formik.errors.shippingAddress?.city && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.shippingAddress.city}
                </p>
              )}
          </div>

          <button
            type="submit"
            className=" bg-teal-700 hover:bg-teal-800 text-white p-2 rounded transition"
          >
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
}

import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupon, resetState } from "../features/coupon/CouponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Title is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      name: "",
      expired: Date,
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3>Add Coupon</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter Coupon"
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          id="coupon"
        />
        <CustomInput
          label="Discount"
          type="number"
          name="discount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.discount}
          id="discount"
        />
        <CustomInput
          label="Enter Coupon"
          type="datetime-local"
          name="expired"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.expired}
          id="coupon"
        />
        <button
          className="btn btn-success border-0 rounded-3 my-3"
          type="submit"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;

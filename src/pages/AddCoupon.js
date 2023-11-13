import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/CouponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Title is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCounponId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getCounponId !== undefined) {
      dispatch(getCoupon(getCounponId));
    } else {
      dispatch(resetState);
    }
  }, [getCounponId]);
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponData,
    updatedCoupon,
  } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon added successfully!");
      navigate("/admin/coupon-list");
      dispatch(resetState());
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Coupon updated successfully!");
      navigate("/admin/coupon-list");
      dispatch(resetState());
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponData?.name || "",
      expired: couponData?.expired || "",
      discount: couponData?.discount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCounponId !== undefined) {
        dispatch(updateCoupon({ _id: getCounponId, ...values }));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3>{getCounponId !== undefined ? "Edit" : "Add"} Coupon</h3>
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
          label="Expired"
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
          Save
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;

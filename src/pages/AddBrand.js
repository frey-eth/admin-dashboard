import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand, resetState } from "../features/brand/BrandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/list-brand");
      }, 3000);
    },
  });
  return (
    <div>
      <h3>Add Brand</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter brand"
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          id="brand"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-3"
          type="submit"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;

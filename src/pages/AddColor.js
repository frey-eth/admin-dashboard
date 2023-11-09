import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createColor, resetState } from "../features/color/ColorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/list-color");
      }, 3000);
    },
  });
  return (
    <div>
      <h3>Add Color</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter Category"
          type="color"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          id="color"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-3"
          type="submit"
        >
          Add Color
        </button>
      </form>
    </div>
  );
};

export default AddColor;

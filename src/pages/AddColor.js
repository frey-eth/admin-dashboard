import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/color/ColorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  colorCode: yup.string().required("Title is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  });
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorData,
    updatedColor,
  } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color added successfully!");
      navigate("/admin/list-color");
      dispatch(resetState());
    }
    if (isSuccess && updatedColor) {
      toast.success("Color added successfully!");
      navigate("/admin/list-color");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorData?.title || "",
      colorCode: colorData?.colorCode || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        dispatch(updateColor({ _id: getColorId, ...values }));
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3>{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter Color Title"
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          id="color"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>

        <CustomInput
          label="Color"
          type="color"
          name="colorCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.colorCode}
          id="colorCode"
        />
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

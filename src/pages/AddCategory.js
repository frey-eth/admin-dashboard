import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getCategory,
  resetState,
  updateCategory,
} from "../features/productCategory/CategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    dataCategory,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category added successfully!");
      navigate("/admin/list-category");
      dispatch(resetState());
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category updated successfully!");
      navigate("/admin/list-category");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: dataCategory?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { _id: getCategoryId, ...values };
        dispatch(updateCategory(data));
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3>{getCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter Category"
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          id="category"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
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

export default AddCategory;

import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategory } from "../features/productCategory/CategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category added successfully!");
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
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 3000);
    },
  });
  return (
    <div>
      <h3>Add Category</h3>
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
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

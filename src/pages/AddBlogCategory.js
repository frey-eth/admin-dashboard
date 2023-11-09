import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBlogCategory, resetState } from "../features/blogCategory/blogCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCat } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCat) {
      toast.success("Blog Category added successfully!");
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
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3>Add Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Enter Blog Category"
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          id="blogCategory"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-3"
          type="submit"
        >
          Add Blog Category
        </button>
      </form>
    </div>
  );
};

export default AddBlogCategory;

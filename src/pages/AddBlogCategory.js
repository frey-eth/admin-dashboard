import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/blogCategory/blogCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCat,
    dataBlogCat,
    updatedBlogCat,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getBlogCategory(getBlogCatId));
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createdBlogCat) {
      toast.success("Blog Category added successfully!");
      dispatch(resetState());
      navigate("/admin/blog-category-list");
    }
    if (isSuccess && updatedBlogCat) {
      toast.success("Blog Category Updated successfully!");
      dispatch(resetState());
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: dataBlogCat?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, dataBlogCat: values };
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3>{getBlogCatId != undefined ? "Edit" : "Add"} Blog Category</h3>
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
          Save
        </button>
      </form>
    </div>
  );
};

export default AddBlogCategory;

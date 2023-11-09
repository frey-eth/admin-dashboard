import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { TiUpload } from "react-icons/ti";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";
import { toast } from "react-toastify";
import { createBlog, resetState } from "../features/blog/BlogSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);
  const imgState = useSelector((state) => state.upload.images);
  const categoryState = useSelector((state) => state.blogCategory.categories);
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("You have posted a blog!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  const imgs = [];
  imgState.forEach((img) => {
    imgs.push({ public_id: img.public_id, url: img.url });
  });
  useEffect(() => {
    formik.values.images = imgs;
  }, [imgs]);
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <div className="div">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            id="category"
          >
            {categoryState.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="bg-white border-1 p-4 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <TiUpload className="fs-1" />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex flex-wrap gap-3">
            {imgState?.map((image, index) => {
              return (
                <div className="position-relative" key={index}>
                  <button
                    onClick={() => dispatch(deleteImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "7px", right: "7px" }}
                  ></button>
                  <img
                    src={image.url}
                    className="d-flex"
                    height={200}
                    width={"auto"}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            Add Blog
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default AddBlog;

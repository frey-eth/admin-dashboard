import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { TiUpload } from "react-icons/ti";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";
import { toast } from "react-toastify";
import {
  createBlog,
  getBlog,
  resetState,
  updateBlog,
} from "../features/blog/BlogSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blogId = location.pathname.split("/")[3];

  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (blogId !== undefined) {
      dispatch(getBlog(blogId));
      dispatch(getBlogCategories());
    } else {
      formik.resetForm();
      dispatch(getBlogCategories());
    }
  }, [blogId]);
  const categoryState = useSelector((state) => state.blogCategory.categories);
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogData } =
    newBlog;

  useEffect(() => {
    if (isSuccess && (createdBlog || updatedBlog)) {
      const successMessage =
        blogId !== undefined
          ? "Product updated successfully!"
          : "Product added successfully!";
      toast.success(successMessage);
      dispatch(resetState());
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogData?.title || "",
      description: blogData?.description || "",
      category: blogData?.category || "",
      images: blogData?.images || imgs,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const cleanedDescription = cleanUpHTML(values.description);

      if (blogId !== undefined) {
        dispatch(
          updateBlog({
            _id: blogId,
            ...values,
            description: cleanedDescription,
          })
        );
      } else {
        dispatch(createBlog({ ...values, description: cleanedDescription }));
        formik.resetForm();
      }
    },
  });

  const cleanUpHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return (
    <div>
      <h3 className="mb-4">{blogId ? "Edit" : "Add"} Blog</h3>
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
              onDrop={(acceptedFiles) =>
                dispatch(uploadImg(acceptedFiles))
                  .unwrap()
                  .then((images) => {
                    setImgs([...imgs, ...images]);
                  })
              }
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
            {formik.values.images?.map((image, index) => {
              return (
                <div className="position-relative" key={index}>
                  <div
                    type="button"
                    onClick={() => {
                      dispatch(deleteImg(image.public_id)).then(() => {
                        const images = formik.values.images.filter(
                          (img) => img.public_id !== image.public_id
                        );
                        formik.setFieldValue("images", [...images]);
                      });
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "7px", right: "7px" }}
                  ></div>
                  <img
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
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
            {blogId ? "Update" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

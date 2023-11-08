import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/BrandSlice";
import { getCategories } from "../features/productCategory/CategorySlice";
import { getColors } from "../features/color/ColorSlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { TiUpload } from "react-icons/ti";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProduct, resetState } from "../features/product/ProductSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tag: yup.string().required("Tag is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  const navigate = useNavigate();
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const colors = [];
  colorState.forEach((color) => {
    colors.push({ _id: color._id, color: color.title });
  });
  const imgs = [];
  imgState.forEach((img) => {
    imgs.push({ public_id: img.public_id, url: img.url });
  });
  useEffect(() => {
    formik.values.images = imgs;
  }, [imgs]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      tag: "",
      category: "",
      color: [],
      quantify: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-product");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3">Add Product</h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div className="my-3">
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
        <div className="mb-3">
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
        </div>
        <div className="mb-3">
          <span>Category</span>
          <select
            className="form-control"
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
        </div>
        <div className="mb-3">
          <span>Tags</span>
          <select
            className="form-control"
            name="tag"
            id="tag"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tag}
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="featured">Feature</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
        </div>
        <div className="mb-3">
          <span>Brand</span>
          <select
            className="form-control"
            name="brand"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            id="brand"
          >
            {brandState.map((brand, index) => (
              <option key={index} value={brand.title}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <span>Color</span>
          <Multiselect
            dataKey="_id"
            textField="color"
            value={formik.values.color} // Set the value to formik's value
            data={colors}
            onChange={(value) => formik.setFieldValue("color", value)} // Use setFieldValue to update the color field in formik
          />
        </div>
        <div className="mb-3">
          <CustomInput
            type="string"
            label="Enter Product Quantify"
            name="quantify"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantify}
          />
        </div>
        <div className="bg-white border-1 p-4 text-center">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <TiUpload className="fs-1" />
                  <p>Drag 'n' drop some files here, or click to select files</p>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

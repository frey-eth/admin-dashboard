import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  createProduct,
  getProduct,
  resetState,
  updateProduct, 
} from "../features/product/ProductSlice";
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
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
    }
  }, [getProductId]);

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

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productData,
    updatedProduct,
  } = newProduct;

  useEffect(() => {
    if (isSuccess && (createdProduct || updatedProduct)) {
      const successMessage =
        getProductId !== undefined
          ? "Product updated successfully!"
          : "Product added successfully!";
      toast.success(successMessage);
      dispatch(resetState());
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading]);
  const colors = [];
  colorState.forEach((color) => {
    colors.push({ _id: color._id, color: color.title });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productData?.title || "",
      description: productData?.description || "",
      price: productData?.price || "",
      brand: productData?.brand || "",
      tag: productData?.tag || "",
      category: productData?.category || "",
      color: productData?.color || [],
      quantity: productData?.quantity || "",
      images: productData?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        dispatch(updateProduct({ _id: getProductId, ...values }));
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-3">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
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
            value={formik.values.color}
            data={colors}
            onChange={(value) => formik.setFieldValue("color", value)}
          />
        </div>
        <div className="mb-3">
          <CustomInput
            type="string"
            id="quantity"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
        </div>
        <div className="bg-white border-1 p-4 text-center">
          <Dropzone
            onDrop={(acceptedFiles) =>
              dispatch(uploadImg(acceptedFiles)).then(() => {
                const updatedImage = [...formik.values.images, ...imgState];
                formik.setFieldValue("images", updatedImage);
              })
            }
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
          {formik.values.images?.map((image, index) => {
            return (
              <div className="position-relative" key={index}>
                <div
                  type="button"
                  onClick={() => {
                    dispatch(deleteImg(image.public_id));
                    const images = formik.values.images.filter(
                      (img) => img.public_id !== image.public_id
                    );
                    formik.setFieldValue("images", images);
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
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

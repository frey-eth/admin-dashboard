import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/ProductSlice";
import brandReducer from "../features/brand/BrandSlice";
import categoryReducer from "../features/productCategory/CategorySlice";
import colorReducer from "../features/color/ColorSlice";
import blogReducer from "../features/blog/BlogSlice";
import blogCategoryReducer from "../features/blogCategory/blogCategorySlice";
import enquiryReducer from "../features/enquiry/EnquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/CouponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    color: colorReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});

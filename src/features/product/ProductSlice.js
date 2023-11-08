import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./ProductService";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPi) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

export const createProduct = createAsyncThunk(
  "product/create",
  async (product, thunkAPi) => {
    try {
      return await productService.createProduct(product);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  createdProduct: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;

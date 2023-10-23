import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./CategoryService";

export const getCategories = createAsyncThunk(
  "product-category/get-categories",
  async (thunkAPi) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default categorySlice.reducer;

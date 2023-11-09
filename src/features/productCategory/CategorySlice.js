import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createCategory = createAsyncThunk(
  "product-category/create-category",
  async (dataCategory, thunkAPi) => {
    try {
      return await categoryService.createCategory(dataCategory);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  createdCategory: "",
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
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
}); 

export default categorySlice.reducer;

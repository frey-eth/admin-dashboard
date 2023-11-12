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

export const getCategory = createAsyncThunk(
  "product-category/get-category",
  async (id, thunkAPi) => {
    try {
      return await categoryService.getCategory(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "product-category/delete-category",
  async (id, thunkAPi) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "product-category/update-category",
  async (categoryData, thunkAPi) => {
    try {
      return await categoryService.updateCategory(categoryData);
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
      //create category
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
      //get Category
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dataCategory = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCategory = action.payload;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./BrandService";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPi) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (dataBrand, thunkAPi) => {
    try {
      return await brandService.createBrand(dataBrand);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brand/get-brand",
  async (id, thunkAPi) => {
    try {
      return await brandService.getBrand(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPi) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPi) => {
    try {
      return await brandService.updateBrand(brand);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  createdBrand: "",
  message: "",
};
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dataBrand = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBrand = action.payload;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload._id
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBrand = action.payload;
        state.brands = state.brands.map((brand) =>
          brand._id === action.payload._id ? action.payload : brand
        );
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;

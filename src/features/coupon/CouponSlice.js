import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import counponService from "./CouponService";

export const getCoupons = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPi) => {
    try {
      return await counponService.getCoupons();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (coupon, thunkAPi) => {
    try {
      return await counponService.createCoupon(coupon);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getCoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPi) => {
    try {
      return await counponService.getCoupon(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id, thunkAPi) => {
    try {
      return await counponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (couponData, thunkAPi) => {
    try {
      return await counponService.updateCoupon(couponData);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  createdCoupon: "",
  message: "",
};
export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      ///get
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.couponData = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      ///delete
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload._id
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      ///update
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCoupon = action.payload;
        state.coupons = state.coupons.map((coupon) =>
          coupon._id == action.payload._id ? action.payload : coupon
        );
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;

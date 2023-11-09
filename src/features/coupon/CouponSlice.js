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
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;

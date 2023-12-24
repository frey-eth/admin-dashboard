import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthServices";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "user/admin-login",
  async (user, thunkAPi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getMonthWiseOrderIncome = createAsyncThunk(
  "user/getMonthOrderIncome",
  async (thunkAPi) => {
    try {
      return await authService.getMonthWiseOrderIncome();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getMonthWiseOrderCount = createAsyncThunk(
  "user/getMonthWiseOrderCount",
  async (thunkAPi) => {
    try {
      return await authService.getMonthWiseOrderCount();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getYearWiseOrderIncome = createAsyncThunk(
  "user/getYearWiseOrderIncome",
  async (thunkAPi) => {
    try {
      return await authService.getYearWiseOrderIncome();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPi) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-order",
  async (orderData, thunkAPi) => {
    try {
      return await authService.updateOrderStatus(orderData);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedOrder = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //getMonthOrderIncome
      .addCase(getMonthWiseOrderIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthWiseOrderIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.monthOrderIncome = action.payload;
      })
      .addCase(getMonthWiseOrderIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //getMonthWiseOrderCount
      .addCase(getMonthWiseOrderCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthWiseOrderCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.monthOrderCount = action.payload;
      })
      .addCase(getMonthWiseOrderCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //getYearWiseOrderIncome
      .addCase(getYearWiseOrderIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearWiseOrderIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.yearOrderIncome = action.payload;
      })
      .addCase(getYearWiseOrderIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;

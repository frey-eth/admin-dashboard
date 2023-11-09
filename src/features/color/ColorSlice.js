import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./ColorService";

export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPi) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "product-color/create-color",
  async (dataColor, thunkAPi) => {
    try {
      return await colorService.createColor(dataColor);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;

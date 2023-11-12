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

export const deleteColor = createAsyncThunk(
  "product-color/delete",
  async (id, thunkAPi) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getColor = createAsyncThunk(
  "product-color/get",
  async (id, thunkAPi) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "product-color/update",
  async (color, thunkAPi) => {
    try {
      return await colorService.updateColor(color);
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
      //create color
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
      //delete color
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = state.colors.filter(
          (color) => color._id !== action.payload._id
        );
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //get Color
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colorData = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //update Color
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedColor = action.payload;
        state.colors = state.colors.map((color) =>
          color._id === action.payload._id ? action.payload : color
        );
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;

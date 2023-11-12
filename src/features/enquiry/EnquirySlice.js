import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./EnquiryService";

export const getEnquiries = createAsyncThunk(
  "Enquiry/get-enquiries",
  async (thunkAPi) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "Enquiry/Delete",
  async (id, thunkAPi) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);
export const getEnquiry = createAsyncThunk(
  "Enquiry/get-enquiry",
  async (id, thunkAPi) => {
    try {
      return await enquiryService.getEnquiry(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateEquiry = createAsyncThunk(
  "Enquiry/update-enquiry",
  async (enq, thunkAPi) => {
    try {
      return await enquiryService.updateEquiry(enq);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedEnquiry = action.payload;
        state.enquiries = state.enquiries.filter(
          (enq) => enq._id !== action.payload._id
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enqData = action.payload;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateEquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;

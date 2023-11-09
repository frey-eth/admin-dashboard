import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./BlogService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPi) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPi.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const createBlog = createAsyncThunk(
  "Blog/create",
  async (blog, thunkAPi) => {
    try {
      return await blogService.createBlog(blog);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;

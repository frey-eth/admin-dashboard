import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./BlogService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPi) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPi.rejectWithValue(error);
  }
});

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

export const getBlog = createAsyncThunk("blog/get", async (id, thunkAPi) => {
  try {
    return await blogService.getBlog(id);
  } catch (error) {
    return thunkAPi.rejectWithValue(error);
  }
});

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPi) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (blogData, thunkAPi) => {
    try {
      return await blogService.updateBlog(blogData);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

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
      //getBlog
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogData = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //deleteBlog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBlog = action.payload;
        state.blogs = state.blogs.map((blog) =>
          blog._id == action.payload._id ? action.payload : blog
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;

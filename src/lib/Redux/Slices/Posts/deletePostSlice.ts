import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { getUserPosts } from "./userPostsSlice";
const initialState = {
  id: "",
  isLoading: false,
};
export const deletePost = createAsyncThunk(
  "deletePostSlice/deletePost",
  async (id: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await authAxios.delete(`/posts/${id}`);
      dispatch(getUserPosts(id));
      console.log("res", res);
      return res.data.post.id;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

const deletePostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state,action) => {
      state.isLoading = false;
      state.id = action.payload;
      console.log("state", action.payload);
      
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default deletePostSlice.reducer;

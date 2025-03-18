import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../Interfaces/types";
import { authAxios } from "@/AxiosConfig/AxiosConfig";
const initialState: { post: Post | null; isLoading: boolean } = {
  post: null,
  isLoading: false,
};
export const getSinglePost = createAsyncThunk(
  "singlePostSlice/getSinglePost",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await authAxios.get(`/posts/${id}`);
      console.log("res", res.data);
      return res.data.post;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

const singlePostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default singlePostSlice.reducer;

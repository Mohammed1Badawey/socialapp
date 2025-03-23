import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../../Interfaces/types";
import { authAxios } from "@/AxiosConfig/AxiosConfig";
const initialState: { allPosts: Post[] | null; isLoading: boolean } = {
  allPosts: null,
  isLoading: false,
};
export const getAllPosts = createAsyncThunk(
  "postsSlice/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAxios.get("/posts?limit=12");
      console.log("res", res.data);
      return res.data.posts;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;

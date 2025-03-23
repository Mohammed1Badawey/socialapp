import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comments } from "../../../../Interfaces/types";
import { authAxios } from "@/AxiosConfig/AxiosConfig";

const initialState: {
  comments: Comments[] | null;
  isLoading: boolean;
  error: string | null;
} = {
  comments: null,
  isLoading: false,
  error: null,
};

export const getPostComments = createAsyncThunk(
  "getPostCommentsSlice/getPostComments",
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await authAxios.get(`/posts/${postId}/comments`);
      console.log("comments response", res.data);
      return res.data.comments;
    } catch (err: any) {
      console.log("comments error", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

const getPostCommentsSlice = createSlice({
  name: "postComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default getPostCommentsSlice.reducer;

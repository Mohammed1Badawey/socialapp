import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSinglePost } from "../Posts/singlePostSlice";

const initialState = {
  commentId: "",
  isLoading: false,
  error: null,
};

export const deleteComment = createAsyncThunk(
  "deleteCommentSlice/deleteComment",
  async ({
    commentId,
    postId,
  } : any , { rejectWithValue,dispatch }) => {
    try {
      const res = await authAxios.delete(`/comments/${commentId}`);
      dispatch(getSinglePost(postId));
      console.log("comment delete response", res);
      return res.data.comment.id;
    } catch (err: any) {
      console.log("CommentDeleteErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

const deleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentId = action.payload;
        console.log("comment deleted successfully", action.payload);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default deleteCommentSlice.reducer;

import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getSinglePost } from "../Posts/singlePostSlice";

const initialState = {
  content: "",
  commentId: "",
  isLoading: false,
  error: null,
};

type CommentUpdateData = {
  content: string;
  commentId: string;
};

export const updateComment = createAsyncThunk(
  "updateCommentSlice/updateComment",
  async (commentData: CommentUpdateData, { rejectWithValue, dispatch }) => {
    try {
      const res = await authAxios.put(`/comments/${commentData.commentId}`, {
        content: commentData.content,
      });
      dispatch(getSinglePost(res.data.comment.post));
      return res.data;
    } catch (err: any) {
      console.log("CommentUpdateErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const updateCommentSlice = createSlice({
  name: "updateComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        console.log("comment updated successfully", action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateComment.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default updateCommentSlice.reducer;

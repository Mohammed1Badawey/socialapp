import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getSinglePost } from "../Posts/singlePostSlice";

const initialState = {
  content: "",
  postId: "",
  isLoading: false,
  error: null,
};

type CommentData = {
  content: string;
  post: string;
};

export const createComment = createAsyncThunk(
  "createCommentSlice/createComment",
  async (commentData: CommentData, { rejectWithValue,dispatch }) => {
    try {
      const res = await authAxios.post("/comments", commentData);
      dispatch(getSinglePost(res.data.comments[0].post))
      return res.data;
    } catch (err: any) {
      console.log("CommentDataErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const createCommentSlice = createSlice({
  name: "createComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        console.log("comment created successfully", action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default createCommentSlice.reducer;

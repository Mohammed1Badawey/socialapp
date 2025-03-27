import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostDataIntiStateType } from "../../../../Interfaces/types";

const initialState: PostDataIntiStateType = {
  body: "",
  image: null,
  isLoading: false,
  error: null,
};

export const updatePost = createAsyncThunk(
  "updatePostSlice/updatePost",
  async (
    { postData, id }: { postData: FormData; id: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const res = await authAxios.put(`/posts/${id}`, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err: any) {
      console.log("PostDataErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const updatePostSlice = createSlice({
  name: "updatePost",
  initialState,
  reducers: {
    handelUpdateForm: (state, action) => {
      state.body = action.payload.body;
      state.image = action.payload.image;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log("success", action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default updatePostSlice.reducer;

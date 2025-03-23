import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostDataState } from "../../../../Interfaces/types";

const initialState: PostDataState = {
  body: "",
  image: null,
  isLoading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  "createPostSlice/createPost",
  async (postData: FormData, { rejectWithValue }) => {
    try {
      const res = await authAxios.post("/posts", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err: any) {
      console.log("PostDataErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        console.log("success", action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default createPostSlice.reducer;

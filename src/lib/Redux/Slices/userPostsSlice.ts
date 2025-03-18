import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../Interfaces/types";
import { authAxios } from "@/AxiosConfig/AxiosConfig";

interface UserPostsState {
  userPosts: Post[] | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: UserPostsState = {
  userPosts: null,
  isLoading: false,
  error: null,
  hasMore: true,
};

export const getUserPosts = createAsyncThunk(
  "userPosts/getUserPosts",
  async (userId: any, { rejectWithValue }) => {
    try {
      const res = await authAxios.get(`/users/${userId}/posts`);
      console.log("User posts:", res);
      return res.data.posts;
    } catch (err: any) {
      console.log("Error fetching user posts:", err);
      return rejectWithValue(
        err.response?.data?.error ||
          "An error occurred while fetching user posts"
      );
    }
  }
);

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    clearUserPosts: (state) => {
      state.userPosts = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userPostsSlice.reducer;

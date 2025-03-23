import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
  "logoutSlice/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from localStorage
      localStorage.removeItem("socialUserToken");
      return { success: true };
    } catch (err: any) {
      return rejectWithValue("Logout failed");
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
};

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      });
  },
});

export default logoutSlice.reducer;

import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type ChangePasswordState = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
};

type ChangePasswordData = {
  password: string;
  newPassword: string;
};

const initialState: ChangePasswordState = {
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const changePassword = createAsyncThunk(
  "changePasswordSlice/changePassword",
  async (passwordData: ChangePasswordData, { rejectWithValue }) => {
    try {
      const res = await authAxios.patch("/users/change-password", passwordData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    resetChangePasswordState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message =
          action.payload?.message || "Password changed successfully";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;

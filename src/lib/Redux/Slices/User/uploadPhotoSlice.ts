import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type UploadPhotoState = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
};

const initialState: UploadPhotoState = {
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

export const uploadPhoto = createAsyncThunk(
  "uploadPhotoSlice/uploadPhoto",
  async (photoData: FormData, { rejectWithValue }) => {
    try {
      const res = await authAxios.put("/users/upload-photo", photoData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const uploadPhotoSlice = createSlice({
  name: "uploadPhoto",
  initialState,
  reducers: {
    resetUploadPhotoState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(uploadPhoto.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.message = "Profile photo updated successfully";
        state.error = null;
      })
      .addCase(uploadPhoto.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetUploadPhotoState } = uploadPhotoSlice.actions;
export default uploadPhotoSlice.reducer;

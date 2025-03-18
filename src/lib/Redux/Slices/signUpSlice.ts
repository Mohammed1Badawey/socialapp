import { publicAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignUpState } from "../../../Interfaces/types";

const initialState: SignUpState = {
  SignUp: {},
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  "signUpSlice/register",
  async (signUpData: any, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post("/users/signup", signUpData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SignUp = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default signUpSlice.reducer;

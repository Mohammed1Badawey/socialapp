import { publicAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignInState, SignInData } from "../../../Interfaces/types";

const initialState: SignInState = {
  message: "",
  token: "",
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const signIn = createAsyncThunk(
  "signInSlice/signIn",
  async (signInData: SignInData, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post("/users/signin", signInData);
      console.log("signIn", res.data);
      return res.data;
    } catch (err: any) {
      console.log("signInErr", err);
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const signInSlice = createSlice({
  name: "SignIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("success", action);
        state.isLoading = false;
        localStorage.setItem("socialUserToken", action.payload.token);
        state.message = action.payload.message;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export default signInSlice.reducer;

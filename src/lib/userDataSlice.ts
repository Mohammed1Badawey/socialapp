import { authAxios } from "@/Api/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserState } from "../Interfaces/types";

const initialState: LoggedUserState = {
  _id: "",
  name: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  photo: "",
  createdAt: "",
};

export const loggedUser = createAsyncThunk(
  "loggedUserSlice/loggedUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAxios.get("/users/profile-data");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "An error occurred");
    }
  }
);

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggedUser.pending, (_, action) => {
        console.log("pending", action);
      })
      .addCase(loggedUser.fulfilled, (_, action) => {
        console.log("success", action);
      })
      .addCase(loggedUser.rejected, (_, action: PayloadAction<any>) => {
        console.log("rejected", action);
      });
  },
});

export default loggedUserSlice.reducer;

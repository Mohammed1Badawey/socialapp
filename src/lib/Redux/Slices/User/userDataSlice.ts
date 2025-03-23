import { authAxios } from "@/AxiosConfig/AxiosConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserState } from "../../../../Interfaces/types";

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
      .addCase(loggedUser.fulfilled, (state, action) => {
        console.log("success", action);
        state._id = action.payload.user._id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.dateOfBirth = action.payload.user.dateOfBirth;
        state.gender = action.payload.user.gender;
        state.photo = action.payload.user.photo;
        state.createdAt = action.payload.user.createdAt;
      })
      .addCase(loggedUser.rejected, (_, action: PayloadAction<any>) => {
        console.log("rejected", action);
      });
  },
});

export default loggedUserSlice.reducer;

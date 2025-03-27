import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("socialUserToken");
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { logoutUser } = logoutSlice.actions;
export default logoutSlice.reducer;

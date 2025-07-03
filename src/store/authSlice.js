// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "../utils/Thunks";

const initialState = {
  //   token: localStorage.getItem("token") || null,
  accessToken: null,
  //   isAuthenticated: !!localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem("token");
    //   state.token = null;
    //   state.user = null;
    //   state.isAuthenticated = false;
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        console.log(action);
      });
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;

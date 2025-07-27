import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "../utils/Thunks";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.data = action.payload.data.data;
          state.status = action.payload.status;
        } else {
          state.error =
            action.payload.message || "Failed to load profile data!";
        }
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = action.payload.status;
        state.loading = false;
        state.error = action.payload.data?.message || "Failed to load data!";
      });
  },
});

export default profileSlice.reducer;

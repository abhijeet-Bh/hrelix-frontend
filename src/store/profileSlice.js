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
        console.log(action.payload);
        if (action.payload.data.success) {
          state.data = action.payload.data.data;
          state.status = action.payload.status;
        } else {
          state.error = action.payload.message;
        }
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.log(action.payload.data);
        state.status = action.payload.status;
        state.loading = false;
        state.error = action.payload.data.message;
      });
  },
});

export default profileSlice.reducer;

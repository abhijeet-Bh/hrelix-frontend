import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/constants";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email: username,
        password: password,
      });

      const { accessToken } = response.data.data;
      console.log(response.data.data);

      localStorage.setItem("accessToken", accessToken);
      if (response.data.success) {
        return { accessToken };
      } else {
        return rejectWithValue(response.data || "Login failed");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/employees/profile`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      // This becomes the action.payload in the fulfilled reducer
      return {
        data: response.data,
        status: response.status,
      };
    } catch (e) {
      return rejectWithValue({
        data: e.response?.data || null,
        status: e.response?.status || 500,
      });
    }
  }
);

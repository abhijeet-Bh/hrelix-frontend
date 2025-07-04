import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = "http://localhost:8080";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${LOGIN_URL}/api/v1/auth/login`, {
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

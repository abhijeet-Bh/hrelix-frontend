// src/api/dashboardApi.js
import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../store"; // adjust path if needed

export const fetchDashboardData = async () => {
  const token = store.getState().auth.accessToken;

  const response = await axios.get(`${BASE_URL}/api/v1/home`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

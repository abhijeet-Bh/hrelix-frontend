import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../store";

const getAuthHeaders = () => {
  const token = store.getState().auth.accessToken;
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Add new Leave
export const addNewLeave = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/leaves`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error Adding Leave:", error);
    // throw error;
    return error.response.data;
  }
};

// Get leaves
export const getLeaves = async (pageNo) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/leaves`, {
      params: {
        page: pageNo,
        size: 25,
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response?.data;
  }
};

// Change status
export const changeStatus = async (id, data) => {
  try {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.put(
      `${BASE_URL}/api/v1/leaves/${id}/status`,
      formData.toString(),
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Leave:", error);
    // throw error;
    return error.response.data;
  }
};

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
    console.error("Error updating CTC:", error);
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
        size: 2,
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response?.data;
  }
};

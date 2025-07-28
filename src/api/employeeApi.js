import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../store";

export const searchEmployeeByEmail = async (email) => {
  const token = store.getState().auth.accessToken;

  const response = await axios.get(
    `${BASE_URL}/api/v1/employees/by-email/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

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

//search employee by either email, firstname or lastname.

export const searchEmployeeByEmailOrName = async (searchKey) => {
  const token = store.getState().auth.accessToken;

  const response = await axios.get(
    `${BASE_URL}/api/v1/employees/search/${searchKey}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

//get all employees in organisation.

export const getAllEmployees = async () => {
  const token = store.getState().auth.accessToken;

  const response = await axios.get(`${BASE_URL}/api/v1/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

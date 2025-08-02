import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from "../store";

const getAuthHeaders = () => {
  const token = store.getState().auth.accessToken;
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Search employee by email
export const searchEmployeeByEmail = async (email) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/employees/by-email/${email}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data.data;
};

// Search employee by email, firstname, or lastname
export const searchEmployeeByEmailOrName = async (searchKey) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/employees/search/${searchKey}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data.data;
};

// Get all employees
export const getAllEmployees = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/employees`, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

// Update personal details
export const updatePersonalDetails = async (id, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/employees/${id}`,
      data,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating personal details:", error);
    // throw error;
    return error.response.data;
  }
};

// Update CTC
export const updateCTC = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/payroll/generate-ctc`,
      data,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating CTC:", error);
    // throw error;
    return error.response.data;
  }
};

// Update deductions
export const updateDeductions = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/payroll/generate-deductions`,
      data,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating deductions:", error);
    // throw error;
    return error.response.data;
  }
};

// Update bank details
export const updateBankDetails = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/payroll/set-bank-details`,
      data,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating bank details:", error);
    // throw error;
    return error.response.data;
  }
};

// Upload profile Picture
export const uploadProfilePicture = async (employeeId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/employees/${employeeId}/upload-profile`,
      formData,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    // throw error;
    return error.response.data;
  }
};

// Create Employee
export const createEmployee = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/employees`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    // throw error;
    return error.response.data;
  }
};

// Delete Employee
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/employees/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    // throw error;
    return error.response.data;
  }
};

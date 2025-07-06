import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchDashboardData = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/v1/home`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

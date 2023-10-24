import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const authToken = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.get(`${baseUrl}user/get-all-orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;

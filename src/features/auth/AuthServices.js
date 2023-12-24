import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getMonthWiseOrderIncome = async () => {
  const response = await axios.get(
    `${baseUrl}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};

const getMonthWiseOrderCount = async () => {
  const response = await axios.get(
    `${baseUrl}user/getMonthWiseOrderCount`,
    config
  );
  return response.data;
};

const getYearWiseOrderIncome = async () => {
  const response = await axios.get(`${baseUrl}user/getYearOrderIncome`, config);
  return response.data;
};

const getOrders = async () => {
  const authToken = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.get(`${baseUrl}user/get-orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const updateOrderStatus = async (order) => {
  const response = await axios.put(
    `${baseUrl}user/update-order/${order._id}`,
    { orderStatus: order.orderStatus },
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  updateOrderStatus,
  getMonthWiseOrderIncome,
  getMonthWiseOrderCount,
  getYearWiseOrderIncome,
};

export default authService;

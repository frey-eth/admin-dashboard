import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getUsers = async () => {
  const authToken = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.get(`${baseUrl}user/all-users`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;

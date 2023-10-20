import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/login`, userData);
  console.log(response);
};

const authService = {
  login,
};

export default authService;

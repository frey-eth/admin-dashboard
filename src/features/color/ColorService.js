import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getColors = async () => {
  const response = await axios.get(`${baseUrl}color/`);
  return response.data;
};

const colorService = {
  getColors,
};

export default colorService;

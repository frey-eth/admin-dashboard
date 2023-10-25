import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const uploadImg = async (data) => {
  const response = await axios.post(`${baseUrl}`, data, config);
  return response.data;
};

const uploadService = {
  uploadImg,
};

export default uploadService;

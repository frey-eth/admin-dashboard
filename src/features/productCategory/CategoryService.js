import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getCategories = async () => {
  const response = await axios.get(`${baseUrl}category/`);
  return response.data;
};

const createCategory = async (brand) => {
  const response = await axios.post(`${baseUrl}category/`, brand, config);
  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
};

export default categoryService;

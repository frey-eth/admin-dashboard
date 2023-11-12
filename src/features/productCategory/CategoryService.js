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

const deleteCategory = async (id) => {
  const response = await axios.delete(`${baseUrl}category/${id}`, config);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(`${baseUrl}category/${id}`, config);
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axios.put(
    `${baseUrl}category/${category._id}`,
    category,
    config
  );
  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default categoryService;

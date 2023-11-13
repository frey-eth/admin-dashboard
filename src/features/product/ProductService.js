import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${baseUrl}product/create`,
    product,
    config
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${baseUrl}product/${id}`, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseUrl}product/${id}`, config);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${baseUrl}product/${product._id}`,
    product,
    config
  );
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;

import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${baseUrl}product/`,product, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;

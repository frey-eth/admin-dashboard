import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getBrands = async () => {
  const response = await axios.get(`${baseUrl}brand/`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${baseUrl}brand/`, brand, config);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${baseUrl}brand/${id}`, config);
  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${baseUrl}brand/${id}`, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${baseUrl}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  deleteBrand,
  getBrand,
  updateBrand,
};

export default brandService;

import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getColors = async () => {
  const response = await axios.get(`${baseUrl}color/`);
  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${baseUrl}color/`, color, config);
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${baseUrl}color/${id}`, config);
  return response.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${baseUrl}color/${id}`, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${baseUrl}color/${color._id}`,
    color,
    config
  );
  return response.data;
};
const colorService = {
  getColors,
  createColor,
  deleteColor,
  getColor,
  updateColor,
};

export default colorService;

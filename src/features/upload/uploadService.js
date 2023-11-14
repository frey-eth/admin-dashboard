import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const uploadImg = async (data) => {
  const response = await axios.put(`${baseUrl}upload/`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  console.log(response);
  const response = await axios.delete(`${baseUrl}upload/${id}`, config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;

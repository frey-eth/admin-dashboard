import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${baseUrl}blog/`, blog, config);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}blog/${id}`);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}blog/${id}`, config);
  return response.data;
};

const updateBlog = async (blogData) => {
  const response = await axios.put(
    `${baseUrl}blog/${blogData._id}`,
    blogData,
    config
  );
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
};

export default blogService;

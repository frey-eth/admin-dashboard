import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getBlogCategories = async () => {
  const response = await axios.get(`${baseUrl}blogcategory/`);
  return response.data;
};

const createBlogCategory = async (blogCat) => {
  const response = await axios.post(`${baseUrl}blogcategory/`, blogCat, config);
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${baseUrl}blogcategory/${id}`, config);
  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${baseUrl}blogcategory/${id}`, config);
  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${baseUrl}blogcategory/${blogCat.id}`,
    { title: blogCat.dataBlogCat.title },
    config
  );
  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default blogCategoryService;

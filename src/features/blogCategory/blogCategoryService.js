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
const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default blogCategoryService;

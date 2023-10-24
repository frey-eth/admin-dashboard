import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getBlogCategories = async () => {
  const response = await axios.get(`${baseUrl}blogcategory/`);
  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
};

export default blogCategoryService;

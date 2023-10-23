import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getCategories = async () => {
  const response = await axios.get(`${baseUrl}category/`);
  return response.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;

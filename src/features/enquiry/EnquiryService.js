import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getEnquiries = async () => {
  const authToken = JSON.parse(localStorage.getItem("user")).token;

  const response = await axios.get(`${baseUrl}enquiry/`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const enquiryService = {
  getEnquiries,
};

export default enquiryService;

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

const createEnquiry = async (enquiry) => {
  const response = await axios.post(`${baseUrl}enquiry`, enquiry, config);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${baseUrl}enquiry/${id}`, config);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${baseUrl}enquiry/${id}`);
  return response.data;
};

const updateEquiry = async (enq) => {
  const response = await axios.put(
    `${baseUrl}enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  createEnquiry,
  deleteEnquiry,
  getEnquiry,
  updateEquiry,
};

export default enquiryService;

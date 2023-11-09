import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { config } from "../../utils/axios_config";

const getCoupons = async () => {
  const response = await axios.get(`${baseUrl}coupon/`, config);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${baseUrl}coupon/`, coupon, config);
  return response.data;
};

const counponService = {
  getCoupons,
  createCoupon,
};

export default counponService;

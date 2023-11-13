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

const getCoupon = async (id) => {
  const response = await axios.get(`${baseUrl}coupon/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseUrl}coupon/${id}`, config);
  return response.data;
};

const updateCoupon = async (couponData) => {
  const response = await axios.put(
    `${baseUrl}coupon/${couponData._id}`,
    couponData,
    config
  );
  return response.data;
};

const counponService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default counponService;

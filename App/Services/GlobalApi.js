import axios from "axios";

const { EXPO_PUBLIC_IP_ADDRESS, EXPO_PUBLIC_STRAPI_API_KEY } = process.env;

const BASE_URL = `http://192.168.31.234:1337/api`;
const API_KEY = `${EXPO_PUBLIC_STRAPI_API_KEY}`;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer" + API_KEY,
  },
});

const getSlider = () => {
  return AxiosInstance.get("/sliders?populate=*");
};

const getCategories = () => {
  return AxiosInstance.get("/categories?populate=*");
};

const getPremiumHospitals = () => {
  return AxiosInstance.get("/hospitals?filters[Premium][$eq]=true&populate=*");
};

const getHospitalsByCategory = (category) => {
  return AxiosInstance.get(
    `/hospitals?filters[categories][Name][$in]=${category}&populate=*`
  );
};

export default {
  getSlider,
  getCategories,
  getPremiumHospitals,
  getHospitalsByCategory,
};

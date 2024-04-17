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

const getDoctorsByCategory = (category) => {
  return AxiosInstance.get(
    `/doctors?filters[categories][Name][$in]=${category}&populate=*`
  );
};

const createAppointment = (data) => {
  return AxiosInstance.post(`/appointments`, data);
};

const getAllHospitals = () => {
  return AxiosInstance.get("/hospitals?populate=*");
};

const getAllDoctors = () => {
  return AxiosInstance.get("/doctors?populate=*");
};

const getUserAppointments = (email) => {
  return AxiosInstance.get(
    `/appointments?filters[Email][$eq]=${email}&populate[hospitals][populate]=*&populate[doctors][populate]=*`
  );
};

const getDoctorsBySearchName = (searchName) => {
  return AxiosInstance.get(
    `/doctors?filters[$or][0][Name][$contains]=${searchName}&filters[$or][1][Address][$contains]=${searchName}&populate=*`
  );
};

const getHospitalsBySearchName = (searchName) => {
  return AxiosInstance.get(
    `/hospitals?filters[$or][0][Name][$contains]=${searchName}&filters[$or][1][Address][$contains]=${searchName}&populate=*`
  );
};

const addHospitalViews = (data) => {
  return AxiosInstance.put(`/hospitals/1`, data);
};

const deleteAppointment = (id) => {
  return AxiosInstance.delete(`/appointments/${id}`)
}

export default {
  getSlider,
  getCategories,
  getPremiumHospitals,
  getHospitalsByCategory,
  getDoctorsByCategory,
  createAppointment,
  getAllHospitals,
  getAllDoctors,
  getUserAppointments,
  getDoctorsBySearchName,
  getHospitalsBySearchName,
  addHospitalViews,
  deleteAppointment,
};

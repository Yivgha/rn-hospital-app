import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_STRAPI_API_KEY;

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

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
    `/doctors?filters[Name][$contains]=${searchName}&populate=*`
  );
};

const getHospitalsBySearchName = (searchName) => {
  return AxiosInstance.get(
    `hospitals?filters[Name][$contains]=${searchName}&populate=*`
  );
};

const deleteAppointment = (id) => {
  return AxiosInstance.delete(`/appointments/${id}`);
};

const createFavouriteDoctorByUserEmail = (data) => {
  return AxiosInstance.post(`/favourites`, data);
};

const deleteFavouriteDoctorByUserEmail = (favItemId) => {
  return AxiosInstance.delete(`/favourites/${favItemId}`);
};

const getUserFavouriteDoctors = (email) => {
  return AxiosInstance.get(
    `/favourites?filters[UserEmail][$eq]=${email}&populate[doctors][populate]=*&populate=*`
  );
};

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
  deleteAppointment,
  createFavouriteDoctorByUserEmail,
  getUserFavouriteDoctors,
  deleteFavouriteDoctorByUserEmail,
};

import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ************************* Token ****************************

export const axiosToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosToken.interceptors.request.use((config) => {
  let token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import axios from "axios";
import { getCookie } from "cookies-next";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ************************* Token ****************************

// export const axiosToken = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
// });

// axiosToken.interceptors.request.use((config) => {
//   let token = getCookie("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });/
export const axiosToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for base URL
  withCredentials: true, // Ensure credentials (cookies) are included in requests
});

// Add request interceptor to attach cookies
axiosToken.interceptors.request.use(
  (config) => {
    // if (typeof window === "undefined") {
    //   // Server-side: Attach cookies from the request headers
    //   config.headers.cookie = config.headers.cookie || "";
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

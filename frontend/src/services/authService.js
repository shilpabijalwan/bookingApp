import { axiosApi } from "@/Axios/axiosInstance";

export const UserSignUp = async (data) => {
  try {
    const response = await axiosApi.post(`users/register`, data);
    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

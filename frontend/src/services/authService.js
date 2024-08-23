import { axiosApi } from "@/Axios/axiosInstance";
import { Loading } from "@/redux/authSlice";
import { store } from "@/redux/store";

export const UserSignUp = async (data) => {
  try {
    store.dispatch(Loading(true));
    const response = await axiosApi.post(`users/register`, data);
    if (response) {
      store.dispatch(Loading(false));
      return response;
    }
  } catch (error) {
    store.dispatch(Loading(false));
    throw error;
  }
};

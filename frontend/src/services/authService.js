import { axiosApi } from "@/Axios/axiosInstance";
import { Loading } from "@/redux/authSlice";
import { store } from "@/redux/store";

const UserSignUp = async (data) => {
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

// user Login

const userLogin = async (data) => {
  store.dispatch(Loading(true));
  try {
    const response = await axiosApi.post("users/login", data);
    if (response) {
      store.dispatch(Loading(false));
      return response;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(Loading(false));
    throw error;
  }
};

export { UserSignUp, userLogin };

import { axiosApi, axiosToken } from "@/Axios/axiosInstance";
import { Loading, userInfo } from "@/redux/authSlice";
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
      // console.log("response________", response.data?.data);
      // localStorage.setItem(
      //   "userDetails",
      //   JSON.stringify(response.data?.data?.user)
      // );
      return response;
    }
  } catch (error) {
    console.log(error);
    store.dispatch(Loading(false));
    throw error;
  }
};

// const dispatch = useDispatch();
const fetchUserData = async () => {
  try {
    // Make a request to the backend without setting cookies manually
    const response = await axiosToken.get(`/users/getUser`, {});
    // console.log(response.data?.data, "__________>>>>>>>>");
    store.dispatch(userInfo(response.data?.data));
    // return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
export { UserSignUp, userLogin, fetchUserData };

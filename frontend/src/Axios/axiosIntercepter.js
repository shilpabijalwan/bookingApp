// Add a request interceptor
import axios from "axios";
import { toast } from "react-toastify";

export default function () {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (!navigator.onLine) {
        const notify = () =>
          toast("You are offline. Please check your network connection.");
        throw new axios.Cancel(
          "Request canceled due to network connectivity issue"
        );
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axios.onError((error) => {
    if (axios.isCancel(error)) {
      throw error;
    }
    console.log(error);
    switch (error.response.status) {
      case 500: {
        console.log("something went wrong");
      }
      case 409: {
        console.log(error, "error 409");
      }
    }
  });
}

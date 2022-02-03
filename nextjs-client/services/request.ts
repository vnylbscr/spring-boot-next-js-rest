import { END_POINT } from "@lib/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: END_POINT,
  withCredentials: true,
});

const customRequest = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    console.log("onSuccess", response);
    return response;
  };

  const onError = (error: any) => {
    console.log("error is here", error);
    // // Unauthorized error
    // if (error.response?.status === 401) {
    //   userLogout();
    // }
    return error;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error: any) {
    return onError(error);
  }
};

export default customRequest;

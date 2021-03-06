import axios from "axios";
import { API } from "../constants/apiConstant";

const axiosObj = (info) => {
    const { url, method, headers, data } = info;
    const AxiosInstance = axios.create({
        baseURL: API.baseUrls[API.currentEnv],
        headers,
      });

      AxiosInstance.interceptors.request.use(
        (config) => {
            console.log(config)
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
      AxiosInstance.interceptors.response.use(
        (response) => {
          return response.data;
        },
        (error) => {
           return Promise.reject(error.response?error.response.request?error.response.request._response:error.response.data:error);
        }
      );
      return AxiosInstance({ url, method, headers, data });
}

export default axiosObj;
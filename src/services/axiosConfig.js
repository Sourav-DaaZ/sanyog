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
          if(error.response && error.response.data && error.response.data.message){
            return Promise.reject(error.response.data.message);
          }else if(error.response && error.response.request && error.response.request._response){
            return Promise.reject(error.response.request._response);
          }else{
            return Promise.reject(error);
          }
        }
      );
      return AxiosInstance({ url, method, headers, data });
}

export default axiosObj;
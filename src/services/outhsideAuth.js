import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const defaultHeaders = {
  "Content-Type": "application/json",
};

const formDataHeaders = {
  "Content-Type": "multipart/form-data",
};

export const loginApi = async(data) => {
  return await axiosObj({
    url: API.noAuthUrls.loginUser,
    method: 'POST',
    headers: {...defaultHeaders},
    data: data,
  });
};

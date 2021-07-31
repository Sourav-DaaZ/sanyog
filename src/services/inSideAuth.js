import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const InsideAuthApi = () => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const formDataHeaders = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    findUser(data) {
      return axiosObj({
        url: API.noAuthUrls.findUser + '?user_name=' + data,
        method: 'GET',
        headers: {...defaultHeaders},
        data: data,
      });
    },
  };
};

export default InsideAuthApi;

import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const OutsideAuthApi = () => {
  const defaultHeaders = {
      "Content-Type": "application/json",
  };
  const formDataHeaders = {
      "Content-Type": "multipart/form-data",
  };
  return {
    async loginApi(data){
      return await axiosObj({
          url: API.noAuthUrls.loginUser,
          method: 'POST',
          headers: {...defaultHeaders},
          data: data,
        })
      }
    }
}

export default OutsideAuthApi;
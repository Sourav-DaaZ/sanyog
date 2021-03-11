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
      },
      async registerApi(data){
        return await axiosObj({
            url: API.noAuthUrls.registerUser,
            method: 'POST',
            headers: {...defaultHeaders},
            data: data,
          })
        },
      async verifyOtp(data){
        return await axiosObj({
            url: API.noAuthUrls.otpVerify,
            method: 'POST',
            headers: {...defaultHeaders},
            data: data,
          })
        },
    }
}

export default OutsideAuthApi;
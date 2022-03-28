import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const InsideAuthApi = (token) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const formDataHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  return {
    geoApi(data) {
      return axiosObj({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&sensor=true&key=${data.code}`,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
  };
};

export default InsideAuthApi;

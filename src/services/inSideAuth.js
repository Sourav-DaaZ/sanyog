import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const InsideAuthApi = (token) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...((token !== null || token !== '') && {Authorization: 'Bearer ' + token}),
  };
  const formDataHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  return {
    UserData() {
      return axiosObj({
        url: API.noAuthUrls.userData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    GetTrainer() {
      return axiosObj({
        url: API.noAuthUrls.getTrainer,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    GetTraining() {
      return axiosObj({
        url: API.noAuthUrls.getTraining,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    RegularUpdate(data) {
      return axiosObj({
        url: API.noAuthUrls.regularUpdate,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data,
      });
    },
    GetChats() {
      return axiosObj({
        url: API.noAuthUrls.getChats,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    EditTrainer(data) {
      return axiosObj({
        url: API.noAuthUrls.editTrainer,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data
      });
    },
    AddTraining(data) {
      return axiosObj({
        url: API.noAuthUrls.addTraining,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data
      });
    },
    EditChats(data) {
      return axiosObj({
        url: API.noAuthUrls.editChats,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data
      });
    }
  };
};

export default InsideAuthApi;

import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';

const InsideAuthApi = (token) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token !== null || token !== '') && {Authorization: 'Bearer '+token}
  };
  const formDataHeaders = {
    'Content-Type': 'multipart/form-data'
  };

  return {
    AllProject() {
      return axiosObj({
        url: API.noAuthUrls.allProject,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    CreateProject(data) {
      return axiosObj({
        url: API.noAuthUrls.createProject,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data
      });
    },
    CreateTask(data) {
      return axiosObj({
        url: API.noAuthUrls.createTask,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data
      });
    },
    EditTask(data) {
      return axiosObj({
        url: API.noAuthUrls.editTask,
        method: 'PATCH',
        headers: {...defaultHeaders},
        data: data
      });
    },
    AllTask(data) {
      return axiosObj({
        url: API.noAuthUrls.allTask+"?project_id="+data,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
  };
};

export default InsideAuthApi;

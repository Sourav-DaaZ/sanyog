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
        data: data,
      });
    },
    CreateTask(data) {
      return axiosObj({
        url: API.noAuthUrls.createTask,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data,
      });
    },
    EditTask(data) {
      return axiosObj({
        url: API.noAuthUrls.editTask,
        method: 'PATCH',
        headers: {...defaultHeaders},
        data: data,
      });
    },
    AssignTask(data) {
      return axiosObj({
        url: API.noAuthUrls.assignTask,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data,
      });
    },
    AssignProject(data) {
      return axiosObj({
        url: API.noAuthUrls.assignProject,
        method: 'POST',
        headers: {...defaultHeaders},
        data: data,
      });
    },
    GetTaskStatus(data) {
      return axiosObj({
        url: API.noAuthUrls.getTaskStatus + '?task_id=' + data,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    GetAssignedMembers(data) {
      return axiosObj({
        url: API.noAuthUrls.getAssignedMembers + '?id=' + data,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    AllTask(data) {
      return axiosObj({
        url: API.noAuthUrls.allTask + '?project_id=' + data,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    GetTagTask() {
      return axiosObj({
        url: API.noAuthUrls.getTagTask,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
  };
};

export default InsideAuthApi;

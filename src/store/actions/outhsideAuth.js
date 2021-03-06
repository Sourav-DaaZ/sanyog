import axiosObj from '../../services/axiosConfig';

export const loginFunction = (data) => {
    let url = "/login";
const defaultHeaders = {
    "Content-Type": "application/json",
};
  return axiosObj({
    url: url,
    method: 'POST',
    headers: {...defaultHeaders},
    data: data,
  });
};

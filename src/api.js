import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    // const {response} = error;
    // if (response.status === Error.UNAUTHORIZED) {
    //   throw error;
    // }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
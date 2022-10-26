import { HttpStateEnum } from '@/constant/http';
import useUserStore from '@/store/user';
import axios from 'axios';
import {
  showErrorDialog,
  showSuccessNotice,
  showWarningDialog,
} from './message';

const http = axios.create({
  baseURL: '/' + import.meta.env.VITE_API_PREFIX,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userStore = useUserStore();
    if (userStore.token && config.headers) {
      config.headers.Authorization = 'Bearer ' + userStore.token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (
      Object.hasOwn(response.data, 'State') &&
      Object.hasOwn(response.data, 'Msg')
    ) {
      switch (response.data.State) {
        case HttpStateEnum.ERROR:
          showErrorDialog(response.data.Msg);
          break;
        case HttpStateEnum.SUCCESS:
          showSuccessNotice(response.data.Msg);
          break;
        case HttpStateEnum.WARNING:
          showWarningDialog(response.data.Msg);
          break;
        default:
          break;
      }
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;

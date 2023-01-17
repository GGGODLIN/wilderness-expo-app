import { API_BASE_URL, DEBUG_MODE } from '@env';
import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

export const APIRequest = (token?: string) => {
  let headers: { [key: string]: string } = {
    Accept: 'application/json',
  };

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
    };
  }

  const instance = axios.create({
    baseURL: `${API_BASE_URL}`,
    responseType: 'json',
    headers,
  });

  if (DEBUG_MODE) {
    instance.interceptors.request.use((request) => {
      return AxiosLogger.requestLogger(request, { data: true });
    });
    instance.interceptors.response.use(AxiosLogger.responseLogger);
  }

  return instance;
};

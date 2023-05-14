import { AxiosResponse } from 'axios';

import { HTTP as axios } from './axios';

export type UnknownObject = Record<string, unknown>;

export interface ErrorApi {
  statusCode: number;
  error: string;
  message?: string;
}

const timeout = 60000;

const requests = {
  POST<R = UnknownObject, T = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R>> {
    return axios.post(path, data, { timeout });
  },

  DELETE<R = UnknownObject, T = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R>> {
    return axios.delete(path, { data, timeout });
  },

  PUT<R = UnknownObject, T = UnknownObject>(path: string, data?: T): Promise<AxiosResponse<R>> {
    return axios.put(path, data, { timeout });
  },

  GET<R = UnknownObject, T = UnknownObject>(path: string, params?: T): Promise<AxiosResponse<R>> {
    return axios.get(path, {
      params,
      timeout,
    });
  },
};

export { requests };

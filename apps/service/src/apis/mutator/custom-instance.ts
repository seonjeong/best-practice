import Axios from 'axios';
import type { AxiosRequestConfig, GenericAbortSignal } from 'axios';

export const AXIOS_INSTANCE = Axios.create({});

export type OrvalCompatibleAxiosConfig = Omit<AxiosRequestConfig, 'signal'> & {
  signal?: AbortSignal | GenericAbortSignal | undefined;
};

export const customInstance = async <T>(
  config: OrvalCompatibleAxiosConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const axiosConfig = {
    ...config,
    ...options,
  } as AxiosRequestConfig;

  const { data } = await AXIOS_INSTANCE(axiosConfig);

  return data;
};

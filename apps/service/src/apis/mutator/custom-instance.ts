import Axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  GenericAbortSignal,
  InternalAxiosRequestConfig,
} from 'axios';

import { tokenStorage } from '../../auth/tokenStorage';

export type OrvalCompatibleAxiosConfig = Omit<AxiosRequestConfig, 'signal'> & {
  signal?: AbortSignal | GenericAbortSignal | undefined;
};

export const AXIOS_INSTANCE = Axios.create({
  withCredentials: true,
});

const postRefresh = async () => {
  return AXIOS_INSTANCE({ method: 'POST', url: '/refresh' });
};

let refreshPromise: Promise<string | null> | null = null;

const refreshService = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await postRefresh();

      const { accessToken } = res.data;
      tokenStorage.set(accessToken);
      return accessToken;
    } catch {
      tokenStorage.remove();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

AXIOS_INSTANCE.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();

    if (token) {
      if (!config?.headers?.Authorization) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalConfig) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const newToken = await refreshService();

      if (!newToken) {
        return Promise.reject(error);
      }

      originalConfig.headers = originalConfig.headers ?? {};
      originalConfig.headers.Authorization = `Bearer ${newToken}`;

      return AXIOS_INSTANCE(originalConfig);
    }

    return Promise.reject(error);
  },
);

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

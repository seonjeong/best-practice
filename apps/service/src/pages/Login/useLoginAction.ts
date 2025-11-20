import { useNavigate } from 'react-router-dom';

import type { AxiosError } from 'axios';

import { usePostLogin } from '@/apis/generated/api/login/login';
import type { PostLogin200 } from '@/apis/generated/model';

import type { LoginData } from './loginSchema';

import type { LoginErrorCode } from './useLoginError';

interface Props {
  onServerError: (error: LoginErrorCode) => void;
}

const isAxiosError = <T = unknown>(error: unknown): error is AxiosError<T> => {
  return !!(error && typeof error === 'object' && 'isAxiosError' in error);
};

const useLoginAction = ({ onServerError }: Props) => {
  const navigate = useNavigate();

  const onSuccess = async (data: PostLogin200) => {
    localStorage.setItem('accessToken', data.data.accessToken);

    navigate('/');
  };
  const onError = (error: unknown) => {
    if (!isAxiosError(error)) {
      const code: LoginErrorCode = 'UNKNOWN';

      return onServerError(code);
    }

    const { response } = error;

    if (!response) {
      const code: LoginErrorCode = 'NETWORK';
      return onServerError(code);
    }

    const { status } = response;

    let code: LoginErrorCode = 'NETWORK';

    if (status === 400) code = 'VALIDATION_ERROR';
    else if (status === 401) code = 'INVALID_CREDENTIALS';
    else if (status >= 500) code = 'SERVER_ERROR';

    return onServerError(code);
  };

  const mutation = usePostLogin({
    mutation: {
      onSuccess,
      onError,
    },
  });

  const onValid = async (values: LoginData) => {
    await mutation.mutate({ data: values });
  };
  return { onValid };
};

export { useLoginAction };

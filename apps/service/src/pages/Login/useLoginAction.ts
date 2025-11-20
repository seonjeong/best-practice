import { usePostLogin } from '@/apis/generated/api/login/login';

import type { LoginData } from './loginSchema';

interface Props {
  onServerError: (error: unknown) => void;
}

const useLoginAction = ({ onServerError }: Props) => {
  const onSuccess = () => {};
  const onError = (error: unknown) => {
    onServerError(error);
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

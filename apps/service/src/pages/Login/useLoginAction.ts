import { usePostLogin } from '@/apis/generated/api/login/login';

import type { LoginData } from './loginSchema';

const useLoginAction = () => {
  const mutation = usePostLogin();

  const onValid = async (values: LoginData) => {
    try {
      await mutation.mutate({ data: values });
    } catch (error) {
      console.error(error);
    }
  };
  return { onValid };
};

export { useLoginAction };

import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/generated/api/login/login';

import type { LoginData } from './loginSchema';

const useLoginAction = () => {
  const mutation = useMutation({
    mutationFn: async (values: LoginData) => postLogin(values),
  });

  const onValid = async (values: LoginData) => {
    try {
      await mutation.mutate(values);
    } catch (error) {
      console.error(error);
    }
  };
  return { onValid };
};

export { useLoginAction };

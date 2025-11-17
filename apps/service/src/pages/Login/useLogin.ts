import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/generated/api/login/login';

import { loginShema } from './loginSchema';
import type { LoginData } from './loginSchema';

const defaultValues = {
  email: '',
  password: '',
};

const useLogin = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(loginShema),
    defaultValues,
  });

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

  const onSubmit = handleSubmit(onValid);

  return {
    register,
    onSubmit,
  };
};

export { useLogin };

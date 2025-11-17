import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginShema } from './loginSchema';
import type { LoginData } from './loginSchema';

const defaultValues = {
  email: '',
  password: '',
};

const useLogin = () => {
  const { register } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(loginShema),
    defaultValues,
  });

  return {
    register,
  };
};

export { useLogin };

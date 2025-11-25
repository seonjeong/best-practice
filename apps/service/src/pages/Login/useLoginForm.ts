import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginShema } from './loginSchema';
import type { LoginData } from './loginSchema';

const defaultValues = {
  email: '',
  password: '',
};

const useLoginForm = () => {
  const form = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(loginShema),
    defaultValues,
  });

  return form;
};

export { useLoginForm };

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/generated/api/login/login';

import { loginShema } from './loginSchema';
import type { LoginData } from './loginSchema';

type LoginDataFieldName = keyof LoginData;

const defaultValues = {
  email: '',
  password: '',
};

const useLogin = () => {
  const { register, handleSubmit, setFocus } = useForm<LoginData>({
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

  const fieldOrder: LoginDataFieldName[] = ['email', 'password'];

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorField, setErrorField] = useState<LoginDataFieldName | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);

    if (errorField) {
      setFocus(errorField);
    }
  };

  const onInvalid: SubmitErrorHandler<LoginData> = (formErrors) => {
    const firstErrorField = fieldOrder.find((fieldName) => formErrors[fieldName]) as
      | LoginDataFieldName
      | undefined;

    const firstErrorMessage =
      (firstErrorField && formErrors[firstErrorField]?.message) || '입력값 다시 확인해주세요';

    setErrorField(firstErrorField ?? null);
    setErrorMessage(firstErrorMessage);
    setIsErrorModalOpen(true);
  };

  const errorModal = {
    message: errorMessage,
    isOpen: isErrorModalOpen,
    onClose: handleCloseErrorModal,
  };

  const onSubmit = handleSubmit(onValid, onInvalid);

  return {
    register,
    onSubmit,
    errorModal,
  };
};

export { useLogin };

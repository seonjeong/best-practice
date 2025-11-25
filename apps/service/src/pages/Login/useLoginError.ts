import { useState } from 'react';

import type { SubmitErrorHandler } from 'react-hook-form';

import type { LoginData } from './loginSchema';

type LoginDataFieldName = keyof LoginData;

type Props = {
  setFocus: (name: LoginDataFieldName) => void;
};

const useLoginError = (props: Props) => {
  const { setFocus } = props;

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

  return {
    errorModal: {
      message: errorMessage,
      isOpen: isErrorModalOpen,
      onClose: handleCloseErrorModal,
    },
    onInvalid,
  };
};

export { useLoginError };

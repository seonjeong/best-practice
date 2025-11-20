import { useState } from 'react';

import type { SubmitErrorHandler } from 'react-hook-form';

import type { LoginData } from './loginSchema';

type LoginDataFieldName = keyof LoginData;

type Props = {
  setFocus: (name: LoginDataFieldName) => void;
};

const DEFAULT_VALIDATION_ERROR_MESSAGE = '입력값 다시 확인해주세요';

export type LoginErrorCode =
  | 'NETWORK'
  | 'UNKNOWN'
  | 'VALIDATION_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'SERVER_ERROR';

const errorMessageMap = {
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  NETWORK: '서버와 통신할 수 없습니다. 네트워크 상태를 확인해 주세요.',
  VALIDATION_ERROR: 'email, password 형식이 올바르지 않습니다.',
  INVALID_CREDENTIALS: '아이디 또는 비밀번호가 올바르지 않습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
};

const useLoginError = (props: Props) => {
  const { setFocus } = props;

  const fieldOrder: LoginDataFieldName[] = ['email', 'password'];

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorField, setErrorField] = useState<LoginDataFieldName | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const onCloseErrorModal = () => {
    setIsErrorModalOpen(false);

    if (errorField) {
      setFocus(errorField);
    }
  };

  const onErrorMessage = ({
    errorField,
    errorMessage,
  }: {
    errorField: LoginDataFieldName | undefined;
    errorMessage: string;
  }) => {
    setErrorField(errorField ?? null);
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const onInvalid: SubmitErrorHandler<LoginData> = (formErrors) => {
    const firstErrorField = fieldOrder.find((fieldName) => formErrors[fieldName]) as
      | LoginDataFieldName
      | undefined;

    const firstErrorMessage =
      (firstErrorField && formErrors[firstErrorField]?.message) || DEFAULT_VALIDATION_ERROR_MESSAGE;

    onErrorMessage({ errorField: firstErrorField, errorMessage: firstErrorMessage });
  };

  const onServerError = (code: LoginErrorCode) => {
    onErrorMessage({
      errorField: undefined,
      errorMessage: errorMessageMap[code],
    });
  };

  return {
    errorModal: {
      message: errorMessage,
      isOpen: isErrorModalOpen,
      onClose: onCloseErrorModal,
    },
    onInvalid,
    onServerError,
  };
};

export { useLoginError };

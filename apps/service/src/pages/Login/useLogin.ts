import { useLoginForm } from './useLoginForm';
import { useLoginError } from './useLoginError';
import { useLoginAction } from './useLoginAction';

const useLogin = () => {
  const { register, handleSubmit, setFocus } = useLoginForm();
  const { onInvalid, onServerError, errorModal } = useLoginError({ setFocus });
  const { onValid } = useLoginAction({ onServerError });

  const onSubmit = handleSubmit(onValid, onInvalid);

  return {
    register,
    onSubmit,
    errorModal,
  };
};

export { useLogin };

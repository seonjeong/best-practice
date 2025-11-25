import { useLoginForm } from './useLoginForm';
import { useLoginError } from './useLoginError';
import { useLoginAction } from './useLoginAction';

const useLogin = () => {
  const { register, handleSubmit, setFocus } = useLoginForm();
  const { onValid } = useLoginAction();
  const { onInvalid, errorModal } = useLoginError({ setFocus });

  const onSubmit = handleSubmit(onValid, onInvalid);

  return {
    register,
    onSubmit,
    errorModal,
  };
};

export { useLogin };

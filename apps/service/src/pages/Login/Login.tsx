import { useLogin } from './useLogin';

function Login() {
  const { register, onSubmit, errorModal } = useLogin();

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <input id="email" type="email" autoComplete="email" {...register('email')} />
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
        />
        <button type="submit">Login</button>
      </form>

      {errorModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <button onClick={errorModal.onClose}>close</button>
          <p>{errorModal.message}</p>
        </div>
      )}
    </>
  );
}

export { Login };

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <a
      href="#"
      onClick={() => {
        navigate('/login');
      }}
    >
      to go login
    </a>
  );
}

export { Home };

import { useContext } from 'react';

import { authContext } from './AuthContext';

const useAuthContext = () => {
  return useContext(authContext);
};

export { useAuthContext };

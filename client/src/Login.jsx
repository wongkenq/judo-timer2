import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  if (user) console.log(user);
  return (
    <div>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Login;

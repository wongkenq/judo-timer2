import React from 'react';
import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  if (user) console.log(user);
  return (
    // <div>
    //   <Button onClick={() => loginWithRedirect()}>Login</Button>
    //   <Button onClick={logout}>Logout</Button>
    // </div>
    <Container height="90vh">
      <Flex justifyContent="center" alignItems="center" height="50%" direction="column">
        <Image
          src="https://avatars.dicebear.com/api/male/username.svg"
          borderRadius="50%"
          border="1px solid black"
          backgroundColor="#4d4747"
          height="10rem"
        />
        <Box mt="2rem">
          <Flex direction="column" justifyContent="center" alignItems="center" gap="1rem">
            <Text>Hello. Please log in to get all features.</Text>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;

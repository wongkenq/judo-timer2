import { Button, Box, Text, Flex, Select, Container } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { RxReset } from 'react-icons/rx';
import io from 'socket.io-client';

const socketURL = import.meta.env.VITE_APP_SOCKET;
const socket = io.connect(socketURL);

const Control = () => {
  const [clockIsRunning, setClockIsRunning] = useState(false);

  function handleModeSelect(value) {
    socket.emit('send_mode', { value });
  }

  function handleClockIsRunning(value) {
    setClockIsRunning(value);
    socket.emit('send_clockIsRunning', { value });
  }

  function handleResetTimer() {
    socket.emit('send_resetTimer', true);
  }

  return (
    <Container mt="2rem">
      <Box>
        <Flex direction="column" justifyContent="center" alignItems="center" gap="1rem">
          <Select
            onChange={(e) => handleModeSelect(e.target.value)}
            textAlign="center"
            maxWidth={'75%'}
            height="4rem"
            fontSize="2rem"
          >
            <option value="randori">Randori</option>
            <option value="uchikomi">Uchikomi</option>
            <option value="threePerson">Three-Person</option>
            <option value="waterBreak">Water Break</option>
          </Select>
          <Button
            width="75%"
            height="25vh"
            fontSize="5rem"
            onClick={
              clockIsRunning ? () => handleClockIsRunning(false) : () => handleClockIsRunning(true)
            }
          >
            {clockIsRunning ? <CiPause1 /> : <CiPlay1 />}
          </Button>

          <Button width="75%" height="10vh" fontSize="2rem" onClick={handleResetTimer}>
            <RxReset />
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default Control;

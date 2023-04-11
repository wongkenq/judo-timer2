import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import './Timer.css';

const Timer = () => {
  const { colorMode } = useColorMode();
  return (
    <main>
      <h1>Randori</h1>
      <section className="top">
        <Box
          className="left"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <h2>Round</h2>
          <Box>
            <span>3</span>
            <span>/ 6</span>
          </Box>
        </Box>
        <Box
          className="right"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <Box className="clock">
            <Box className="minutes">04</Box>
            <Box className="separator">:</Box>
            <Box className="seconds">00</Box>
          </Box>
          <Box>total time</Box>
        </Box>
      </section>
      <section className="bottom">
        <Box
          className="prepare"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <Box>
            <Box className="minutes">04</Box>
            <Box className="separator">:</Box>
            <Box className="seconds">00</Box>
          </Box>
          <Box>Prepare</Box>
        </Box>
        <Box
          className="round"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <Box>
            <Box className="minutes">04</Box>
            <Box className="separator">:</Box>
            <Box className="seconds">00</Box>
          </Box>
          <Box>Round</Box>
        </Box>
        <Box
          className="warning"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <Box>
            <Box className="minutes">04</Box>
            <Box className="separator">:</Box>
            <Box className="seconds">00</Box>
          </Box>
          <Box>Warning</Box>
        </Box>
        <Box
          className="rest"
          border="1px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="4"
          padding={1}
        >
          <Box>
            <Box className="minutes">04</Box>
            <Box className="separator">:</Box>
            <Box className="seconds">00</Box>
          </Box>
          <Box>Rest</Box>
        </Box>
      </section>
    </main>
  );
};

export default Timer;

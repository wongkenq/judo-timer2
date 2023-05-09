import React, { useEffect, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import './Timer.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Timer = () => {
  const { colorMode } = useColorMode();
  const [timers, setTimers] = useState();
  const { user, isLoading } = useAuth0();
  const [currentMode, setCurrentMode] = useState('randori');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTime, setCurrentTime] = useState({ minutes: 0, seconds: 0 });

  async function loadTimes() {
    const currentUser = await user;

    const times = await axios.get(
      `http://localhost:3001/users/getUser/${currentUser.email}`
    );

    // console.log(times.data);
    setTimers(times.data);
    setCurrentTime({
      minutes: times.data[currentMode].time.minutes,
      seconds: times.data[currentMode].time.seconds,
    });
  }

  useEffect(() => {
    loadTimes();
  }, [isLoading]);

  // useEffect(() => {
  //   setCurrentTime({
  //     minutes: timers[currentMode].time.minutes,
  //     seconds: timers[currentMode].time.seconds,
  //   });
  // }, []);

  return (
    <main>
      {/* {console.log(timers.randori.rounds)} */}
      <h1>{currentMode}</h1>
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
            <span>{currentRound}</span>
            <span>/ {timers && timers[currentMode]['rounds']}</span>
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
            <Box className="minutes">
              {currentTime && String(currentTime.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {currentTime && String(currentTime.seconds).padStart(2, '0')}
            </Box>
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
            <Box className="minutes">
              {timers &&
                String(timers[currentMode].prepare.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers &&
                String(timers[currentMode].prepare.seconds).padStart(2, '0')}
            </Box>
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
            <Box className="minutes">
              {timers &&
                String(timers[currentMode].time.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers &&
                String(timers[currentMode].time.seconds).padStart(2, '0')}
            </Box>
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
            <Box className="minutes">
              {timers &&
                String(timers[currentMode].warning.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers &&
                String(timers[currentMode].warning.seconds).padStart(2, '0')}
            </Box>
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
            <Box className="minutes">
              {timers &&
                String(timers[currentMode].rest.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers &&
                String(timers[currentMode].rest.seconds).padStart(2, '0')}
            </Box>
          </Box>
          <Box>Rest</Box>
        </Box>
      </section>
    </main>
  );
};

export default Timer;

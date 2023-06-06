import React, { useEffect, useState } from 'react';
import { Box, useColorMode, Flex, Button, Spinner, Container } from '@chakra-ui/react';
import './Timer.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { GrPowerReset } from 'react-icons/gr';

const socket = io.connect('http://localhost:3001');

const Timer = () => {
  // const toast = useToast();
  const { colorMode } = useColorMode();
  const { user, isLoading } = useAuth0();
  const [timers, setTimers] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentMode, setCurrentMode] = useState('randori');
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [isPrepare, setIsPrepare] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [updateTimes, setUpdateTimes] = useState(false);

  async function loadTimes() {
    // console.log('loading times');
    const currentUser = await user;

    const times = await axios.get(`http://localhost:3001/users/getUser/${currentUser.email}`);
    // console.log(user);
    // console.log(times);

    setTimers(times.data);
    setCurrentTime(
      times.data[currentMode].prepare.minutes * 60 + times.data[currentMode].prepare.seconds
    );
  }

  function resetTimer() {
    setIsRest(false);
    setIsActive(false);
    setCurrentRound(1);
    setCurrentTime(timers[currentMode].prepare.minutes * 60 + timers[currentMode].prepare.seconds);
    console.log(timers);
    // setCurrentTime(timers['randori'].prepare.minutes * 60 + timers['randori'].prepare.seconds);
  }

  useEffect(() => {
    if (isReset) {
      resetTimer();
    }
  }, [isReset]);

  useEffect(() => {
    // socket.on('receive_toast', (data) => {
    //   setShowToast(true);
    // });

    socket.on('receive_mode', (data) => {
      setCurrentMode(data.value);
    });

    socket.on('receive_clockIsRunning', (data) => {
      setIsActive(data.value);
    });

    socket.on('current_times', (data) => {
      // setUpdateTimes(true);
      setTimers(data.timers);
    });

    socket.on('receive_resetTimer', (data) => {
      if (data) {
        setIsReset(true);
        // resetTimer();
      }
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    if (!isLoading) {
      loadTimes();
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (user && setIsReset) {
  //     setIsRest(false);
  //     setIsActive(false);
  //     setCurrentRound(1);
  //     setTimeout(() => {
  //       console.log(timers);
  //     }, 5000);

  //     setIsReset(false);
  //   }
  // }, [isReset, user]);

  // useEffect(() => {
  //   if (updateTimes) {
  //     setTimeout(() => {
  //       loadTimes();
  //       setUpdateTimes(false);
  //     }, 500);
  //   }
  // }, [updateTimes]);

  useEffect(() => {
    let interval;

    if (isActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (isActive && currentTime === 0) {
      if (currentRound < timers[currentMode].rounds) {
        if (isPrepare) {
          setIsPrepare(false);
          setCurrentTime(timers[currentMode].time.minutes * 60 + timers[currentMode].time.seconds);
        } else if (isRest) {
          setIsRest(false);
          setCurrentTime(timers[currentMode].time.minutes * 60 + timers[currentMode].time.seconds);
          setCurrentRound(currentRound + 1);
        } else if (!isRest) {
          setIsRest(true);
          setCurrentTime(timers[currentMode].rest.minutes * 60 + timers[currentMode].rest.seconds);
        }
      } else {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, currentTime, isRest]);

  if (isLoading) {
    return (
      <Container height="100vh">
        <Flex height="100%" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  return (
    <main>
      <h1>{currentMode}</h1>
      {/* <h1>{isRest ? 'Rest' : 'Not Rest'}</h1> */}
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
            <span>{timers && currentRound}</span>
            <span>/ {timers && timers[currentMode].rounds}</span>
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
              {timers && String(Math.floor(currentTime / 60)).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers && String(Math.floor(currentTime % 60)).padStart(2, '0')}
            </Box>
          </Box>
          <Box className="total-time">
            {currentMode === ('randori' || 'threePerson')
              ? timers &&
                `
                ${String(
                  Math.floor(
                    ((timers[currentMode].time.minutes * 60 + timers[currentMode].time.seconds) *
                      timers[currentMode].rounds +
                      timers[currentMode].prepare.minutes * 60 +
                      timers[currentMode].prepare.seconds +
                      (timers[currentMode].rest.minutes * 60 + timers[currentMode].rest.seconds) *
                        (timers[currentMode].rounds - 1)) /
                      60
                  )
                ).padStart(2, '0')}:${String(
                  ((timers[currentMode].time.minutes * 60 + timers[currentMode].time.seconds) *
                    timers[currentMode].rounds +
                    timers[currentMode].prepare.minutes * 60 +
                    timers[currentMode].prepare.seconds +
                    (timers[currentMode].rest.minutes * 60 + timers[currentMode].rest.seconds) *
                      (timers[currentMode].rounds - 1)) %
                    60
                ).padStart(2, '0')}
              `
              : timers &&
                `${String(timers[currentMode].time.minutes).padStart(2, '0')}:
                ${String(timers[currentMode].time.seconds).padStart(2, '0')}`}
          </Box>
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
              {timers && String(timers[currentMode].prepare.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers && String(timers[currentMode].prepare.seconds).padStart(2, '0')}
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
              {timers && String(timers[currentMode].time.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers && String(timers[currentMode].time.seconds).padStart(2, '0')}
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
              {timers && String(timers[currentMode].warning.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers && String(timers[currentMode].warning.seconds).padStart(2, '0')}
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
              {timers && String(timers[currentMode].rest.minutes).padStart(2, '0')}
            </Box>
            <Box className="separator">:</Box>
            <Box className="seconds">
              {timers && String(timers[currentMode].rest.seconds).padStart(2, '0')}
            </Box>
          </Box>
          <Box>Rest</Box>
        </Box>
      </section>
      <Box mt={'1rem'} w="50%">
        <Flex justifyContent="space-evenly">
          <Button size="lg" onClick={() => setIsActive(!isActive)}>
            {isActive ? <CiPause1 /> : <CiPlay1 />}
          </Button>
          <Button size="lg" onClick={resetTimer}>
            <GrPowerReset color="white" />
          </Button>
        </Flex>
      </Box>
    </main>
  );
};

export default Timer;

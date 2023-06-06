import React, { useEffect, useRef, useState } from 'react';
import { Box, useColorMode, useToast, Flex, Button } from '@chakra-ui/react';
import './Timer.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { GrPowerReset } from 'react-icons/gr';

const socket = io.connect(API);

const Timer = () => {
  // const toast = useToast();
  const { colorMode } = useColorMode();
  const [timers, setTimers] = useState();
  const { user, isLoading } = useAuth0();
  const [currentMode, setCurrentMode] = useState('randori');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTime, setCurrentTime] = useState({ minutes: 0, seconds: 1 });
  // const [showToast, setShowToast] = useState(false);
  const [updateTimes, setUpdateTimes] = useState(false);
  const [clockIsRunning, setClockIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [type, setType] = useState('time');

  let id = useRef();

  async function loadTimes() {
    // console.log('loading times');
    const currentUser = await user;

    const times = await axios.get(`${API}/users/getUser/${currentUser.email}`);

    // console.log(times.data);
    setTimers(times.data);
    setCurrentTime({
      minutes: times.data[currentMode].time.minutes,
      seconds: times.data[currentMode].time.seconds,
    });
  }

  // useEffect(() => {
  //   let interval;

  //   if (clockIsRunning && currentTime > 0) {
  //     interval = setInterval(() => {
  //       setTime(time - 1);
  //     }, 1000);
  //   } else if (clockIsRunning && currentTime <= 0) {
  //     setIsRest(!isRest);
  //     setTime(isRest ? 30 : 120);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [clockIsRunning, isRest, currentTime]);

  // useEffect(() => {
  //   if (currentTime.seconds == 0) {
  //     if (type === 'time') {
  //       setType('rest');
  //     }
  //   }
  // }, [currentTime.seconds]);

  // function startTimer() {
  //   const start = Date.now();
  //   const end = start + currentTime.minutes * 60 * 1000 + currentTime.seconds * 1000;

  //   id.current = setInterval(() => {
  //     const current = Date.now();
  //     const remaining = end - current;
  //     if (currentRound <= timers[currentMode].rounds) {
  //       if (remaining > 0) {
  //         setCurrentTime({
  //           minutes: String(Math.floor(remaining / 1000 / 60)).padStart(2, '0'),
  //           seconds: String(Math.floor((remaining / 1000) % 60)).padStart(2, '0'),
  //         });
  //       } else {
  //         clearInterval(id.current);
  //         resetTimer();
  //         setClockIsRunning(false);
  //         startTimer();
  //       }
  //     } else {
  //       setClockIsRunning(false);
  //     }
  //   }, 100);
  //   setClockIsRunning(true);
  // }

  // function startTimer() {
  //   setClockIsRunning(true);
  //   setCurrentTime({
  //     minutes: timers[currentMode][type].minutes,
  //     seconds: timers[currentMode][type].seconds,
  //   });

  //   const start = Date.now();
  //   const end = start + currentTime.minutes * 60 * 1000 + currentTime.seconds * 1000;

  //   id.current = setInterval(() => {
  //     const current = Date.now();
  //     const remaining = end - current;

  //     if (currentRound < timers[currentMode].rounds) {
  //       setClockIsRunning(true);
  //       if (type === 'time') {
  //         setCurrentRound(currentRound + 1);
  //       }

  //       if (remaining > 0) {
  //         setCurrentTime({
  //           minutes: String(Math.floor(remaining / 1000 / 60)).padStart(2, '0'),
  //           seconds: String(Math.ceil((remaining / 1000) % 60)).padStart(2, '0'),
  //         });
  //       } else {
  //         clearInterval(id.current);
  //         resetTimer();

  //         if (type === 'prepare') {
  //           setType('time');
  //         } else if (type === 'time') {
  //           setType('rest');
  //           setCurrentTime({
  //             minutes: timers[currentMode].rest.minutes,
  //             seconds: timers[currentMode].rest.seconds,
  //           });
  //         } else if (type === 'rest') {
  //           setType('time');
  //           setCurrentTime({
  //             minutes: timers[currentMode].time.minutes,
  //             seconds: timers[currentMode].time.seconds,
  //           });
  //         }
  //       }
  //     } else {
  //       clearInterval(id.current);
  //       setType('stop');
  //       setClockIsRunning(false);
  //     }
  //   }, 100);
  // }

  // function startTimer() {
  //   if (!isRest) {
  //     timeTimer();
  //   } else {
  //     restTimer();
  //   }
  // }

  // useEffect(() => {
  //   if (timers && type !== 'stop') {
  //     startTimer();
  //   } else if (!clockIsRunning) {
  //     clearInterval(id.current);
  //   }
  // }, [type]);

  function count() {
    setCurrentRound(currentRound + 1);
  }

  // function timeTimer() {
  //   setCurrentTime({
  //     minutes: timers[currentMode].time.minutes,
  //     seconds: timers[currentMode].time.seconds,
  //   });

  //   const start = Date.now();
  //   const end = start + currentTime.minutes * 60 * 1000 + currentTime.seconds * 1000;

  //   id.current = setInterval(() => {
  //     const current = Date.now();
  //     const remaining = end - current;

  //     if (remaining > 0) {
  //       setCurrentTime({
  //         minutes: String(Math.floor(remaining / 1000 / 60)).padStart(2, '0'),
  //         seconds: String(Math.floor((remaining / 1000) % 60)).padStart(2, '0'),
  //       });
  //     } else {
  //       clearInterval(id.current);
  //       setIsRest(true);
  //       startTimer();
  //     }
  //   }, 100);
  // }

  // function restTimer() {
  //   console.log('resting');
  // }

  function pauseTimer() {
    clearInterval(id.current);
    // setClockIsRunning(false);
  }

  function resetTimer() {
    clearInterval(id.current);
    setClockIsRunning(false);
    setCurrentTime({
      minutes: timers[currentMode].time.minutes,
      seconds: timers[currentMode].time.seconds,
    });
  }

  function handleClock() {
    setClockIsRunning(!clockIsRunning);
  }

  function remoteToast() {
    socket.emit('show_toast', { toast: true });
  }

  useEffect(() => {
    socket.on('receive_toast', (data) => {
      setShowToast(true);
    });

    socket.on('current_times', (data) => {
      setUpdateTimes(true);
    });
  }, [socket]);

  // useEffect(() => {
  //   if (showToast) {
  //     toast({
  //       title: 'WebSocket Toast',
  //       variant: 'subtle',
  //       isClosable: false,
  //       duration: 1000,
  //       status: 'success',
  //       colorScheme: 'cyan',
  //       position: 'top',
  //       id: 'test',
  //     });
  //     setShowToast(false);
  //   }
  // }, [showToast]);

  useEffect(() => {
    if (updateTimes) {
      loadTimes();
      // setUpdateTimes(false);
    }
  }, [updateTimes]);

  // useEffect(() => {
  //   setCurrentTime({
  //     minutes: timers[currentMode]?.time.minutes,
  //     seconds: timers[currentMode]?.time.seconds,
  //   });
  // }, []);

  return (
    <main>
      <h1>{currentMode}</h1>
      <h1>{type}</h1>
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
            <span>
              {timers && timers[currentMode].rounds && '/'}{' '}
              {timers && timers[currentMode]['rounds']}
            </span>
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
            {/* {timers &&
              Math.ceil(
                ((timers[currentMode].time.minutes * 60 +
                  timers[currentMode].time.seconds) *
                  timers[currentMode].rounds +
                  timers[currentMode].prepare.minutes * 60 +
                  timers[currentMode].prepare.seconds +
                  (timers[currentMode].rest.minutes * 60 +
                    timers[currentMode].rest.seconds) *
                    (timers[currentMode].rounds - 1)) /
                  60
              )}
            :
            {timers &&
              ((timers[currentMode].time.minutes * 60 +
                timers[currentMode].time.seconds) *
                timers[currentMode].rounds +
                timers[currentMode].prepare.minutes * 60 +
                timers[currentMode].prepare.seconds +
                (timers[currentMode].rest.minutes * 60 +
                  timers[currentMode].rest.seconds) *
                  (timers[currentMode].rounds - 1)) %
                60} */}
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
          <Button
            size="lg"
            onClick={() => setClockIsRunning(!clockIsRunning)}
            // onClick={clockIsRunning ? pauseTimer : startTimer}
          >
            {clockIsRunning ? <CiPause1 /> : <CiPlay1 />}
          </Button>
          <Button
            size="lg"
            onClick={() => {
              setClockIsRunning(false);
              resetTimer();
              setCurrentRound(1);
              setType('time');
            }}
          >
            <GrPowerReset color="white" />
          </Button>
          <Button onClick={() => setIsRest(!isRest)}>Count</Button>
        </Flex>
      </Box>
    </main>
  );
};

export default Timer;

import {
  Box,
  Container,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Flex,
  Divider,
  Button,
  Select,
  useToast,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { RiSaveLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import io from 'socket.io-client';

const socketURL = import.meta.env.VITE_APP_SOCKET;
const API = import.meta.env.VITE_APP_API;
const socket = io.connect(socketURL);

const Settings = () => {
  const toast = useToast();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const { user, isLoading } = useAuth0();
  const [timers, setTimers] = useState({
    randori: {
      time: {
        minutes: 2,
        seconds: 0,
      },
      rest: {
        minutes: 0,
        seconds: 30,
      },
      warning: {
        minutes: 0,
        seconds: 15,
      },
      prepare: {
        minutes: 0,
        seconds: 10,
      },
      rounds: 6,
    },
    uchikomi: {
      time: {
        minutes: 3,
        seconds: 0,
      },
      rest: {
        minutes: 0,
        seconds: 30,
      },
      warning: {
        minutes: 0,
        seconds: 15,
      },
      prepare: {
        minutes: 0,
        seconds: 10,
      },
      rounds: 1,
    },
    threePerson: {
      time: {
        minutes: 3,
        seconds: 0,
      },
      rest: {
        minutes: 0,
        seconds: 30,
      },
      warning: {
        minutes: 0,
        seconds: 15,
      },
      prepare: {
        minutes: 0,
        seconds: 10,
      },
      rounds: 5,
    },
    waterBreak: {
      time: {
        minutes: 3,
        seconds: 0,
      },
      rest: {
        minutes: 0,
        seconds: 30,
      },
      warning: {
        minutes: 0,
        seconds: 15,
      },
      prepare: {
        minutes: 0,
        seconds: 10,
      },
      rounds: 1,
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios.post(`${API}/users/createUser`, {
      email: user.email,
      randori: timers.randori,
      uchikomi: timers.uchikomi,
      threePerson: timers.threePerson,
      waterBreak: timers.waterBreak,
    });

    socket.emit('update_times', { update: true, timers: timers });
  }

  function handleChange(value, mode, type, mm) {
    const changedTime = JSON.parse(JSON.stringify(timers));

    if (type === 'rounds') {
      changedTime[mode][type] = Number(value);
    } else {
      changedTime[mode][type][mm] = Number(value);
    }

    setTimers(changedTime);
  }

  async function loadTimes() {
    const currentUser = await user;

    const times = await axios.get(`${API}/users/getUser/${currentUser.email}`);

    setTimers(times.data);
  }

  // function showToast() {
  //   toast({
  //     title: 'WebSocket',
  //     duration: 1000,
  //     isClosable: false,
  //     variant: 'subtle',
  //     position: 'top',
  //     status: 'success',
  //     colorScheme: 'cyan',
  //   });
  // }

  // function remoteToast() {
  //   socket.emit('show_toast', { toast: true });
  // }

  // useEffect(() => {
  //   socket.on('receive_toast', (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  useEffect(() => {
    loadTimes();
  }, [isLoading]);

  if (isLoading) {
    return (
      <Container height="100vh">
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  let optionsSeconds = [];
  let optionsMinutes = [];

  for (let i = 0; i < 60; i += 5) {
    const op = document.createElement('option');
    op.text = i;
    op.text = op.text.padStart(2, '0');
    op.value = i;

    optionsSeconds.push(op);
  }

  for (let i = 0; i <= 10; i++) {
    const op = document.createElement('option');
    op.text = i;
    op.text = op.text.padStart(2, '0');
    op.value = i;

    optionsMinutes.push(op);
  }

  return (
    <Box>
      <Container>
        <Tabs isFitted pt="10">
          <TabList>
            <Tab>Randori</Tab>
            <Tab>Uchikomi</Tab>
            <Tab>3-Person</Tab>
            <Tab>Water Break</Tab>
          </TabList>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TabPanels>
              <TabPanel>
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Timer</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) => handleChange(e.target.value, 'randori', 'time', 'minutes')}
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.randori.time?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) => handleChange(e.target.value, 'randori', 'time', 'seconds')}
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.randori.time?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rounds</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rounds', '')}
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori?.rounds}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Warning</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'warning', 'minutes')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.warning?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'warning', 'seconds')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.warning?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rest</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rest', 'minutes')}
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.rest?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rest', 'seconds')}
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.rest?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Prepare</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'prepare', 'minutes')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.prepare?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'prepare', 'seconds')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.randori.prepare?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Time</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'time', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.time?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'time', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.time?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rest</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'rest', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.rest?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'rest', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.rest?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Warning</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'warning', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.warning?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'warning', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.warning?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Prepare</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'prepare', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.prepare?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'prepare', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.uchikomi.prepare?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Time</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'threePerson', 'time', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.threePerson.time?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'threePerson', 'time', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.threePerson.time?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rounds</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'threePerson', 'rounds', '')}
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson?.rounds}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Warning</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'warning', 'minutes')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.warning?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'warning', 'seconds')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.warning?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rest</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'rest', 'minutes')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.rest?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'rest', 'seconds')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.rest?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Prepare</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'prepare', 'minutes')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.prepare?.minutes}
                    >
                      {optionsMinutes.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    <Flex alignItems="center">:</Flex>
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'prepare', 'seconds')
                      }
                      size={isLargerThan800 ? 'sm' : 'lg'}
                      width="100%"
                      iconSize="0"
                      value={timers.threePerson.prepare?.seconds}
                    >
                      {optionsSeconds.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Time</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'time', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.time?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'time', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.time?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Rest</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'rest', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.rest?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'rest', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.rest?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Warning</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'warning', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.warning?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'warning', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.warning?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text fontSize={isLargerThan800 ? '' : '2xl'}>Prepare</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'prepare', 'minutes')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.prepare?.minutes}
                      >
                        {optionsMinutes.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      <Flex alignItems="center">:</Flex>
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'prepare', 'seconds')
                        }
                        size={isLargerThan800 ? 'sm' : 'lg'}
                        width="100%"
                        iconSize="0"
                        value={timers.waterBreak.prepare?.seconds}
                      >
                        {optionsSeconds.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
            <Flex justifyContent="flex-end" gap={1}>
              <Button type="submit" rightIcon={<RiSaveLine />} size="lg">
                Save
              </Button>
              {/* <Button onClick={loadTimes} size="sm">
                Load
              </Button> */}
            </Flex>
          </form>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Settings;

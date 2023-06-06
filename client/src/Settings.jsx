import {
  Box,
  Container,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Input,
  Text,
  Flex,
  Divider,
  FormControl,
  Button,
  Select,
  useToast,
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
  const { user, isLoading } = useAuth0();
  const [fetchedTimers, setFetchedTimers] = useState({});
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
    // console.log('submit');

    axios.post(`${API}/users/createUser`, {
      email: user.email,
      randori: timers.randori,
      uchikomi: timers.uchikomi,
      threePerson: timers.threePerson,
      waterBreak: timers.waterBreak,
    });

    socket.emit('update_times', { update: true, timers: timers });

    // console.log('user created');
  }

  function handleChange(value, mode, type, mm) {
    // console.log('timer change');
    const changedTime = JSON.parse(JSON.stringify(timers));

    if (type === 'rounds') {
      changedTime[mode][type] = Number(value);
    } else {
      changedTime[mode][type][mm] = Number(value);
    }

    // console.log(changedTime);
    setTimers(changedTime);
  }

  async function loadTimes() {
    const currentUser = await user;

    const times = await axios.get(`${API}/users/getUser/${currentUser.email}`);

    // console.log(times.data);
    setTimers(times.data);
  }

  function showToast() {
    toast({
      title: 'WebSocket',
      duration: 1000,
      isClosable: false,
      variant: 'subtle',
      position: 'top',
      status: 'success',
      colorScheme: 'cyan',
    });
  }

  function remoteToast() {
    socket.emit('show_toast', { toast: true });
  }

  useEffect(() => {
    socket.on('receive_toast', (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    loadTimes();
  }, [isLoading]);

  if (isLoading) return 'Loading...';

  let options = [];

  for (let i = 0; i < 60; i++) {
    const op = document.createElement('option');
    op.text = i;
    op.text = op.text.padStart(2, '0');
    op.value = i;

    options.push(op);
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
                  <Text>Timer</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) => handleChange(e.target.value, 'randori', 'time', 'minutes')}
                        size="sm"
                        iconSize="0"
                        value={timers.randori.time?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) => handleChange(e.target.value, 'randori', 'time', 'seconds')}
                        size="sm"
                        iconSize="0"
                        value={timers.randori.time?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Rounds</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rounds', '')}
                      size="sm"
                      iconSize="0"
                      value={timers.randori?.rounds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Warning</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'warning', 'minutes')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.randori.warning?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'warning', 'seconds')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.randori.warning?.seconds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Rest</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rest', 'minutes')}
                      size="sm"
                      iconSize="0"
                      value={timers.randori.rest?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'randori', 'rest', 'seconds')}
                      size="sm"
                      iconSize="0"
                      value={timers.randori.rest?.seconds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Prepare</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'prepare', 'minutes')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.randori.prepare?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'randori', 'prepare', 'seconds')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.randori.prepare?.seconds}
                    >
                      {options.map((op) => (
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
                  <Text>Time</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'time', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.time?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'time', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.time?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Rest</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'rest', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.rest?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'rest', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.rest?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Warning</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'warning', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.warning?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'warning', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.warning?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Prepare</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'prepare', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.prepare?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'uchikomi', 'prepare', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.uchikomi.prepare?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Timer</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'threePerson', 'time', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.threePerson.time?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'threePerson', 'time', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.threePerson.time?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Rounds</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) => handleChange(e.target.value, 'threePerson', 'rounds', '')}
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson?.rounds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Warning</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'warning', 'minutes')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.warning?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'warning', 'seconds')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.warning?.seconds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Rest</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'rest', 'minutes')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.rest?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'rest', 'seconds')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.rest?.seconds}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                <Divider />
                <Flex justifyContent="space-between" alignItems="center" m="1em 0">
                  <Text>Prepare</Text>
                  <Flex gap="0.25rem">
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'prepare', 'minutes')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.prepare?.minutes}
                    >
                      {options.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.innerText}
                        </option>
                      ))}
                    </Select>
                    :
                    <Select
                      onChange={(e) =>
                        handleChange(e.target.value, 'threePerson', 'prepare', 'seconds')
                      }
                      size="sm"
                      iconSize="0"
                      value={timers.threePerson.prepare?.seconds}
                    >
                      {options.map((op) => (
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
                  <Text>Time</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'time', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.time?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'time', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.time?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Rest</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'rest', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.rest?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'rest', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.rest?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Warning</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'warning', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.warning?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'warning', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.warning?.seconds}
                      >
                        {options.map((op) => (
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
                  <Text>Prepare</Text>
                  <Box>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'prepare', 'minutes')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.prepare?.minutes}
                      >
                        {options.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.innerText}
                          </option>
                        ))}
                      </Select>
                      :
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'waterBreak', 'prepare', 'seconds')
                        }
                        size="sm"
                        iconSize="0"
                        value={timers.waterBreak.prepare?.seconds}
                      >
                        {options.map((op) => (
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
              <Button type="submit" rightIcon={<RiSaveLine />} size="sm">
                Save
              </Button>
              <Button onClick={loadTimes} size="sm">
                Load
              </Button>
            </Flex>
          </form>
        </Tabs>
        <Button onClick={remoteToast}>Test</Button>
      </Container>
    </Box>
  );
};

export default Settings;

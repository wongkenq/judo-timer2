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
} from '@chakra-ui/react';
import { RiSaveLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Settings = () => {
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
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('submit');

    axios.post(`http://localhost:3001/users/createUser`, {
      email: user.email,
    });

    console.log('user created');
  }

  function handleChange(value, mode, type, mm) {
    console.log('timer change');
    const changedTime = JSON.parse(JSON.stringify(timers));

    if (type === 'rounds') {
      changedTime[mode][type] = Number(value);
    } else {
      changedTime[mode][type][mm] = Number(value);
    }

    console.log(changedTime);
    setTimers(changedTime);
  }

  async function loadTimes() {
    const currentUser = await user;

    const times = await axios.get(
      `http://localhost:3001/users/getUser/${currentUser.email}`
    );

    // console.log(times.data);
    setTimers(times.data);
  }

  useEffect(() => {
    loadTimes();
    console.log('useeffect');
  }, [isLoading]);

  async function getQuery() {
    const currentUser = await user;

    const { data } = await axios.get(
      `http://localhost:3001/users/getUser/${currentUser.email}`
    );
    setTimers(data);
    return data;
  }

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

          <TabPanels>
            <TabPanel>
              <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Timer</Text>
                    <Box>
                      <Flex gap="0.25rem">
                        <Select
                          onChange={(e) =>
                            handleChange(
                              e.target.value,
                              'randori',
                              'time',
                              'minutes'
                            )
                          }
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
                          onChange={(e) =>
                            handleChange(
                              e.target.value,
                              'randori',
                              'time',
                              'seconds'
                            )
                          }
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
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Rounds</Text>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(e.target.value, 'randori', 'rounds', '')
                        }
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
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Warning</Text>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(
                            e.target.value,
                            'randori',
                            'warning',
                            'minutes'
                          )
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
                          handleChange(
                            e.target.value,
                            'randori',
                            'warning',
                            'seconds'
                          )
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
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Rest</Text>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(
                            e.target.value,
                            'randori',
                            'rest',
                            'minutes'
                          )
                        }
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
                        onChange={(e) =>
                          handleChange(
                            e.target.value,
                            'randori',
                            'rest',
                            'seconds'
                          )
                        }
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
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Prepare</Text>
                    <Flex gap="0.25rem">
                      <Select
                        onChange={(e) =>
                          handleChange(
                            e.target.value,
                            'randori',
                            'prepare',
                            'minutes'
                          )
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
                          handleChange(
                            e.target.value,
                            'randori',
                            'prepare',
                            'seconds'
                          )
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
                  <Flex justifyContent="flex-end" gap={1}>
                    <Button type="submit" rightIcon={<RiSaveLine />} size="sm">
                      Save
                    </Button>
                    <Button onClick={loadTimes} size="sm">
                      Load
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </TabPanel>
            <TabPanel>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Time</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                m="1em 0"
              >
                <Text>Timer</Text>
                <Input width="50%" size="sm"></Input>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Settings;

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
} from '@chakra-ui/react';
import { RiSaveLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Settings = () => {
  const { user, isLoading } = useAuth0();

  // console.log(user.email);

  const [timers, setTimers] = useState({
    randori: {
      time: {
        minutes: 5,
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

  function handleChange(e, mode, type) {
    const timer = e._d.toString().split(' ')[4];
    const [hh, mm, ss] = timer.split(':');

    let newTimer = [...timers].find((time) => time.mode === mode);

    if (type === 'rounds') {
      console.log('type rounds');
      newTimer[type] = Number(ss);
    } else {
      newTimer[type].minutes = Number(mm);
      newTimer[type].seconds = Number(ss);
    }

    setTimers([...timers], newTimer);
  }

  async function loadTimes() {
    const currentUser = await user;

    const times = await axios.get(
      `http://localhost:3001/users/getUser/${currentUser.email}`
    );

    console.log(times.data);
    setTimers(times.data);
  }

  useEffect(() => {
    loadTimes();
    // console.log(timers);
  }, [isLoading]);

  async function getQuery() {
    const currentUser = await user;

    const { data } = await axios.get(
      `http://localhost:3001/users/getUser/${currentUser.email}`
    );
    setTimers(data);
    return data;
  }

  // const { data, isLoading } = useQuery({
  //   queryKey: ['times'],
  //   queryFn: getQuery,
  // });

  // if (isLoading) return 'Loading...';

  // console.log(data);

  return (
    <Box>
      {/* {timers.randori.time.minutes} */}
      {/* {console.log(timers)} */}
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
                    <TimePicker
                      inputReadOnly={true}
                      showHour={false}
                      value={moment()
                        .minute(timers?.randori?.time?.minutes)
                        .second(timers?.randori?.time?.seconds)}
                      // value={moment()
                      //   .minute(
                      //     timers.find((timer) => timer.mode === 'randori').time
                      //       .minutes
                      //   )
                      //   .second(
                      //     timers.find((timer) => timer.mode === 'randori').time
                      //       .seconds
                      //   )}
                      defaultOpenValue={moment().minute(0).second(0)}
                      onChange={(e) => handleChange(e, 'randori', 'time')}
                    />
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Rounds</Text>
                    <TimePicker
                      inputReadOnly={true}
                      showHour={false}
                      showMinute={false}
                      // defaultValue={moment().second(timers.randori.rounds)}
                      defaultOpenValue={moment().minute(0).second(0)}
                      onChange={(e) => handleChange(e, 'randori', 'rounds')}
                    />
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Warning</Text>
                    <TimePicker
                      inputReadOnly={true}
                      showHour={false}
                      // defaultValue={moment()
                      //   .minute(timers.randori.warning.minutes)
                      //   .second(timers.randori.warning.seconds)}
                      defaultOpenValue={moment().minute(0).second(0)}
                      onChange={(e) => handleChange(e, 'randori', 'warning')}
                    />
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Rest</Text>
                    <TimePicker
                      inputReadOnly={true}
                      showHour={false}
                      // defaultValue={moment()
                      //   .minute(timers.randori.rest.minutes)
                      //   .second(timers.randori.rest.seconds)}
                      defaultOpenValue={moment().minute(0).second(0)}
                      onChange={(e) => handleChange(e, 'randori', 'rest')}
                    />
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m="1em 0"
                  >
                    <Text>Prepare</Text>
                    <TimePicker
                      inputReadOnly={true}
                      showHour={false}
                      // defaultValue={moment()
                      //   .minute(timers.randori.prepare.minutes)
                      //   .second(timers.randori.prepare.seconds)}
                      defaultOpenValue={moment().minute(0).second(0)}
                      onChange={(e) => handleChange(e, 'randori', 'prepare')}
                    />
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

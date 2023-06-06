import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link as RRLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const { user } = useAuth0();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link as={RRLink} to="/">
              Judo Timer
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={user ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={
                        user ? user.picture : 'https://avatars.dicebear.com/api/male/username.svg'
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.email}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <Link as={RRLink} to="/settings">
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RRLink} to="/timer">
                      Timer
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RRLink} to="/test">
                      Test
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RRLink} to="/control">
                      Control
                    </Link>
                  </MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

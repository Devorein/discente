import { siteMetadata } from '@constants';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import {
  AppBar,
  Avatar,
  Button,
  ButtonBase,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { useCurrentUser, useThemeMode } from 'contexts';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { currentUser } = useCurrentUser();
  const currentAvatar = currentUser?.avatar;
  const currName = currentUser?.name
    ?.split(' ')
    .reduce(
      (prevChar, currChar) => prevChar + currChar.charAt(0).toUpperCase(),
      ''
    );
  const { setThemeMode, themeMode } = useThemeMode();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/'>
          <Avatar
            alt='Discente Logo'
            src={siteMetadata.brand.image}
            component={ButtonBase}
          />
        </Link>
        <Link href='/'>
          <Typography
            variant='h6'
            sx={{
              textDecoration: 'none',
              flexGrow: 1,
              color: 'white',
              cursor: 'pointer',
              ml: 1
            }}
          >
            Discente
          </Typography>
        </Link>
        <Stack direction='row' spacing={2}>
          <IconButton
            disableRipple
            onClick={() =>
              setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
            }
          >
            {themeMode === 'dark' ? (
              <ModeNightIcon fontSize='small' />
            ) : (
              <Brightness5Icon fontSize='small' />
            )}
          </IconButton>
          {currentUser ? (
            <>
              <Link href='/profile'>
                <Button color='inherit'>{currentUser.username}</Button>
              </Link>
              {currentAvatar ? (
                <Avatar src={currentAvatar} />
              ) : (
                <Avatar>{currName}</Avatar>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href='/login'>
                <Button color='inherit'>Login</Button>
              </Link>
              <Link href='/register'>
                <Button color='inherit'>Register</Button>
              </Link>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

import Brightness5Icon from '@mui/icons-material/Brightness5';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useCurrentUser, useThemeMode } from 'contexts';
import Link from 'next/link';
import Router from 'next/router';
import Logo from '../Logo';
import NavbarDropdown from './NavbarDropdown';

export default function Navbar() {
  const { currentUser } = useCurrentUser();

  const { setThemeMode, themeMode } = useThemeMode();
  const router = Router.router as unknown as typeof Router;
  const isRegisterLoginPage = router.route.match(/(login|register)/);

  if (isRegisterLoginPage) {
    return null;
  }

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      <Logo />
      <Stack direction='row' spacing={1} alignItems='center'>
        <IconButton
          disableRipple
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
        >
          {themeMode === 'dark' ? (
            <ModeNightIcon fontSize='small' />
          ) : (
            <Brightness5Icon fontSize='small' />
          )}
        </IconButton>
        {currentUser ? (
          <NavbarDropdown />
        ) : (
          <>
            <Link href='/login'>
              <Button variant='outlined' color='inherit'>
                Login
              </Button>
            </Link>
            <Link href='/register'>
              <Button variant='contained' color='primary'>
                Register
              </Button>
            </Link>
          </>
        )}
      </Stack>
    </Box>
  );
}

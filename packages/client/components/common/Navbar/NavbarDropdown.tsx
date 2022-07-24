import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraIcon from '@mui/icons-material/Camera';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Typography } from '@mui/material';
import { Button } from 'components';
import { useCurrentUser } from 'contexts';
import Dropdown from '../Dropdown';
import LogoutButton from '../LogoutButton';
import StyledLink from '../StyledLink';

export default function NavbarDropdown() {
  const { currentUser } = useCurrentUser<true>();
  const currentAvatar = currentUser.avatar;
  const currName = currentUser.name
    ?.split(' ')
    .reduce(
      (prevChar, currChar) => prevChar + currChar.charAt(0).toUpperCase(),
      ''
    );
  const { role } = currentUser;

  const dropdownButton = (
    <Button
      size='small'
      variant='outlined'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {currentAvatar ? (
        <Avatar src={currentAvatar} />
      ) : (
        <Avatar>{currName}</Avatar>
      )}
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 600
        }}
      >
        {currentUser.username}
      </Typography>
    </Button>
  );

  return (
    <Box display='flex' gap={0.5}>
      <Dropdown
        button={dropdownButton}
        items={[
          <StyledLink
            disableHoverStyle
            href='/profile'
            display='flex'
            gap={1}
            alignItems='center'
          >
            <AccountCircleIcon fontSize='small' />
            <Typography variant='body2'>My Profile</Typography>
          </StyledLink>,
          <StyledLink
            disableHoverStyle
            href='/account'
            display='flex'
            gap={1}
            alignItems='center'
          >
            <SettingsIcon fontSize='small' />
            <Typography variant='body2'>Account Settings</Typography>
          </StyledLink>
        ]}
      />
      {role === 'instructor' && (
        <Button
          variant='contained'
          href='/create-course'
          startIcon={<CameraIcon fontSize='small' />}
        >
          Courses
        </Button>
      )}
      <LogoutButton />
    </Box>
  );
}

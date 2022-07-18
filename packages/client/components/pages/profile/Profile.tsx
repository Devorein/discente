import { Avatar, Button, Paper, Typography } from '@mui/material';
import { LogoutButton } from 'components';
import { useCurrentUser } from 'contexts';
import Link from 'next/link';
import { DeleteAccountButton } from './DeleteAccountButton';

export default function Profile() {
  const { currentUser } = useCurrentUser<true>();
  const currentAvatar = currentUser.avatar;
  const currName = currentUser.name;

  return (
    <Paper>
      <Typography
        variant='h1'
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {currentAvatar ? (
          <Avatar
            src={currentAvatar}
            variant='square'
            sx={{ margin: 2, width: 80, height: 80 }}
          />
        ) : (
          <Avatar variant='square' sx={{ margin: 2, width: 80, height: 80 }}>
            {currName}
          </Avatar>
        )}
        {currentUser.username}
      </Typography>

      {currentUser.name && (
        <Typography>{`Name: ${currentUser.name}`}</Typography>
      )}
      <Typography>{`Email: ${currentUser.email}`}</Typography>
      <Link href='/profile/update-user'>
        <Button>Change your details</Button>
      </Link>
      <Link href='/profile/change-password'>
        <Button>Change your password</Button>
      </Link>
      <LogoutButton allDevices />
      <DeleteAccountButton />
    </Paper>
  );
}

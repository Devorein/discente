import { Typography } from '@mui/material';
import { useCurrentUser } from 'contexts';
import { useCountdown } from 'hooks';

export default function AuthRedirect() {
  const { currentUser } = useCurrentUser();
  const remainingTime = useCountdown(3);

  if (!currentUser) {
    return (
      <Typography variant='h3' component='div'>
        Please Login first. You will be redirected to the Login page in
        {remainingTime}
        seconds.
      </Typography>
    );
  }

  return null;
}

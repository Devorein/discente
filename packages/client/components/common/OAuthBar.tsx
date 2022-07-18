import { API_VERSION, SERVER_URL } from '@constants';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

function getGoogleOauthUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: `${SERVER_URL}/${API_VERSION}/oauth/google`,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

export default function OAuthBar() {
  return (
    <Stack direction='row' spacing={2}>
      <Link href={getGoogleOauthUrl()}>
        <Button variant='outlined' startIcon={<GoogleIcon />}>
          Google
        </Button>
      </Link>
    </Stack>
  );
}

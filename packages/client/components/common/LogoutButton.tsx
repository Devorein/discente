import { Button } from '@mui/material';
import { useLogoutUserMutation, useLogoutUserMutationCache } from 'api';
import { silentlyUpdateURL } from 'utils';

interface LogoutProps {
  allDevices?: boolean;
}

export default function LogoutButton({ allDevices = false }: LogoutProps) {
  const { isLoading, mutateAsync } = useLogoutUserMutation();
  const logoutUserMutationCacheFn = useLogoutUserMutationCache();

  return (
    <Button
      disabled={isLoading}
      color='inherit'
      onClick={async () => {
        await mutateAsync(
          { allDevices },
          logoutUserMutationCacheFn(() => {
            const url = new URL(window.location.href);
            url.searchParams.set('redirect', 'false');
            silentlyUpdateURL(url.href);
          })
        );
      }}
    >
      {allDevices ? 'Logout of all devices' : 'Logout'}
    </Button>
  );
}

import { Box } from '@mui/system';
import { AdminHomepage, LandingPage, UserHomepage } from 'components';
import { useCurrentUser } from 'contexts';

export default function Home() {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return currentUser.role === 'admin' ? <AdminHomepage /> : <UserHomepage />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '25px'
        }}
      >
        <LandingPage />
      </Box>
    </Box>
  );
}

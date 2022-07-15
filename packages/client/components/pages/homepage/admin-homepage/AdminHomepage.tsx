import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCurrentUser } from 'contexts';

export default function AdminHomepage() {
  const { currentUser } = useCurrentUser();
  const currName = currentUser?.name;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 275,
          marginTop: 2
        }}
      >
        <CardContent>
          <Typography variant='body1'>Welcome Admin {currName}!</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

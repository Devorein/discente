import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 275,
          marginTop: 2
        }}
      >
        <CardContent>
          <Typography variant='body1'>
            Welcome To Discente! Login or Register to Get started 🧠!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

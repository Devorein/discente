import { Box } from '@mui/material';
import { Courses } from 'components';

export default function CoursesPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        height: 'calc(100% - 25px)'
      }}
    >
      <Courses />
    </Box>
  );
}

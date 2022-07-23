import { Box, Typography } from '@mui/material';

export interface FieldHelperTextProps {
  helperText?: string;
}

export default function FieldHelperText(props: FieldHelperTextProps) {
  const { helperText } = props;
  return (
    <Box display='flex' mb={0.5} flexDirection='column'>
      {helperText && (
        <Typography variant='subtitle2' sx={{ opacity: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

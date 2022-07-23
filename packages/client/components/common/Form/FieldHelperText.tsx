import { Typography } from '@mui/material';

export interface FieldHelperTextProps {
  helperText: string;
}

export default function FieldHelperText(props: FieldHelperTextProps) {
  const { helperText } = props;
  return (
    <Typography variant='subtitle2' sx={{ opacity: 0.5 }}>
      {helperText}
    </Typography>
  );
}

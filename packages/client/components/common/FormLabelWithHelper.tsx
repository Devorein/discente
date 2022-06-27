import { Box, FormHelperText, FormLabel } from '@mui/material';

export interface FormLabelWithHelperProps {
  name: string;
  label: string;
  error?: string | boolean;
}

export default function FormLabelWithHelper(props: FormLabelWithHelperProps) {
  const { name, label, error } = props;

  return (
    <Box>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {Boolean(error) && (
        <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
      )}
    </Box>
  );
}

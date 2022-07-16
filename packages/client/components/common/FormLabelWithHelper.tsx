import { Box, FormHelperText, FormLabel, Typography } from '@mui/material';

export interface FormLabelWithHelperProps {
  name: string;
  label: string;
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
}

export default function FormLabelWithHelper(props: FormLabelWithHelperProps) {
  const { name, required, label, error, helperText } = props;
  return (
    <Box display='flex' mb={0.5} flexDirection='column'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <FormLabel htmlFor={name}>
          {label} {required ? '*' : ''}
        </FormLabel>
        {Boolean(error) && (
          <FormHelperText
            sx={{
              mx: 0
            }}
            error={Boolean(error)}
          >
            {error}
          </FormHelperText>
        )}
      </Box>
      {helperText && <Typography variant='subtitle2'>{helperText}</Typography>}
    </Box>
  );
}

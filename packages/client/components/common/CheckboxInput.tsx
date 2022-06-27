import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel
} from '@mui/material';
import { useField } from 'formik';

export type CheckboxInputProps = CheckboxProps & {
  helperText?: string;
  name: string;
  label?: string;
};

export default function CheckboxInput({
  helperText,
  label,
  name,
  ...props
}: CheckboxInputProps) {
  const [field] = useField(name);

  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox id={field.name} {...field} {...props} />}
        label={label}
      />
      {helperText || null}
    </FormControl>
  );
}

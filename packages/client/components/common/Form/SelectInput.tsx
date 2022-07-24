import {
  FormControl,
  FormControlProps,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material';
import { useField } from 'formik';
import FieldHelperText from './FieldHelperText';
import FieldLabel from './FieldLabel';

export type SelectInputProps<T = string> = SelectProps<T> & {
  helperText?: string;
  name: string;
  label?: string;
  placeholder?: string | number;
  values:
    | string[]
    | {
        value: string;
        label: string;
      }[];
  formControlProps?: FormControlProps;
};

export default function SelectInput<T extends string>({
  helperText,
  label,
  placeholder,
  multiline = false,
  rows = 1,
  fullWidth = true,
  name,
  values,
  formControlProps = {},
  ...props
}: SelectInputProps<T>) {
  const [field, { error }] = useField(name);
  return (
    <FormControl {...formControlProps}>
      {label && <FieldLabel error={error} label={label} name={field.name} />}
      <Select<T>
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        error={Boolean(error)}
        id={field.name}
        placeholder={placeholder ?? label}
        {...field}
        {...props}
      >
        {values.map((val) =>
          typeof val === 'string' ? (
            <MenuItem key={val} value={val}>
              {val[0].toUpperCase() + val.slice(1)}
            </MenuItem>
          ) : (
            <MenuItem key={val.value} value={val.value}>
              {val.label}
            </MenuItem>
          )
        )}
      </Select>
      {helperText && <FieldHelperText helperText={helperText} />}
    </FormControl>
  );
}

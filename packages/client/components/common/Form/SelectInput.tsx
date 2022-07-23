import { FormControl, MenuItem, Select, SelectProps } from '@mui/material';
import { useField } from 'formik';
import FieldLabel from './FieldLabel';

export type SelectInputProps<T> = SelectProps<T> & {
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
  ...props
}: SelectInputProps<T>) {
  const [field, { error }] = useField(name);
  return (
    <FormControl>
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
      {helperText || null}
    </FormControl>
  );
}

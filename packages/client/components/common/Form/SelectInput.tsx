import { FormControl, MenuItem, Select, SelectProps } from '@mui/material';
import { useField } from 'formik';
import FormLabelWithHelper from './FieldLabel';

export type SelectInputProps = SelectProps & {
  helperText?: string;
  name: string;
  label?: string;
  placeholder?: string | number;
  values: string[];
};

export default function SelectInput({
  helperText,
  label,
  placeholder,
  multiline = false,
  rows = 1,
  fullWidth = true,
  name,
  values,
  ...props
}: SelectInputProps) {
  const [field, { error }] = useField(name);

  return (
    <FormControl>
      {label && (
        <FormLabelWithHelper error={error} label={label} name={field.name} />
      )}
      <Select
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        error={Boolean(error)}
        id={field.name}
        placeholder={placeholder ?? label}
        {...field}
        {...props}
      >
        {values.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
      {helperText || null}
    </FormControl>
  );
}

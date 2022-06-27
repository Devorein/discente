import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import FormLabelWithHelper from './FormLabelWithHelper';

export type TextInputProps = TextFieldProps & {
  helperText?: string;
  name: string;
  label?: string;
  placeholder?: string | number;
};

export default function TextInput({
  helperText,
  label,
  placeholder,
  multiline = false,
  rows = 1,
  fullWidth = true,
  name,
  ...props
}: TextInputProps) {
  const [field, { error, touched }, { setTouched }] = useField(name);

  const errorState = touched ? Boolean(error) : false;

  const labelField = label ? (
    <FormLabelWithHelper
      error={touched ? error : undefined}
      label={label}
      name={field.name}
    />
  ) : null;

  return (
    <FormControl>
      {labelField}
      <TextField
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        error={errorState}
        id={field.name}
        placeholder={placeholder ?? label}
        onClick={() => {
          setTouched(true, true);
        }}
        {...field}
        {...props}
      />
      {helperText || null}
    </FormControl>
  );
}

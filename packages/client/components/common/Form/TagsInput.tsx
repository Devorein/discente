import { Autocomplete, Chip, TextField } from '@mui/material';
import { useField } from 'formik';

export interface TagsInputProps {
  name: string;
}

export default function TagsInput(props: TagsInputProps) {
  const { name } = props;
  const [, { value }, { setValue }] = useField<string[]>(name);
  return (
    <Autocomplete<string, true, undefined, true>
      multiple
      options={[]}
      freeSolo
      renderTags={(tags, getTagProps) =>
        tags.map((tag, index) => (
          <Chip variant='filled' label={tag} {...getTagProps({ index })} />
        ))
      }
      onChange={(_, tags) => {
        setValue(
          tags.map((tag) => tag.toLowerCase().trim().replaceAll(/\s/g, ''))
        );
      }}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label='Tags'
          disabled={value.length === 5}
          inputProps={{
            ...params.inputProps,
            disabled: value.length === 5
          }}
        />
      )}
    />
  );
}

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import { SortOrder } from '@types';
import { Dispatch, SetStateAction } from 'react';

export interface PaginationSortProps<SortFields> {
  sort: {
    field: SortFields;
    order: SortOrder;
  };
  onChange: Dispatch<SetStateAction<PaginationSortProps<SortFields>['sort']>>;
  fields: string[];
}

export default function PaginationSort<SortFields>(
  props: PaginationSortProps<SortFields>
) {
  const { sort, fields, onChange } = props;

  return (
    <Stack gap={1} flexDirection='row'>
      <FormControl>
        <InputLabel>Sort</InputLabel>
        <Select
          variant='outlined'
          value={sort.field}
          label='Sort'
          onChange={(e) => {
            onChange({
              field: e.target.value as SortFields,
              order: sort.order
            });
          }}
        >
          {fields.map((field) => (
            <MenuItem value={field}>
              {field[0].toUpperCase() + field.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Order</InputLabel>
        <Select
          variant='outlined'
          value={sort.order}
          label='Order'
          onChange={(e) => {
            onChange({
              order: e.target.value as SortOrder,
              field: sort.field
            });
          }}
        >
          <MenuItem value='asc'>Asc</MenuItem>
          <MenuItem value='desc'>Desc</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

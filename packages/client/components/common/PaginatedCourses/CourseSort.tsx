import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Stack
} from '@mui/material';
import { CourseSortableFields, SortOrder } from '@types';

interface CourseSortProps {
  sortField: CourseSortableFields;
  sortOrder: SortOrder;
  onSortFieldChange: SelectProps<CourseSortableFields>['onChange'];
  onSortOrderChange: SelectProps<SortOrder>['onChange'];
}

export default function CourseSort(props: CourseSortProps) {
  const { onSortFieldChange, onSortOrderChange, sortField, sortOrder } = props;

  return (
    <Stack gap={1} flexDirection='row'>
      <FormControl>
        <InputLabel>Sort</InputLabel>
        <Select
          variant='outlined'
          value={sortField}
          label='Sort'
          onChange={onSortFieldChange}
        >
          <MenuItem value='title'>Title</MenuItem>
          <MenuItem value='price'>Price</MenuItem>
          <MenuItem value='ratings'>Ratings</MenuItem>
          <MenuItem value='enrolled'>Enrolled</MenuItem>
          <MenuItem value='updatedAt'>Updated</MenuItem>
          <MenuItem value='createdAt'>Created</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Order</InputLabel>
        <Select
          variant='outlined'
          value={sortOrder}
          label='Order'
          onChange={onSortOrderChange}
        >
          <MenuItem value='asc'>Asc</MenuItem>
          <MenuItem value='desc'>Desc</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

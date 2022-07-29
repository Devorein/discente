import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ButtonProps } from '@mui/material';
import { Button } from 'components';

export interface PaginationLoadMoreButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: ButtonProps['onClick'];
}

export default function PaginationLoadMoreButton(
  props: PaginationLoadMoreButtonProps
) {
  const { onClick, loading, disabled } = props;

  return (
    <Button
      variant='contained'
      loading={loading}
      onClick={onClick}
      disabled={disabled}
      endIcon={!loading && <ArrowDropDownIcon fontSize='small' />}
    >
      Load more
    </Button>
  );
}

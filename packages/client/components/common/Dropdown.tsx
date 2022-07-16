import { Box, Menu, MenuItem } from '@mui/material';
import { ReactNode, useState } from 'react';

interface DropdownProps {
  button: ReactNode;
  items: ReactNode[];
}

export default function Dropdown({ button, items }: DropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        {button}
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item, itemIndex) => (
          <MenuItem
            onClick={handleClose}
            key={`menu-item-${itemIndex.toString()}`}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

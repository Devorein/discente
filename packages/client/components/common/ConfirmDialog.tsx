import { Box, Button, ButtonProps, Dialog, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface ConfirmDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  confirmButtonProps?: Partial<ButtonProps>;
  children?: ReactNode;
  secondaryTitle?: string;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    secondaryTitle,
    children,
    isOpen,
    title,
    onClose,
    confirmButtonProps
  } = props;

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      sx={{
        '& .MuiPaper-root': {
          p: 2
        }
      }}
    >
      <Box display='flex' gap={1} flexDirection='column' my={2}>
        <Typography variant='h5' fontWeight='bold'>
          {title}
        </Typography>
        {secondaryTitle && (
          <Typography color='secondary' variant='body1'>
            {secondaryTitle}
          </Typography>
        )}
      </Box>
      {children}
      <Box gap={2} display='flex' flexDirection='row' alignItems='center'>
        <Button onClick={onClose}>Cancel</Button>
        <Button {...confirmButtonProps}>Confirm</Button>
      </Box>
    </Dialog>
  );
}

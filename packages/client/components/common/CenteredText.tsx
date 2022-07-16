import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

export function CenteredText({
  children,
  component,
  ...props
}: TypographyProps & { children: ReactNode; component?: React.ElementType }) {
  return (
    <Typography
      variant='subtitle1'
      display='flex'
      alignItems='center'
      gap={0.5}
      flexWrap='wrap'
      justifyContent='center'
      width='100%'
      flexDirection='row'
      component={component ?? 'div'}
      align='center'
      {...props}
    >
      {children}
    </Typography>
  );
}

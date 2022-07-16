import styled from '@emotion/styled';
import { Typography, TypographyProps, useTheme } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

const hoverStyle = {
  cursor: 'pointer',
  textDecoration: 'underline'
};

const StyledTypography = styled(Typography)<{ disableHoverStyle?: boolean }>(
  ({ theme, disableHoverStyle }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': disableHoverStyle ? {} : hoverStyle
  })
);

interface StyledLinkProps extends TypographyProps {
  href: string;
  children: ReactNode;
  highlight?: boolean;
  disableHoverStyle?: boolean;
}

export default function StyledLink({
  href,
  children,
  highlight,
  disableHoverStyle,
  ...props
}: StyledLinkProps) {
  const theme = useTheme();
  return (
    <Link href={href}>
      <StyledTypography
        disableHoverStyle={disableHoverStyle}
        variant='subtitle1'
        sx={{
          '&': {
            color: highlight ? theme.palette.primary.main : 'inherit'
          }
        }}
        {...props}
      >
        {children}
      </StyledTypography>
    </Link>
  );
}

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { darken, lighten, Stack, StackProps } from '@mui/material';

function background(theme: Theme) {
  return theme.palette.mode === 'dark'
    ? lighten(theme.palette.background.default, 0.1)
    : darken(theme.palette.background.default, 0.1);
}

const StyledStack = styled(Stack)`
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing(1)};
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => background(theme)};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export interface ScrollableStackProps extends StackProps {}

export default function ScrollableStack({
  children,
  ...props
}: ScrollableStackProps) {
  return (
    <StyledStack gap={1} {...props}>
      {children}
    </StyledStack>
  );
}

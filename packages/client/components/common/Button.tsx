import styled from '@emotion/styled';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import NextLink from 'next/link';
import { ComponentProps, ElementType, forwardRef } from 'react';

const StyledButton = styled(MuiButton)`
  white-space: nowrap;
`;

export const StyledSpinner = styled(CircularProgress)`
  margin-left: 5px;
`;

type ButtonProps<C extends ElementType> = ComponentProps<typeof MuiButton> &
  // Omit 'variant' because it gets overridden sometimes by component
  Omit<ComponentProps<C>, 'variant'> & {
    component?: C;
    external?: boolean;
    loading?: boolean;
    loadingMessage?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  (props, ref) => {
    const { children, loading, loadingMessage, ...rest } = props;

    return (
      <StyledButton ref={ref} disabled={loading} {...rest}>
        {loading && loadingMessage ? loadingMessage : children}
        {loading && <StyledSpinner color='inherit' size={15} />}
      </StyledButton>
    );
  }
);

// make sure the id prop is on the same element as onClick
const ButtonWithNextLink = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  (props, ref) => {
    const { href, external, children, id, onClick, ...rest } = props;
    if (href) {
      if (external) {
        return (
          <Button ref={ref} href={href} id={id} onClick={onClick} {...rest}>
            {children}
          </Button>
        );
      }
      // @ts-ignore
      return (
        <NextLink href={href} passHref>
          {/** use an anchor tag to catch the ref passed down by NextLink.
           *  see https://github.com/vercel/next.js/issues/7915 */}
          <Button {...rest}>{children}</Button>
        </NextLink>
      );
    }

    return (
      <Button ref={ref} id={id} onClick={onClick} {...props}>
        {children}
      </Button>
    );
  }
);

export default ButtonWithNextLink;

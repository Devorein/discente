import { siteMetadata } from '@constants';
import { Avatar, Box, BoxProps, ButtonBase, Typography } from '@mui/material';
import Link from 'next/link';

export default function Logo(props: BoxProps) {
  return (
    <Link href='/'>
      <Box display='flex' alignItems='center' gap={1} {...props}>
        <Avatar
          alt='Discente Logo'
          src={siteMetadata.brand.image}
          component={ButtonBase}
        />
        <Typography
          variant='h6'
          sx={{
            cursor: 'pointer'
          }}
        >
          Discente
        </Typography>
      </Box>
    </Link>
  );
}

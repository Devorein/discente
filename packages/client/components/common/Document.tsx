import { siteMetadata } from '@constants';
import { Paper } from '@mui/material';
import Head from 'next/head';
import { ReactNode } from 'react';
import { QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from './Navbar/Navbar';
import Providers from './Providers';
import RouteGuard from './RouteGuard';

export default function Document({
  children,
  queryClient = new QueryClient(),
  showReactQueryDevTools = true
}: {
  showReactQueryDevTools?: boolean;
  children: ReactNode;
  queryClient?: QueryClient;
}) {
  return (
    <>
      <Head>
        <link rel='icon' href={siteMetadata.brand.image} />
        <title>Discente</title>
      </Head>
      <Providers queryClient={queryClient}>
        <Paper
          elevation={0}
          sx={{
            height: 'calc(100vh)',
            borderRadius: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Navbar />
          <RouteGuard>
            <>
              {children}
              {showReactQueryDevTools && <ReactQueryDevtools />}
            </>
          </RouteGuard>
        </Paper>
      </Providers>
    </>
  );
}

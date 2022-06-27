import { Paper } from '@mui/material';
import Head from 'next/head';
import { ReactNode } from 'react';
import { QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
        <link rel='icon' href='/discente.ico' />
        <title>Discente</title>
      </Head>
      <Providers queryClient={queryClient}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            p: 2
          }}
        >
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

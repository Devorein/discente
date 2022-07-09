import { CurrentUserProvider } from 'contexts';
import { ThemeModeProvider } from 'contexts/ThemeMode';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Document({
  children,
  queryClient = new QueryClient()
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
          >
            {children}
          </SnackbarProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}

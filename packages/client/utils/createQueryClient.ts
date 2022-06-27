import { QueryClient, QueryClientConfig } from 'react-query';

export const createQueryClient = () => {
  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      }
    }
  };
  return new QueryClient(queryClientConfig);
};

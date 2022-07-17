import { ApiRequest } from '@types';
import { QueryKey, useQueryClient } from 'react-query';
import { QueryCacheHitFn } from 'types';

export function useQueryClientSetData<
  QueryApi extends ApiRequest<any, any> = ApiRequest
>(queryKey: QueryKey): (queryCacheHitFn: QueryCacheHitFn<QueryApi>) => void {
  const queryClient = useQueryClient();
  return (cacheHitCb) => {
    queryClient.setQueriesData<QueryApi['response'] | null | undefined>(
      queryKey,
      (queryResponse) => cacheHitCb(queryResponse)
    );
  };
}

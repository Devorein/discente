import { ApiResponse } from '@types';
import { QueryKey, useQueryClient } from 'react-query';

export function useQueryClientSetData<ResponseData>() {
  const queryClient = useQueryClient();
  return (
    queryKey: QueryKey,
    cacheHitCb: (
      queryResponse: ApiResponse<ResponseData> | null | undefined
    ) => ApiResponse<ResponseData> | null | undefined
  ) => {
    queryClient.setQueriesData<ApiResponse<ResponseData> | null | undefined>(
      queryKey,
      (queryResponse) => {
        return cacheHitCb(queryResponse);
      }
    );
  };
}

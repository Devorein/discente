import { apiConstants } from '@constants';
import { ApiResponse, GetCurrentUserResponse } from '@types';
import { useApiQuery, useQueryClientSetData } from 'hooks';

export function useGetCurrentUserQueryData() {
  const queryClientSetData = useQueryClientSetData<GetCurrentUserResponse>();
  return (
    cacheHitCb: (
      queryResponse: ApiResponse<GetCurrentUserResponse> | null | undefined
    ) => ApiResponse<GetCurrentUserResponse> | null | undefined
  ) => {
    queryClientSetData(apiConstants.getCurrentUser.key(), cacheHitCb);
  };
}

export function useGetCurrentUserQuery() {
  return useApiQuery<GetCurrentUserResponse>(
    apiConstants.getCurrentUser.key(),
    apiConstants.getCurrentUser.endpoint
  );
}

import { apiConstants } from '@constants';
import { GetCurrentUser, LoginUser } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useLoginUserMutationCache() {
  return usePostMutation<LoginUser, GetCurrentUser>({
    successMessage: apiConstants.loginUser.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: (mutationResponseData) => ({
      status: 'success',
      data: mutationResponseData
    })
  });
}

export function useLoginUserMutation() {
  return useApiMutation<LoginUser>(
    apiConstants.loginUser.key(),
    apiConstants.loginUser.endpoint
  );
}

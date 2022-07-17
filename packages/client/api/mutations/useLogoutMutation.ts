import { apiConstants } from '@constants';
import { GetCurrentUser, LogoutUser } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useLogoutUserMutationCache() {
  return usePostMutation<LogoutUser, GetCurrentUser>({
    successMessage: apiConstants.logoutUser.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: () => null
  });
}

export function useLogoutUserMutation() {
  return useApiMutation<LogoutUser>(
    apiConstants.logoutUser.key(),
    apiConstants.logoutUser.endpoint
  );
}

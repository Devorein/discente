import { apiConstants } from '@constants';
import { ChangeUserPassword, GetCurrentUser } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useChangeUserPasswordMutationCache() {
  return usePostMutation<ChangeUserPassword, GetCurrentUser>({
    successMessage: apiConstants.changeUserPassword.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: () => null
  });
}

export function useChangeUserPasswordMutation() {
  return useApiMutation<ChangeUserPassword>(
    apiConstants.changeUserPassword.key(),
    apiConstants.changeUserPassword.endpoint,
    'put'
  );
}

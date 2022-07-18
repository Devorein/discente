import { apiConstants } from '@constants';
import { DeleteUser, GetCurrentUser } from '@types';
import { useGetCurrentUserQueryData } from 'api/queries';
import { useApiMutation, usePostMutation } from 'hooks';

export function useDeleteUserMutationCache() {
  return usePostMutation<DeleteUser, GetCurrentUser>({
    successMessage: apiConstants.deleteUser.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: () => null
  });
}

export function useDeleteUserMutation() {
  return useApiMutation(
    apiConstants.deleteUser.key(),
    apiConstants.deleteUser.endpoint,
    'delete'
  );
}

import { apiConstants } from '@constants';
import { GetCurrentUser, UpdateUser } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useUpdateUserMutationCache() {
  return usePostMutation<UpdateUser, GetCurrentUser>({
    successMessage: apiConstants.updateUser.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: (mutationResponseData) => {
      return {
        status: 'success',
        data: mutationResponseData
      };
    }
  });
}

export function useUpdateUserMutation() {
  return useApiMutation<UpdateUser>(
    apiConstants.updateUser.key(),
    apiConstants.updateUser.endpoint,
    'put'
  );
}

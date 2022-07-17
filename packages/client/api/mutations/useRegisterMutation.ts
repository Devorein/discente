import { apiConstants } from '@constants';
import { GetCurrentUser, RegisterUser } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useRegisterUserMutationCache() {
  return usePostMutation<RegisterUser, GetCurrentUser>({
    successMessage: apiConstants.registerUser.successMessage,
    queryDataFn: useGetCurrentUserQueryData(),
    cacheUpdate: (mutationResponse) => ({
      status: 'success',
      data: mutationResponse
    })
  });
}

export function useRegisterUserMutation() {
  return useApiMutation<RegisterUser>(
    apiConstants.registerUser.key(),
    apiConstants.registerUser.endpoint
  );
}

import {
  apiConstants
} from '@constants';
import { RegisterUserPayload, RegisterUserResponse } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useRegisterUserMutationCache() {
  const postMutationFn = usePostMutation<
    RegisterUserPayload,
    RegisterUserResponse
  >(apiConstants.registerUser.successMessage);
  const currentUserQueryDataFn = useGetCurrentUserQueryData();
  return (
    postCacheUpdateCb?: (mutationResponse: RegisterUserResponse) => void
  ) => {
    return postMutationFn((mutationResponse) => {
      currentUserQueryDataFn(() => {
        return {
          status: 'success',
          data: mutationResponse
        };
      });
      if (postCacheUpdateCb) {
        postCacheUpdateCb(mutationResponse);
      }
    });
  };
}

export function useRegisterUserMutation() {
  return useApiMutation<RegisterUserResponse, RegisterUserPayload>(
    apiConstants.registerUser.key(),
    apiConstants.registerUser.endpoint
  );
}

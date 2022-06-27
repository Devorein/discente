import {
  apiConstants
} from '@constants';
import { LoginUserPayload, LoginUserResponse } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useLoginUserMutationCache() {
  const postMutationFn = usePostMutation<LoginUserPayload, LoginUserResponse>(
    apiConstants.loginUser.successMessage
  );
  const getCurrentUserQueryDataFn = useGetCurrentUserQueryData();

  return (
    postCacheUpdateCb?: (mutationResponse: LoginUserResponse) => void
  ) => {
    return postMutationFn((mutationResponse) => {
      getCurrentUserQueryDataFn(() => {
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

export function useLoginUserMutation() {
  return useApiMutation<LoginUserResponse, LoginUserPayload>(
    apiConstants.loginUser.key(),
    apiConstants.loginUser.endpoint
  );
}

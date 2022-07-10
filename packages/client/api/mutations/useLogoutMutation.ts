import { apiConstants } from '@constants';
import { LogoutUserPayload } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useLogoutUserMutationCache() {
  const postMutationFn = usePostMutation<LogoutUserPayload, undefined>(
    apiConstants.logoutUser.successMessage
  );
  const getCurrentUserQueryDataFn = useGetCurrentUserQueryData();

  return (postCacheUpdateCb?: () => void) => {
    return postMutationFn(() => {
      getCurrentUserQueryDataFn(() => {
        return null;
      });
      if (postCacheUpdateCb) {
        postCacheUpdateCb();
      }
    });
  };
}

export function useLogoutUserMutation() {
  return useApiMutation<undefined, LogoutUserPayload>(
    apiConstants.logoutUser.key(),
    apiConstants.logoutUser.endpoint
  );
}

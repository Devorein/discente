import { apiConstants } from '@constants';
import { ChangeUserPasswordPayload } from '@types';
import { useGetCurrentUserQueryData } from 'api';
import { useApiMutation, usePostMutation } from 'hooks';

export function useChangeUserPasswordMutationCache() {
  const postMutationFn = usePostMutation<ChangeUserPasswordPayload>(
    apiConstants.changeUserPassword.successMessage
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

export function useChangeUserPasswordMutation() {
  return useApiMutation<null, ChangeUserPasswordPayload>(
    apiConstants.changeUserPassword.key(),
    apiConstants.changeUserPassword.endpoint,
    'put'
  );
}

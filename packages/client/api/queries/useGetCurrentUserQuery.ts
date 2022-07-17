import { apiConstants } from '@constants';
import { GetCurrentUser } from '@types';
import { useApiQuery, useQueryClientSetData } from 'hooks';

export function useGetCurrentUserQueryData() {
  return useQueryClientSetData<GetCurrentUser>(
    apiConstants.getCurrentUser.key()
  );
}

export function useGetCurrentUserQuery() {
  return useApiQuery<GetCurrentUser>(
    apiConstants.getCurrentUser.key(),
    apiConstants.getCurrentUser.endpoint
  );
}

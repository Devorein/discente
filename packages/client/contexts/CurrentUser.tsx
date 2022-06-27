import { UserWithoutSecretFields } from '@types';
import { useGetCurrentUserQuery } from 'api';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { QueryStatus } from 'react-query';

export interface ICurrentUserContext<Exists extends boolean = false> {
  currentUser: Exists extends true
    ? UserWithoutSecretFields
    : UserWithoutSecretFields | null | undefined;
  getCurrentUserQueryStatus: QueryStatus;
}

const CurrentUserContext = createContext<ICurrentUserContext>({
  currentUser: null,
  getCurrentUserQueryStatus: 'idle'
});

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const { data: getCurrentUserQueryData, status } = useGetCurrentUserQuery();

  const context = useMemo(
    () => ({
      currentUser:
        getCurrentUserQueryData?.status === 'success'
          ? getCurrentUserQueryData.data
          : null,
      getCurrentUserQueryStatus: status
    }),
    [getCurrentUserQueryData, status]
  );

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser<Exists extends boolean>() {
  const currentUserContext = useContext(CurrentUserContext);
  return currentUserContext as ICurrentUserContext<Exists>;
}

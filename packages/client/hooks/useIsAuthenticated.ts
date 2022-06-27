import { useCurrentUser } from 'contexts';
import Router from 'next/router';
import { useEffect } from 'react';

export const protectedRoutes = [
  '/profile/change-password',
  '/profile/update-user',
  '/profile'
];

export function useIsAuthenticated() {
  const { currentUser, getCurrentUserQueryStatus } = useCurrentUser();
  const router = Router.router as unknown as typeof Router;
  const isProtectedRoute = protectedRoutes.includes(router.route);
  const hasQueryResolved = getCurrentUserQueryStatus.match(/(error|success)/);

  useEffect(() => {
    if (!hasQueryResolved) {
      return;
    }

    if (currentUser) {
      if (router.route.match(/(login|register)/)) {
        router.push('/');
      } else {
        router.push(router.route);
      }
    } else if (isProtectedRoute) {
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [getCurrentUserQueryStatus, currentUser]);

  return {
    currentUser,
    isProtectedRoute,
    hasQueryResolved
  };
}

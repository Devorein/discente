import { useIsAuthenticated } from 'hooks';
import AuthRedirect from './AuthRedirect';

export default function RouteGuard({ children }: { children: JSX.Element }) {
  const { isProtectedRoute, hasQueryResolved, currentUser } =
    useIsAuthenticated();

  if (!hasQueryResolved) {
    return null;
  }

  if (isProtectedRoute && !currentUser) {
    return <AuthRedirect />;
  }

  return children;
}

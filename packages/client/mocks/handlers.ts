import { apiConstants, SERVER_URL } from '@constants';
import { GetCurrentUser } from '@types';
import { rest, RestHandler } from 'msw';
import { worker } from './browser';

export const handlers: RestHandler[] = [mockAuthenticatedHandler()];

function createMockUser(
  user?: Partial<GetCurrentUser['data']>
): GetCurrentUser['data'] {
  const userId = '83b9c493-1885-4253-be9d-6ea087f9142c';
  return {
    id: userId,
    email: 'john.doe@gmail.com',
    username: 'john_doe',
    name: 'John Doe',
    role: 'learner',
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: 'https://www.patterns.dev/img/reactjs/react-logo@3x.svg',
    status: 'public',
    ...(user ?? {})
  };
}

export function mockAuthenticatedHandler(
  user?: Partial<GetCurrentUser['data']>
) {
  const responseData = createMockUser(user);
  return rest.get(
    `${SERVER_URL}/v1/${apiConstants.getCurrentUser.endpoint}`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          data: responseData
        })
      );
    }
  );
}

export function mockUnAuthenticationHandler() {
  worker.use(
    rest.get(
      `${SERVER_URL}/v1/${apiConstants.getCurrentUser.endpoint}`,
      (_, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            status: 'error',
            message: 'Not authenticated'
          })
        );
      }
    )
  );
}

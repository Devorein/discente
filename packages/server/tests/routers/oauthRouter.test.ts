import { v4 } from 'uuid';
import {
  getGoogleOAuthTokensFn,
  getGoogleUserFn
} from '../../mocks/mockGoogleOAuth';
import oauthRouter from '../../src/routers/oauthRouter';
import { RegisterUser } from '../../src/types';
import { createSupertestAssertions } from '../helpers/supertest';

const { assertSupertestSuccessRequest, router } = createSupertestAssertions();

router.use('/oauth', oauthRouter);

describe('GET /oauth/google', () => {
  it(`Should pass if query is correct`, async () => {
    const id_token = 'id_token';
    const access_token = 'access_token';
    const email = `${v4().slice(0, 10)}@gmail.com`;
    const name = v4();

    getGoogleOAuthTokensFn.mockReturnValueOnce({
      id_token,
      access_token
    });

    getGoogleUserFn.mockReturnValueOnce({
      email,
      name
    });

    await assertSupertestSuccessRequest<RegisterUser['payload']>({
      endpoint: 'oauth/google?code=code',
      method: 'get',
      statusCode: 302
    });
  });
});

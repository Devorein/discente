import axios from 'axios';
import { NotAuthenticatedError } from '../../../src/ApiError';
import { GOOGLE_OAUTH_TOKEN_URL } from '../../../src/config';
import {
  getGoogleOAuthTokens,
  getGoogleUser,
  googleOauthTokenParams,
  verifyGoogleUser
} from '../../../src/libs/oauth/google';
import { getError } from '../../helpers/errors';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getGoogleOAuthTokens', () => {
  it(`Should get google oauth tokens`, async () => {
    const code = 'code';
    mockedAxios.post.mockResolvedValueOnce({
      data: 'data'
    });
    const data = await getGoogleOAuthTokens(code);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      GOOGLE_OAUTH_TOKEN_URL,
      new URLSearchParams({ ...googleOauthTokenParams, code }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    expect(data).toBe('data');
  });

  it(`Should throw not authenticated error`, async () => {
    const code = 'code';
    mockedAxios.post.mockRejectedValueOnce(new Error());
    const error = await getError(async () => getGoogleOAuthTokens(code));
    expect(error.message).toBe(NotAuthenticatedError.message);
    expect(error.statusCode).toBe(NotAuthenticatedError.statusCode);
  });
});

describe('getGoogleUser', () => {
  it(`Should get google user`, async () => {
    const idToken = 'idToken';
    const accessToken = 'accessToken';
    mockedAxios.get.mockResolvedValueOnce({
      data: 'data'
    });
    const data = await getGoogleUser(idToken, accessToken);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      }
    );
    expect(data).toBe('data');
  });

  it(`Should throw not authenticated error`, async () => {
    const idToken = 'idToken';
    const accessToken = 'accessToken';
    mockedAxios.get.mockRejectedValueOnce(new Error());
    const error = await getError(async () =>
      getGoogleUser(idToken, accessToken)
    );
    expect(error.message).toBe(NotAuthenticatedError.message);
    expect(error.statusCode).toBe(NotAuthenticatedError.statusCode);
  });
});

describe('verifyGoogleUser', () => {
  it(`Should verify google user`, async () => {
    const accessToken = 'accessToken';
    mockedAxios.get.mockResolvedValueOnce({
      data: 'data'
    });
    const data = await verifyGoogleUser(accessToken);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    expect(data).toBe('data');
  });

  it(`Should throw not authenticated error`, async () => {
    const accessToken = 'accessToken';
    mockedAxios.get.mockRejectedValueOnce(new Error());
    const error = await getError(async () => verifyGoogleUser(accessToken));
    expect(error.message).toBe(NotAuthenticatedError.message);
    expect(error.statusCode).toBe(NotAuthenticatedError.statusCode);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

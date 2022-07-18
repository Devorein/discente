const getGoogleUserFn = jest.fn();
const getGoogleOAuthTokensFn = jest.fn();

jest.mock('../src/libs/oauth/google', () => ({
  getGoogleOAuthTokens: getGoogleOAuthTokensFn,
  getGoogleUser: getGoogleUserFn
}));

export { getGoogleOAuthTokensFn, getGoogleUserFn };

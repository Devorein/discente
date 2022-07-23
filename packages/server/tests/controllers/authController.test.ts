import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { getGoogleOAuthTokensFn, getGoogleUserFn } from '../../mocks/mockGoogleOAuth';
import { IncorrectPasswordError, UniqueConstraintViolationError, UserNotFoundError } from '../../src/ApiError';
import { CLIENT_URL, prisma } from '../../src/config';
import authController from '../../src/controllers/authController';
import { registerUser } from '../../src/models/User';
import { ChangeUserPassword, LoginUser, LogoutUser, RegisterUser, SuccessApiResponse, UserWithoutSecretFields } from '../../src/types';
import { hashPassword } from '../../src/utils';
import { mockRequest, mockResponse } from '../helpers/mocks';
import { expectUserResponse } from '../helpers/user';

// test this user for updating
let activeUser: UserWithoutSecretFields;

const userPassword = 'Secret123$$';
const differentPassword = 'Terces321$$';

// test this user for login, registration
let privateUser: User;

beforeAll(async () => {
  const userId = v4();
  privateUser = (await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: v4(),
      status: 'private',
      name: "John Doe Private",
      role: "learner"
    }
  }));

  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe Public',
    role: "learner"
  });
});

describe('authController.register', () => {
  it(`Should fail if email is already taken`, async () => {
    const mockedRequest = mockRequest<RegisterUser['payload']>({
      body: {
        email: activeUser.email,
        password: v4(),
        username: `${activeUser.username}1`,
        name: 'John Doe',
        role: "learner"
      }
    });
    const mockedResponse = mockResponse();
    await authController.register(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UniqueConstraintViolationError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UniqueConstraintViolationError.messageConstructor('user', 'email')
    });
  });

  it(`Should register user and set cookies correctly`, async () => {
    const registerUserPayload: RegisterUser['payload'] = {
      email: `${v4()}@gmail.com`,
      password: 'Secret123%%',
      username: v4().slice(0, 12),
      name: "John Doe",
      role: "learner"
    };
    const mockedRequest = mockRequest<RegisterUser['payload']>({
      body: registerUserPayload
    });
    const mockedResponse = mockResponse();

    await authController.register(mockedRequest, mockedResponse);

    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<User>;
    expect(mockedResponse.mockedCookie.mock.calls[0][1].length).toBeGreaterThan(
      0
    );
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectUserResponse(registerUserPayload, mockedResponseData.data);
    expect(mockedResponseData.data).not.toHaveProperty('password');
  });
});

describe('authController.login', () => {
  it(`Should fail on incorrect username or email`, async () => {
    const mockedRequest = mockRequest<LoginUser['payload']>({
      body: {
        usernameOrEmail: `x${privateUser.email}`,
        password: userPassword
      }
    });
    const mockedResponse = mockResponse();
    await authController.login(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UserNotFoundError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UserNotFoundError.message
    });
  });

  it(`Should pass and set cookies correctly if valid email or username and password is provided`, async () => {
    const loginUserPayload: LoginUser['payload'] = {
      usernameOrEmail: privateUser.email,
      password: userPassword,
      remember: true
    };
    const mockedRequest = mockRequest<LoginUser['payload']>({
      body: loginUserPayload
    });
    const mockedResponse = mockResponse();

    await authController.login(mockedRequest, mockedResponse);

    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<UserWithoutSecretFields>;
    expect(mockedResponse.mockedCookie.mock.calls[0][1].length).toBeGreaterThan(
      0
    );
    expect(mockedResponse.mockedCookie.mock.calls[0][2].expires).toBeTruthy();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectUserResponse(
      privateUser,
      mockedResponseData.data
    );
    expect(mockedResponseData.data).not.toHaveProperty('password');
  });
});

describe('authController.logout', () => {
  it(`Should remove cookie successfully`, async () => {
    const mockedRequest = mockRequest<LogoutUser['payload']>();
    const mockedResponse = mockResponse();

    await authController.logout(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  });

  it(`Should remove cookie successfully when logging out from all devices`, async () => {
    const mockedRequest = mockRequest<LogoutUser['payload']>({
      body: { allDevices: true },
      user: { id: privateUser.id }
    });
    const mockedResponse = mockResponse();

    await authController.logout(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  })

  it(`Should fail to remove cookie successfully`, async () => {
    const mockedRequest = mockRequest<LogoutUser['payload']>();
    const mockedResponse = mockResponse();
    mockedResponse.mockedClearCookie.mockImplementationOnce(() => {
      throw new Error();
    });
    await authController.logout(mockedRequest, mockedResponse);
    expect(mockedResponse.status).toHaveBeenCalledWith(500);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Something went wrong, please try again!'
    });
  });
});

describe('authController.me', () => {
  it(`Should succeed on valid cookie for user`, async () => {
    const mockedRequest = mockRequest<LoginUser['payload']>({
      user: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name,
        // This should be removed
        hashedPass: '123'
      }
    });
    const mockedResponse = mockResponse();
    await authController.me(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name
      }
    });
  });
});

describe('authController.changePassword', () => {
  it('should not update on incorrect password', async () => {
    const mockedRequest = mockRequest<ChangeUserPassword['payload']>({
      body: {
        currentPassword: differentPassword,
        newPassword: userPassword
      },
      user: {
        hashedPass: privateUser.hashedPass
      }
    });
    const mockedResponse = mockResponse();
    await authController.changePassword(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      IncorrectPasswordError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: IncorrectPasswordError.message
    });
  });

  it('should update password correctly and remove auth cookies', async () => {
    const mockedRequest = mockRequest<ChangeUserPassword['payload']>({
      body: {
        currentPassword: userPassword,
        newPassword: differentPassword
      },
      user: {
        hashedPass: privateUser.hashedPass,
        id: privateUser.id
      }
    });
    const mockedResponse = mockResponse();
    await authController.changePassword(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<null>;
    expect(mockedResponseData.status).toBe('success');
  });
});

describe('authController.googleOauth', () => {
  it(`Should login as existing user`, async () => {
    const code = 'code';
    const id_token = 'id_token';
    const access_token = 'access_token';

    getGoogleOAuthTokensFn.mockReturnValueOnce({
      id_token,
      access_token
    });

    getGoogleUserFn.mockReturnValueOnce({
      email: activeUser.email,
      name: activeUser.name,
      avatar: activeUser.avatar
    });

    const mockedRequest = mockRequest({
      query: {
        code
      }
    });

    const mockedResponse = mockResponse();

    await authController.googleOauth(mockedRequest, mockedResponse);

    expect(getGoogleOAuthTokensFn).toHaveBeenCalledWith(code);
    expect(getGoogleUserFn).toHaveBeenCalledWith(id_token, access_token);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.cookie).toHaveBeenCalled();
    expect(mockedResponse.redirect).toHaveBeenCalledWith(CLIENT_URL);
  });

  it(`Should register as a new user`, async () => {
    const code = 'code';
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

    const mockedRequest = mockRequest({
      query: {
        code
      }
    });

    const mockedResponse = mockResponse();

    await authController.googleOauth(mockedRequest, mockedResponse);

    expect(getGoogleOAuthTokensFn).toHaveBeenCalledWith(code);
    expect(getGoogleUserFn).toHaveBeenCalledWith(id_token, access_token);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.cookie).toHaveBeenCalled();
    expect(mockedResponse.redirect).toHaveBeenCalledWith(CLIENT_URL);
    expect(
      await prisma.user.findUnique({
        where: {
          email
        }
      })
    ).not.toBeNull();
  });

  it(`Should remove cookie from response for any error`, async () => {
    const code = 'code';
    getGoogleOAuthTokensFn.mockRejectedValueOnce(new Error());

    const mockedRequest = mockRequest({
      query: {
        code
      }
    });

    const mockedResponse = mockResponse();

    await authController.googleOauth(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(401);
    expect(mockedResponse.clearCookie).toHaveBeenCalled();
    expect(mockedResponse.redirect).toHaveBeenCalledWith(CLIENT_URL);
  });
});
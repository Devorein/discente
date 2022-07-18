import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { UpdateFailedError, UserNotFoundError } from '../../src/ApiError';
import userController from '../../src/controllers/userController';
import { registerUser } from '../../src/models/User';
import { SuccessApiResponse, UpdateUser } from '../../src/types';
import { mockRequest, mockResponse } from '../helpers/mocks';
import { expectUserResponse } from '../helpers/user';

// test this user for updating
let activeUser: User;
let activeUser2: User;
let deletedUser: User;
const userPassword = 'Secret123$$';

beforeAll(async () => {
  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe'
  });
  activeUser2 = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe'
  });
  deletedUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe'
  });
});

describe('userController.update', () => {
  it(`should fail if user doesn't exist`, async () => {
    const mockedRequest = mockRequest<UpdateUser['payload']>({
      user: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name,
        id: v4()
      },
      body: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name,
        status: activeUser.status
      }
    });
    const mockedResponse = mockResponse();
    await userController.update(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UpdateFailedError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UpdateFailedError.messageConstructor('user')
    });
  });

  it('should update user properly', async () => {
    const updateUserPayload: UpdateUser['payload'] = {
      username: `${activeUser2.username}hi`,
      email: `${activeUser2.email}.net`,
      name: activeUser2.name,
      status: activeUser2.status
    };
    const mockedRequest = mockRequest<UpdateUser['payload']>({
      user: {
        username: activeUser2.username,
        email: activeUser2.email,
        name: activeUser2.name,
        id: activeUser2.id
      },
      body: updateUserPayload
    });
    const mockedResponse = mockResponse();
    await userController.update(mockedRequest, mockedResponse);
    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<UpdateUser['data']>;

    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectUserResponse(updateUserPayload, mockedResponseData.data);
  });
});

describe('userController.delete', () => {
  it(`should fail if user doesn't exist`, async () => {
    const mockedRequest = mockRequest({
      user: {
        id: v4()
      }
    });
    const mockedResponse = mockResponse();
    await userController.delete(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UserNotFoundError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UserNotFoundError.message
    });
  });

  it('should delete user', async () => {
    const mockedRequest = mockRequest({
      user: {
        id: deletedUser.id
      }
    });
    const mockedResponse = mockResponse();
    await userController.delete(mockedRequest, mockedResponse);
    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  });
});
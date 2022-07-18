import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { UserNotFoundError } from '../../src/ApiError';
import userController from '../../src/controllers/userController';
import { registerUser } from '../../src/models/User';
import { mockRequest, mockResponse } from '../helpers/mocks';

// test this user for updating
let deletedUser: User;
const userPassword = 'Secret123$$';

beforeAll(async () => {
  deletedUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe'
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
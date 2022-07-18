import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { prisma } from '../../src/config';
import {
  isAuthenticated
} from '../../src/middlewares/authentication';
import { hashPassword, signToken } from '../../src/utils';
import { mockRequest, mockResponse } from '../helpers/mocks';

let user: User;
const userId = v4();
const userPassword = 'Secret123$';

beforeAll(async () => {
  user = await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: v4().slice(0, 10),
      name: 'John Doe'
    },
  });
});

describe('isAuthenticated', () => {
  it(`Should fail if access_token doesn't exist in cookie`, async () => {
    const mockedRequest = mockRequest();
    const mockedResponse = mockResponse();

    await isAuthenticated(mockedRequest, mockedResponse, () => { });
    expect(mockedResponse.status).toHaveBeenCalledWith(401);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Not authenticated'
    });
  });

  it(`Should fail if user doesn't exist`, async () => {
    const token = signToken({
      id: v4()
    });
    const mockedRequest = mockRequest({ access_token: token });
    const mockedResponse = mockResponse();

    await isAuthenticated(mockedRequest, mockedResponse, () => { });
    expect(mockedResponse.status).toHaveBeenCalledWith(401);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Not authenticated'
    });
  });

  it(`Should fail if jwt payload is malformed`, async () => {
    const mockedRequest = mockRequest({ access_token: '123' });
    const mockedResponse = mockResponse();

    await isAuthenticated(mockedRequest, mockedResponse, () => { });
    expect(mockedResponse.status).toHaveBeenCalledWith(401);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Not authenticated'
    });
  });

  it(`Should fail if jwt payload tokenVersion doesn't match user's token version`, async () => {
    const mockedRequest = mockRequest({
      access_token: signToken({
        id: user.id,
        tokenVersion: 2
      })
    });
    const mockedResponse = mockResponse();

    await isAuthenticated(mockedRequest, mockedResponse, () => { });
    expect(mockedResponse.status).toHaveBeenCalledWith(401);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Not authenticated'
    });
    expect(mockedResponse.clearCookie).toHaveBeenCalled();
  });

  it(`Should call next and set user on request object if user does`, async () => {
    const token = signToken({
      id: user.id,
      tokenVersion: 0
    });
    const mockedRequest = mockRequest({ access_token: token });
    const mockedResponse = mockResponse();
    const nextFn = jest.fn();

    await isAuthenticated(mockedRequest, mockedResponse, nextFn);
    expect(nextFn).toHaveBeenCalled();
    expect((mockedRequest as any).user.id).toBe(user.id);
  });
});
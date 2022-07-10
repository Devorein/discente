import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { COOKIE_NAME } from '../../src/config';

type MockRequestOptions<Body, Query, Params> = {
  access_token?: string | null,
  user?: Partial<User> | null,
  body?: Request<Params, any, Body, Query>["body"] | null,
  query?: Request<Params, any, Body, Query>["query"] | null,
  params?: Request<Params, any, Body, Query>["params"],
  headers?: Record<string, any>
};

export function mockRequest<Body, Query = Record<string, any>, Params = Record<string, any>>(mockRequestOptions?: MockRequestOptions<Body, Query, Params>) {
  const { params, query, access_token, user, body, headers } = mockRequestOptions ?? {
    headers: {}
  };
  return {
    cookies: {
      [COOKIE_NAME]: access_token
    },
    body,
    query,
    user,
    params,
    headers
  } as unknown as Request<Params, any, Body, Query>
}

export function mockResponse() {
  const mockedStatus = jest.fn();
  const mockedJson = jest.fn();
  const mockedCookie = jest.fn();
  const mockedClearCookie = jest.fn();
  const mockedRedirect = jest.fn();
  return {
    status: mockedStatus,
    json: mockedJson,
    cookie: mockedCookie,
    clearCookie: mockedClearCookie,
    redirect: mockedRedirect,
    mockedClearCookie,
    mockedStatus,
    mockedJson,
    mockedCookie,
    mockedRedirect
  } as unknown as Response & {
    mockedStatus: jest.Mock,
    mockedJson: jest.Mock,
    mockedCookie: jest.Mock,
    mockedClearCookie: jest.Mock,
    mockedRedirect: jest.Mock
  }
}
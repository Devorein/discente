import * as yup from 'yup';
import validateData from '../../src/middlewares/validateData';
import { mockRequest, mockResponse } from '../helpers/mocks';

describe.only('validateData', () => {
  it(`Should fail if no payload is passed`, async () => {
    const mockedReq = mockRequest();
    const mockedRes = mockResponse();
    await validateData(yup.string().required().strict())(
      mockedReq,
      mockedRes,
      () => { }
    );
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Payload is required'
    });
  });

  it(`Should fail if no query is passed`, async () => {
    const mockedReq = mockRequest();
    const mockedRes = mockResponse();
    await validateData(yup.string().required().strict(), true)(
      mockedReq,
      mockedRes,
      () => { }
    );
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Query is required'
    });
  });

  it(`Should fail if payload doesn't match validation schema`, async () => {
    const mockedReq = mockRequest({ body: 123 });
    const mockedRes = mockResponse();
    await validateData(yup.string().required().strict())(
      mockedReq,
      mockedRes,
      () => { }
    );
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'this must be a `string` type, but the final value was: `123`.'
    });
  });

  it(`Should pass if body match validation schema`, async () => {
    const mockedReq = mockRequest({ body: 'string' });
    const mockedRes = mockResponse();
    const nextFn = jest.fn();
    await validateData(yup.string().required().strict())(
      mockedReq,
      mockedRes,
      nextFn
    );
    expect(nextFn).toHaveBeenCalled();
  });

  it(`Should pass if query match validation schema`, async () => {
    const mockedReq = mockRequest({ query: 'string' });
    const mockedRes = mockResponse();
    const nextFn = jest.fn();
    await validateData(yup.string().required().strict(), true)(
      mockedReq,
      mockedRes,
      nextFn
    );
    expect(nextFn).toHaveBeenCalled();
  });
});

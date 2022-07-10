import ApiError from "../../src/ApiError";

export const getError = async<Error = ApiError>(call: () => unknown): Promise<Error> => {
  try {
    await call();
    throw new Error('Test should fail');
  } catch (error: unknown) {
    return error as Error;
  }
};
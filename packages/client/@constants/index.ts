import { BaseSchema } from 'yup';

export const SERVER_URL =
  (process.env.NEXT_PUBLIC_SERVER_URL as string) ?? 'http://localhost:3006';
export const API_VERSION = 'v1';

interface ApiConstantsPartial {
  successMessage?: string
  errorMessage?: string
  endpoint: string
  key: ((...args: any) => string[])
}

type ApiConstants<Payload = undefined> = (Payload extends undefined ? ApiConstantsPartial : (ApiConstantsPartial & {
  payloadFactory: () => Payload,
  validationSchema: BaseSchema,
}))

const getCurrentUserConstants: ApiConstants = {
  endpoint: 'auth/me',
  key: () => ['me']
};

export const apiConstants = {
  getCurrentUser: getCurrentUserConstants
};

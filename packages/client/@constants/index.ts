// eslint-disable-next-line
import { changeUserPasswordClientPayloadSchema, loginUserPayloadSchema, registerUserPayloadSchema } from '@discente/shared';
import { ChangeUserPassword, LoginUser, RegisterUser } from '@types';
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

type FormConstants<Payload extends Record<string, any>> = {
  label: Record<keyof Payload, string>
  placeholder: Record<keyof Payload, string>
  submitButtonText: string
  onLoadButtonText: string
  formHeaderText: string
  formHeaderHelperText: string;
}

const registerUserConstants: ApiConstants<RegisterUser['payload']> & FormConstants<RegisterUser['payload']> = {
  endpoint: 'auth/register',
  payloadFactory: () => {
    return {
      username: '',
      name: '',
      email: '',
      password: ''
    };
  },
  successMessage: 'Successfully registered!',
  validationSchema: registerUserPayloadSchema(),
  key: () => ['register'],
  label: {
    email: 'Email',
    name: 'Full name',
    password: 'Password',
    username: 'Username'
  },
  placeholder: {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    password: '********',
    username: 'john_doe'
  },
  submitButtonText: 'Sign up',
  onLoadButtonText: 'Signing up...',
  formHeaderText: 'Create an account',
  formHeaderHelperText:
    'Welcome to Discente, please register your account to start using the app'
};

const loginUserConstants: ApiConstants<LoginUser['payload']> & FormConstants<LoginUser['payload']> = {
  endpoint: 'auth/login',
  payloadFactory: () => {
    return {
      usernameOrEmail: '',
      password: '',
      remember: false
    };
  },
  successMessage: 'Successfully logged In!',
  key: () => ['login'],
  validationSchema: loginUserPayloadSchema(),
  label: {
    usernameOrEmail: 'Username or Email',
    password: 'Password',
    remember: 'Remember me'
  },
  placeholder: {
    usernameOrEmail: 'john.doe@gmail.com',
    password: '********',
    remember: 'Remember me'
  },
  onLoadButtonText: 'Logging in...',
  submitButtonText: 'Login',
  formHeaderText: 'Log in',
  formHeaderHelperText:
    'Welcome back to Discente! Please log in to your account to continue using the app'
};

const logoutUserConstants: ApiConstants = {
  endpoint: 'auth/logout',
  key: () => ['logout'],
  successMessage: 'Successfully logged out!'
};

const changeUserPasswordConstants: ApiConstants<
  ChangeUserPassword['payload'] & {
    confirmNewPassword: string;
  }
> = {
  payloadFactory: () => ({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  endpoint: 'auth/change-password',
  key: () => ['change-password'],
  successMessage: 'Successfully Changed Password!',
  validationSchema: changeUserPasswordClientPayloadSchema()
};

export const apiConstants = {
  getCurrentUser: getCurrentUserConstants,
  registerUser: registerUserConstants,
  logoutUser: logoutUserConstants,
  loginUser: loginUserConstants,
  changeUserPassword: changeUserPasswordConstants
};

export const siteMetadata = {
  copyrightText: '© 2022 Discente All rights reserved.',
  brand: { image: '/logo.svg', width: 25, text: 'Discente' },
  footerLinks: [
    {
      href: '/privacy',
      label: 'Privacy'
    },
    {
      href: '/terms',
      label: 'Terms'
    },
    {
      href: '/blog',
      label: 'Blog'
    },
    {
      href: '/support',
      label: 'Support'
    }
  ]
};

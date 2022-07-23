// eslint-disable-next-line
import { changeUserPasswordClientPayloadSchema, loginUserPayloadSchema, registerUserPayloadSchema, updateUserPayloadSchema } from '@discente/shared';
import { ChangeUserPassword, LoginUser, RegisterUser, UpdateUser } from '@types';
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
  formHeaderHelperText?: string;
  helperText?: Partial<Record<keyof Payload, string>>;
}

const registerUserConstants: ApiConstants<RegisterUser['payload']> & FormConstants<RegisterUser['payload']> = {
  endpoint: 'auth/register',
  payloadFactory: () => {
    return {
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'learner'
    };
  },
  successMessage: 'Successfully registered!',
  validationSchema: registerUserPayloadSchema(),
  key: () => ['register'],
  label: {
    email: 'Email',
    name: 'Full name',
    password: 'Password',
    username: 'Username',
    role: 'Join as'
  },
  placeholder: {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    password: '********',
    username: 'john_doe',
    role: ''
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
  formHeaderText: 'Log in to your account',
  formHeaderHelperText:
    'Welcome back to Discente! Please log in to your account to continue using the app'
};

const logoutUserConstants: ApiConstants = {
  endpoint: 'auth/logout',
  key: () => ['logout'],
  successMessage: 'Successfully logged out!'
};

const deleteUserConstants: ApiConstants = {
  endpoint: 'user',
  key: () => ['delete-user'],
  successMessage: 'Successfully deleted user'
};

type UpdateUserConstants = Omit<
  ApiConstants<UpdateUser['payload']>,
  'payloadFactory'
> &
  FormConstants<UpdateUser['payload']>;

const updateUserConstants: UpdateUserConstants = {
  endpoint: 'user',
  key: () => ['update-user'],
  validationSchema: updateUserPayloadSchema(),
  successMessage: 'Successfully Updated User!',
  label: {
    email: 'Email',
    name: 'Full name',
    status: 'Status',
    username: 'Username'
  },
  placeholder: {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    username: 'john_doe',
    status: ''
  },
  formHeaderText: 'Update your information',
  formHeaderHelperText: 'Update your information',
  onLoadButtonText: 'Updating User',
  submitButtonText: 'Confirm'
};

interface ChangeUserPasswordConstants
  extends ApiConstants<
    ChangeUserPassword['payload'] & {
      confirmNewPassword: string;
    }
  >,
  FormConstants<
    ChangeUserPassword['payload'] & {
      confirmNewPassword: string;
    }
  > { }

const changeUserPasswordConstants: ChangeUserPasswordConstants = {
  payloadFactory: () => ({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  endpoint: 'auth/change-password',
  key: () => ['change-password'],
  successMessage: 'Successfully changed Password!',
  validationSchema: changeUserPasswordClientPayloadSchema(),
  formHeaderText: 'Change password',
  submitButtonText: 'Change',
  label: {
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm password'
  },
  placeholder: {
    currentPassword: '********',
    newPassword: '********',
    confirmNewPassword: '********'
  },
  helperText: {
    newPassword: registerUserConstants.helperText?.password,
    confirmNewPassword: 'Must be same as new password'
  },
  onLoadButtonText: 'Changing'
};

export const apiConstants = {
  getCurrentUser: getCurrentUserConstants,
  registerUser: registerUserConstants,
  updateUser: updateUserConstants,
  logoutUser: logoutUserConstants,
  loginUser: loginUserConstants,
  deleteUser: deleteUserConstants,
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

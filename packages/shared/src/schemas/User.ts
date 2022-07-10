import * as yup from 'yup';

const USERNAME_REGEX = /^[a-z0-9_.-]+$/
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[\]\\' ~_]).*/

export function registerUserPayloadSchema() {
  return yup
    .object({
      email: yup
        .string()
        .email('Not a valid email')
        .max(255)
        .required()
        .typeError('Invalid'),
      username: yup
        .string()
        .min(3)
        .max(25)
        .matches(USERNAME_REGEX)
        .required(),
      name: yup.string().min(2).max(50).required(),
      password: yup
        .string()
        .required()
        .min(8, 'Must be more than 8 characters')
        .matches(PASSWORD_REGEX, 'Weak Password')
    })
    .strict()
    .noUnknown();
}

export function loginUserPayloadSchema() {
  return yup
    .object()
    .shape({
      usernameOrEmail: yup.string().required('Username or Email is required!'),
      password: yup.string().required('Password is required!'),
      remember: yup.bool()
    })
    .strict()
    .noUnknown();
}

export function changeUserPasswordPayloadSchema() {
  return yup
    .object()
    .shape({
      currentPassword: yup.string().required('Current Password is required!'),
      newPassword: yup.string().required('New Password is required!')
    })
    .test(
      'Equal Passwords',
      'Passwords should not be the same',
      (obj) => obj.currentPassword !== obj.newPassword
    )
    .strict()
    .noUnknown();
}
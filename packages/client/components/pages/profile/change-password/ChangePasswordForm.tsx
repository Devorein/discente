import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { changeUserPasswordClientPayloadSchema } from '@reinforz/shared';
import { ChangeUserPasswordPayload } from '@types';
import {
  useChangeUserPasswordMutation,
  useChangeUserPasswordMutationCache
} from 'api';
import { PasswordInput } from 'components';
import { Form, Formik } from 'formik';

const changeUserPasswordPayloadFactory = (): ChangeUserPasswordPayload & {
  confirmNewPassword: string;
} => {
  return {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
};

export interface ChangePasswordFormProps {
  initialValues?: ChangeUserPasswordPayload & {
    confirmNewPassword: string;
  };
}

const changeUserPasswordPayloadValidationSchema =
  changeUserPasswordClientPayloadSchema();

export default function ChangePasswordForm({
  initialValues = changeUserPasswordPayloadFactory()
}: ChangePasswordFormProps) {
  const { isLoading, mutateAsync } = useChangeUserPasswordMutation();
  const changeUserPasswordMutationCacheFn =
    useChangeUserPasswordMutationCache();
  return (
    <Formik
      validateOnBlur={false}
      validationSchema={changeUserPasswordPayloadValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        await mutateAsync(
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
          },
          changeUserPasswordMutationCacheFn(() => {
            resetForm();
          })
        );
      }}
      validateOnMount
      validateOnChange={true}
      initialValues={initialValues}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Typography variant='h3'>Change Your Password</Typography>
          <Stack gap={1}>
            <PasswordInput
              autoFocus
              label='Current Password'
              disabled={isSubmitting}
              placeholder='********'
              name='currentPassword'
            />

            <PasswordInput
              label='New Password'
              disabled={isSubmitting}
              placeholder='********'
              name='newPassword'
            />

            <PasswordInput
              label='Confirm New Password'
              disabled={isSubmitting}
              placeholder='********'
              name='confirmNewPassword'
            />
          </Stack>
          {isLoading ? (
            <LoadingButton disabled>Resetting Password...</LoadingButton>
          ) : (
            <Button type='submit' disabled={isSubmitting || !isValid}>
              Change Password
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

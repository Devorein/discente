import { apiConstants } from '@constants';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { RegisterUserPayload } from '@types';
import { useRegisterUserMutation, useRegisterUserMutationCache } from 'api';
import { PasswordInput, TextInput } from 'components';
import { Form, Formik } from 'formik';

export interface RegisterFormProps {
  initialValues?: RegisterUserPayload;
}

export default function RegisterForm({
  initialValues = apiConstants.registerUser.payloadFactory()
}: RegisterFormProps) {
  const { isLoading, mutateAsync } = useRegisterUserMutation();
  const registerUserMutationCacheFn = useRegisterUserMutationCache();

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={apiConstants.registerUser.validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await mutateAsync(
          values,
          registerUserMutationCacheFn(() => {
            resetForm();
          })
        );
      }}
      validateOnMount
      initialValues={initialValues}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Typography variant='h4'>
            {apiConstants.registerUser.formHeaderText}
          </Typography>
          <Stack gap={1}>
            <TextInput
              autoFocus
              label={apiConstants.registerUser.label.name}
              disabled={isSubmitting}
              placeholder={apiConstants.registerUser.placeholder.name}
              name='name'
            />
            <TextInput
              label={apiConstants.registerUser.label.username}
              disabled={isSubmitting}
              placeholder={apiConstants.registerUser.placeholder.username}
              name='username'
              sx={{}}
            />
            <TextInput
              label={apiConstants.registerUser.label.email}
              disabled={isSubmitting}
              placeholder={apiConstants.registerUser.placeholder.email}
              name='email'
            />
            <PasswordInput
              label={apiConstants.registerUser.label.password}
              disabled={isSubmitting}
              placeholder={apiConstants.registerUser.placeholder.password}
              name='password'
            />
          </Stack>
          {isLoading ? (
            <LoadingButton disabled>
              {apiConstants.registerUser.onLoadButtonText}
            </LoadingButton>
          ) : (
            <Button
              aria-label='register'
              type='submit'
              disabled={isSubmitting || !isValid}
            >
              {apiConstants.registerUser.submitButtonText}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

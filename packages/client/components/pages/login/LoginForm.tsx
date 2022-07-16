import { apiConstants } from '@constants';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LoginUser } from '@types';
import { useLoginUserMutation, useLoginUserMutationCache } from 'api';
import { CheckboxInput, PasswordInput, TextInput } from 'components';
import { Form, Formik } from 'formik';
import { useLocalStorage } from 'hooks';

export interface LoginFormProps {
  initialValues?: LoginUser['payload'];
}

export default function LoginForm({
  initialValues = apiConstants.loginUser.payloadFactory()
}: LoginFormProps) {
  const { isLoading, mutateAsync } = useLoginUserMutation();
  const loginUserMutationCacheFn = useLoginUserMutationCache();
  const [rememberState, setRememberState] = useLocalStorage(
    'login.remember',
    false
  );

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={apiConstants.loginUser.validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await mutateAsync(
          values,
          loginUserMutationCacheFn(() => {
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
            {apiConstants.loginUser.formHeaderText}
          </Typography>
          <Stack gap={1}>
            <TextInput
              autoFocus
              label={apiConstants.loginUser.label.usernameOrEmail}
              disabled={isSubmitting}
              placeholder={apiConstants.loginUser.placeholder.usernameOrEmail}
              name='usernameOrEmail'
            />
            <PasswordInput
              label={apiConstants.loginUser.label.password}
              disabled={isSubmitting}
              placeholder={apiConstants.loginUser.placeholder.password}
              name='password'
            />
            <CheckboxInput
              label={apiConstants.loginUser.label.remember}
              disabled={isSubmitting}
              name='remember'
              checked={rememberState}
              onClick={() => {
                setRememberState((prev) => {
                  return !prev;
                });
              }}
            />
          </Stack>
          {isLoading ? (
            <LoadingButton disabled>
              {apiConstants.loginUser.onLoadButtonText}
            </LoadingButton>
          ) : (
            <Button type='submit' disabled={isSubmitting || !isValid}>
              {apiConstants.loginUser.submitButtonText}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

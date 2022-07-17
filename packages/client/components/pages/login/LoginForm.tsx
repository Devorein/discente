import { apiConstants } from '@constants';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { LoginUser } from '@types';
import { useLoginUserMutation, useLoginUserMutationCache } from 'api';
import {
  CenteredText,
  CheckboxInput,
  Logo,
  PasswordInput,
  StyledLink,
  TextInput
} from 'components';
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

  const sideColor = useTheme().palette.mode === 'dark' ? '#dddddd' : '#222222';

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
        <Grid container display='flex' width='100%' height='100%' flexGrow={1}>
          <Grid
            item
            md={6}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Form
              style={{
                height: 'fit-content',
                maxWidth: 450
              }}
            >
              <Box my={3}>
                <Logo
                  sx={{
                    my: 2
                  }}
                />
                <Stack gap={1} mb={1} flexDirection='row' alignItems='center'>
                  <Typography variant='h4'>
                    {apiConstants.loginUser.formHeaderText}
                  </Typography>
                </Stack>
                <Typography
                  variant='subtitle1'
                  sx={{
                    opacity: 0.75
                  }}
                >
                  {apiConstants.loginUser.formHeaderHelperText}
                </Typography>
                <Divider
                  sx={{
                    my: 2
                  }}
                />
              </Box>
              <Stack gap={2} mb={2}>
                <TextInput
                  autoFocus
                  required
                  label={apiConstants.loginUser.label.usernameOrEmail}
                  disabled={isSubmitting}
                  placeholder={
                    apiConstants.loginUser.placeholder.usernameOrEmail
                  }
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
              <Stack flexDirection='row' justifyContent='space-between' mb={3}>
                {isLoading ? (
                  <LoadingButton disabled>
                    {apiConstants.loginUser.onLoadButtonText}
                  </LoadingButton>
                ) : (
                  <Button
                    aria-label='login'
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting || !isValid}
                  >
                    {apiConstants.loginUser.submitButtonText}
                  </Button>
                )}
              </Stack>
              <CenteredText>
                <Typography variant='subtitle2'>
                  Don't have an account?{' '}
                </Typography>
                <StyledLink href='/register' highlight>
                  Sign up
                </StyledLink>
              </CenteredText>
            </Form>
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                flexGrow: 1,
                backgroundColor: sideColor
              }}
            />
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}

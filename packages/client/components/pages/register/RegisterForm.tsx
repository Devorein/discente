import { apiConstants } from '@constants';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { RegisterUser, UserRole } from '@types';
import { useRegisterUserMutation, useRegisterUserMutationCache } from 'api';
import {
  CenteredText,
  Logo,
  PasswordInput,
  SelectInput,
  StyledLink,
  TextInput
} from 'components';
import OAuthBar from 'components/common/OAuthBar';
import { Form, Formik } from 'formik';

export interface RegisterFormProps {
  initialValues?: RegisterUser['payload'];
}

export default function RegisterForm({
  initialValues = apiConstants.registerUser.payloadFactory()
}: RegisterFormProps) {
  const { isLoading, mutateAsync } = useRegisterUserMutation();
  const registerUserMutationCacheFn = useRegisterUserMutationCache();

  const sideColor = useTheme().palette.mode === 'dark' ? '#dddddd' : '#222222';

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
                    {apiConstants.registerUser.formHeaderText}
                  </Typography>
                </Stack>
                <Typography
                  variant='subtitle1'
                  sx={{
                    opacity: 0.75
                  }}
                >
                  {apiConstants.registerUser.formHeaderHelperText}
                </Typography>
                <Divider
                  sx={{
                    my: 2
                  }}
                />
              </Box>
              <Stack gap={2} mb={2}>
                <Stack
                  justifyContent='space-between'
                  flexDirection='row'
                  gap={1}
                >
                  <TextInput
                    formControlProps={{
                      sx: {
                        flexGrow: 1
                      }
                    }}
                    autoFocus
                    label={apiConstants.registerUser.label.name}
                    disabled={isSubmitting}
                    placeholder={apiConstants.registerUser.placeholder.name}
                    name='name'
                    required
                  />
                  <SelectInput<UserRole>
                    name='role'
                    label={apiConstants.registerUser.label.role}
                    values={['teacher', 'learner']}
                    defaultValue='learner'
                    renderValue={(value) => {
                      return (
                        <Typography>
                          {value[0].toUpperCase() + value.slice(1)}
                        </Typography>
                      );
                    }}
                    sx={{
                      minWidth: 150
                    }}
                  />
                </Stack>
                <TextInput
                  required
                  label={apiConstants.registerUser.label.username}
                  disabled={isSubmitting}
                  placeholder={apiConstants.registerUser.placeholder.username}
                  name='username'
                />
                <TextInput
                  required
                  label={apiConstants.registerUser.label.email}
                  disabled={isSubmitting}
                  placeholder={apiConstants.registerUser.placeholder.email}
                  name='email'
                />
                <PasswordInput
                  label={apiConstants.registerUser.label.password}
                  disabled={isSubmitting}
                  placeholder={apiConstants.registerUser.placeholder.password}
                  helperText={apiConstants.registerUser.helperText?.password}
                  name='password'
                />
              </Stack>
              <CenteredText my={2}>
                <Typography variant='subtitle2'>
                  By submitting this form you agree with our{' '}
                </Typography>
                <StyledLink href='/terms' highlight>
                  Terms of Service
                </StyledLink>{' '}
                and{' '}
                <StyledLink href='/privacy' highlight>
                  Privacy Policy
                </StyledLink>
              </CenteredText>
              <Stack flexDirection='row' justifyContent='space-between' mb={3}>
                {isLoading ? (
                  <LoadingButton disabled>
                    {apiConstants.registerUser.onLoadButtonText}
                  </LoadingButton>
                ) : (
                  <Button
                    aria-label='register'
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting || !isValid}
                  >
                    {apiConstants.registerUser.submitButtonText}
                  </Button>
                )}
                <OAuthBar />
              </Stack>

              <CenteredText>
                <Typography variant='subtitle2'>
                  Already have an account?{' '}
                </Typography>
                <StyledLink href='/login' highlight>
                  Sign in
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

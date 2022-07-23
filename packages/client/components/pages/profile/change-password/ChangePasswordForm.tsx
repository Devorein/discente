import { apiConstants } from '@constants';
import { changeUserPasswordClientPayloadSchema } from '@discente/shared';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { ChangeUserPassword } from '@types';
import {
  useChangeUserPasswordMutation,
  useChangeUserPasswordMutationCache
} from 'api';
import { PasswordInput } from 'components';
import { Form, Formik } from 'formik';

const changeUserPasswordPayloadFactory = (): ChangeUserPassword['payload'] & {
  confirmNewPassword: string;
} => {
  return {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
};

export interface ChangePasswordFormProps {
  initialValues?: ChangeUserPassword['payload'] & {
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
        <Grid container display='flex' width='100%' height='100%' flexGrow={1}>
          <Grid
            item
            md={12}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Form
              style={{
                height: 'fit-content',
                width: 500
              }}
            >
              <Box my={3}>
                <Stack gap={1} mb={1} flexDirection='row' alignItems='center'>
                  <Typography variant='h4'>
                    {apiConstants.changeUserPassword.formHeaderText}
                  </Typography>
                </Stack>
                <Divider
                  sx={{
                    my: 2
                  }}
                />
              </Box>
              <Stack gap={2} mb={2}>
                <PasswordInput
                  autoFocus
                  label={apiConstants.changeUserPassword.label.currentPassword}
                  disabled={isSubmitting}
                  placeholder={
                    apiConstants.changeUserPassword.placeholder.currentPassword
                  }
                  name='currentPassword'
                />

                <PasswordInput
                  label={apiConstants.changeUserPassword.label.newPassword}
                  disabled={isSubmitting}
                  placeholder={
                    apiConstants.changeUserPassword.placeholder.newPassword
                  }
                  helperText={
                    apiConstants.changeUserPassword.helperText?.newPassword
                  }
                  name='newPassword'
                />

                <PasswordInput
                  label={
                    apiConstants.changeUserPassword.label.confirmNewPassword
                  }
                  disabled={isSubmitting}
                  placeholder={
                    apiConstants.changeUserPassword.placeholder
                      .confirmNewPassword
                  }
                  helperText={
                    apiConstants.changeUserPassword.helperText
                      ?.confirmNewPassword
                  }
                  name='confirmNewPassword'
                />
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' mb={3}>
                {isLoading ? (
                  <LoadingButton disabled>
                    {apiConstants.registerUser.onLoadButtonText}
                  </LoadingButton>
                ) : (
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting || !isValid}
                  >
                    {apiConstants.changeUserPassword.submitButtonText}
                  </Button>
                )}
              </Stack>
            </Form>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}

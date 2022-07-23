import { apiConstants } from '@constants';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { UpdateUser } from '@types';
import { useUpdateUserMutation, useUpdateUserMutationCache } from 'api';
import { SelectInput, TextInput } from 'components';
import { useCurrentUser } from 'contexts';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

export default function UpdateUserForm() {
  const { currentUser } = useCurrentUser<true>();
  const { isLoading, mutateAsync } = useUpdateUserMutation();
  const updateUserMutationCacheFn = useUpdateUserMutationCache();
  const router = useRouter();

  const { username, email, name, status } = currentUser;
  return (
    <Formik
      validateOnBlur={false}
      validationSchema={apiConstants.updateUser.validationSchema}
      onSubmit={async (values: UpdateUser['payload'], { resetForm }) => {
        await mutateAsync(
          values,
          updateUserMutationCacheFn(() => {
            resetForm();
            router.push('/profile');
          })
        );
      }}
      validateOnMount
      validateOnChange={true}
      initialValues={{ username, email, name, status }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Typography variant='h3'>
            {apiConstants.updateUser.formHeaderText}
          </Typography>
          <Stack gap={1}>
            <TextInput
              autoFocus
              label={apiConstants.updateUser.label.username}
              disabled={isSubmitting}
              placeholder={apiConstants.updateUser.placeholder.username}
              name='username'
            />

            <TextInput
              label={apiConstants.updateUser.label.email}
              disabled={isSubmitting}
              placeholder={apiConstants.updateUser.placeholder.email}
              name='email'
            />

            <TextInput
              label={apiConstants.updateUser.label.name}
              disabled={isSubmitting}
              placeholder={apiConstants.updateUser.placeholder.name}
              name='name'
            />

            <SelectInput
              label={apiConstants.updateUser.label.status}
              disabled={isSubmitting}
              name='status'
              values={['public', 'private']}
            />
          </Stack>
          {isLoading ? (
            <LoadingButton disabled>
              {apiConstants.updateUser.onLoadButtonText}
            </LoadingButton>
          ) : (
            <Button type='submit' disabled={isSubmitting || !isValid}>
              {apiConstants.updateUser.submitButtonText}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

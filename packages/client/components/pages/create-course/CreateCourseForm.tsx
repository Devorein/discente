import { apiConstants } from '@constants';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { CreateCourse } from '@types';
import { useCreateCourseMutation } from 'api';
import { Button, SelectInput, TagsInput, TextInput } from 'components';
import { Form, Formik } from 'formik';

export interface CreateCourseFormProps {
  initialValues?: CreateCourse['payload'];
}

export default function CreateCourseForm({
  initialValues = apiConstants.createCourse.payloadFactory()
}: CreateCourseFormProps) {
  const { isLoading, mutateAsync } = useCreateCourseMutation();

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={apiConstants.createCourse.validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await mutateAsync(values, {
          onSuccess() {
            resetForm();
          }
        });
      }}
      validateOnMount
      initialValues={initialValues}
    >
      {({ isSubmitting, isValid }) => (
        <Grid
          container
          display='flex'
          justifyContent='center'
          width='100%'
          height='100%'
          flexGrow={1}
        >
          <Grid item display='flex' justifyContent='center' alignItems='center'>
            <Form
              style={{
                height: 'fit-content',
                width: 500
              }}
            >
              <Box my={3}>
                <Stack gap={1} mb={1} flexDirection='row' alignItems='center'>
                  <Typography variant='h4'>
                    {apiConstants.createCourse.formHeaderText}
                  </Typography>
                </Stack>
                <Typography
                  variant='subtitle1'
                  sx={{
                    opacity: 0.75
                  }}
                >
                  {apiConstants.createCourse.formHeaderHelperText}
                </Typography>
                <Divider
                  sx={{
                    my: 2
                  }}
                />
              </Box>
              <Stack gap={2} mb={2}>
                <TextInput
                  required
                  label={apiConstants.createCourse.label.title}
                  disabled={isSubmitting}
                  placeholder={apiConstants.createCourse.placeholder.title}
                  name='title'
                />
                <TextInput
                  required
                  multiline
                  rows={5}
                  label={apiConstants.createCourse.label.description}
                  disabled={isSubmitting}
                  placeholder={
                    apiConstants.createCourse.placeholder.description
                  }
                  name='description'
                />
                <TextInput
                  required
                  label={apiConstants.createCourse.label.image}
                  disabled={isSubmitting}
                  placeholder={apiConstants.createCourse.placeholder.image}
                  name='image'
                />
                <Stack
                  justifyContent='space-between'
                  flexDirection='row'
                  gap={1}
                >
                  <TextInput
                    required
                    type='number'
                    InputProps={{
                      inputProps: {
                        min: 0,
                        step: 1
                      }
                    }}
                    label={apiConstants.createCourse.label.price}
                    disabled={isSubmitting}
                    placeholder={apiConstants.createCourse.placeholder.price}
                    name='price'
                  />
                  <SelectInput
                    label={apiConstants.createCourse.label.status}
                    disabled={isSubmitting}
                    name='status'
                    values={['public', 'private']}
                    formControlProps={{
                      sx: {
                        flexGrow: 1
                      }
                    }}
                  />
                </Stack>
                <TagsInput name='tags' />
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' mb={3}>
                {isLoading ? (
                  <LoadingButton disabled>
                    {apiConstants.createCourse.onLoadButtonText}
                  </LoadingButton>
                ) : (
                  <Button
                    aria-label='register'
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting || !isValid}
                  >
                    {apiConstants.createCourse.submitButtonText}
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

import { Meta, Story } from '@storybook/react';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';

import { PasswordInput, Providers, TextInputProps } from 'components';

export default {
  title: 'Components/Form/Password Input',
  component: PasswordInput
} as Meta;

const Template: Story<
  { passwordInputProps: TextInputProps } & {
    formikProps?: Partial<FormikConfig<{ password: string }>>;
  }
> = ({ passwordInputProps, formikProps }) => {
  return (
    <Providers>
      <Formik
        initialValues={{
          password: ''
        }}
        onSubmit={() => {}}
        validateOnMount
        {...formikProps}
      >
        <PasswordInput {...passwordInputProps} />
      </Formik>
    </Providers>
  );
};

export const Default = Template.bind({});
Default.args = {
  passwordInputProps: {
    name: 'password',
    label: 'Password',
    placeholder: '**********',
    helperText: 'Must contain uppercase, lowercase, digits and symbols'
  },
  formikProps: {
    initialValues: {
      password: ''
    },
    initialTouched: {
      password: true
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[\]\\' ~_]).*/,
          'Weak password'
        )
        .required()
    })
      .strict()
      .noUnknown()
  }
};

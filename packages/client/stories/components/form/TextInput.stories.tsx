import { Meta, Story } from '@storybook/react';
import { Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';

import { Providers, TextInput, TextInputProps } from 'components';

export default {
  title: 'Components/Form/Text Input',
  component: TextInput
} as Meta;

const Template: Story<
  { textInputProps: TextInputProps } & {
    formikProps?: Partial<FormikConfig<{ name: string }>>;
  }
> = ({ textInputProps, formikProps }) => {
  return (
    <Providers>
      <Formik
        initialValues={{
          name: 'John Doe'
        }}
        onSubmit={() => {}}
        validateOnMount
        {...formikProps}
      >
        <TextInput {...textInputProps} />
      </Formik>
    </Providers>
  );
};

export const Default = Template.bind({});
Default.args = {
  textInputProps: {
    name: 'name'
  }
};

export const WithLabelPlaceholderHelperText = Template.bind({});
WithLabelPlaceholderHelperText.storyName = 'Label + Placeholder + Helper text';

WithLabelPlaceholderHelperText.args = {
  textInputProps: {
    name: 'name',
    label: 'Full name',
    placeholder: 'John Doe',
    helperText: 'First and last name separated by space'
  }
};

export const Disabled = Template.bind({});
Disabled.args = {
  textInputProps: {
    name: 'name',
    disabled: true
  }
};

export const RequiredFieldError = Template.bind({});
RequiredFieldError.storyName = 'Required field error';
RequiredFieldError.args = {
  textInputProps: {
    name: 'name',
    label: 'Full name',
    placeholder: 'John Doe',
    helperText: 'First and last name separated by space'
  },
  formikProps: {
    initialValues: {
      name: ''
    },
    initialTouched: {
      name: true
    },
    validationSchema: Yup.object({
      name: Yup.string().required()
    })
      .strict()
      .noUnknown()
  }
};

export const InvalidFieldInputError = Template.bind({});
InvalidFieldInputError.storyName = 'Invalid field input error';
InvalidFieldInputError.args = {
  textInputProps: {
    name: 'name',
    label: 'Full name',
    placeholder: 'John Doe',
    helperText: 'First and last name separated by space'
  },
  formikProps: {
    initialValues: {
      name: 123 as any
    },
    initialTouched: {
      name: true
    },
    validationSchema: Yup.object({
      name: Yup.string().typeError('Must specify a string').required()
    })
      .strict()
      .noUnknown()
  }
};

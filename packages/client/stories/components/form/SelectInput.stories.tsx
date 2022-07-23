import { Meta, Story } from '@storybook/react';
import { Formik } from 'formik';

import { Providers, SelectInput, SelectInputProps } from 'components';

export default {
  title: 'Components/Form/Select Input',
  component: SelectInput
} as Meta;

const Template: Story<SelectInputProps> = (props) => {
  return (
    <Providers>
      <Formik
        initialValues={{
          role: 'user'
        }}
        onSubmit={() => {}}
        validateOnMount
      >
        <SelectInput {...props} />
      </Formik>
    </Providers>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'role',
  label: 'Role',
  helperText: 'Select your role',
  values: [
    {
      label: 'Admin',
      value: 'admin'
    },
    {
      label: 'User',
      value: 'user'
    }
  ]
};

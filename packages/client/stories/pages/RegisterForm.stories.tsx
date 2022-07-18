import { Meta, Story } from '@storybook/react';
import { Document, RegisterForm, RegisterFormProps } from 'components';
import { mockUnAuthenticationHandler } from 'mocks/handlers';
import { createQueryClient } from 'utils';

export default {
  title: 'Pages/Register/Register Form',
  component: RegisterForm
} as Meta;

const Template: Story<RegisterFormProps> = (props) => {
  const queryClient = createQueryClient();
  return (
    <Document queryClient={queryClient} showReactQueryDevTools={false}>
      <RegisterForm {...props} />
    </Document>
  );
};

export const Default = Template.bind({});

Default.decorators = [
  (PartialStoryFn) => {
    mockUnAuthenticationHandler();
    return <PartialStoryFn />;
  }
];

export const WithInitialValues = Template.bind({});
WithInitialValues.decorators = [
  (PartialStoryFn) => {
    mockUnAuthenticationHandler();
    return <PartialStoryFn />;
  }
];

WithInitialValues.args = {
  initialValues: {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    password: 'password123',
    username: 'john_doe'
  }
};

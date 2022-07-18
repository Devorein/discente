import { Meta, Story } from '@storybook/react';
import { Document, LoginForm, LoginFormProps } from 'components';
import { mockUnAuthenticationHandler } from 'mocks/handlers';
import { createQueryClient } from 'utils';

export default {
  title: 'Pages/Login/Login Form',
  component: LoginForm
} as Meta;

const Template: Story<LoginFormProps> = (props) => {
  const queryClient = createQueryClient();
  return (
    <Document queryClient={queryClient} showReactQueryDevTools={false}>
      <LoginForm {...props} />
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
    usernameOrEmail: 'John Doe',
    password: 'password123'
  }
};

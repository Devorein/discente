import { Meta, Story } from '@storybook/react';
import { LandingPage } from 'components';
import { Document } from 'components/common';
import { mockUnAuthenticationHandler } from 'mocks/handlers';
import { createQueryClient } from 'utils';

export default {
  title: 'Pages/Homepage/Landing',
  component: LandingPage
} as Meta;

const Template: Story = () => {
  const queryClient = createQueryClient();

  return (
    <Document queryClient={queryClient} showReactQueryDevTools={false}>
      <LandingPage />
    </Document>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';

Default.decorators = [
  (PartialStoryFn) => {
    mockUnAuthenticationHandler();
    return <PartialStoryFn />;
  }
];

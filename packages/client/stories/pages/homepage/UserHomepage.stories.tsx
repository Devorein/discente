import { Meta, Story } from '@storybook/react';
import { UserHomepage } from 'components';
import { Document } from 'components/common';

export default {
  title: 'Pages/Homepage/User',
  component: UserHomepage
} as Meta;

const Template: Story = () => {
  return (
    <Document showReactQueryDevTools={false}>
      <UserHomepage />
    </Document>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';

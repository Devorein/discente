import { Meta, Story } from '@storybook/react';
import { AdminHomepage, Document } from 'components';

export default {
  title: 'Pages/Homepage/Admin',
  component: AdminHomepage
} as Meta;

const Template: Story = () => {
  return (
    <Document showReactQueryDevTools={false}>
      <AdminHomepage />
    </Document>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';

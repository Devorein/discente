import { Box } from '@mui/system';
import { Meta, Story } from '@storybook/react';

import { FieldLabel, FieldLabelProps, Providers } from 'components';

export default {
  title: 'Components/Form/Field label text',
  component: FieldLabel
} as Meta;

const Template: Story<FieldLabelProps> = (props) => {
  return (
    <Providers>
      <Box width={250}>
        <FieldLabel {...props} />
      </Box>
    </Providers>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'username',
  label: 'Username'
};

export const Required = Template.bind({});
Required.args = {
  name: 'username',
  label: 'Username',
  required: true
};

export const Error = Template.bind({});
Error.args = {
  name: 'username',
  label: 'Username',
  required: true,
  error: 'Username is required'
};

import { Meta, Story } from '@storybook/react';

import { FieldHelperText, FieldHelperTextProps, Providers } from 'components';

export default {
  title: 'Components/Form/Field helper text',
  component: FieldHelperText
} as Meta;

const Template: Story<FieldHelperTextProps> = (props) => {
  return (
    <Providers>
      <FieldHelperText {...props} />
    </Providers>
  );
};

export const Default = Template.bind({});
Default.args = {
  helperText: 'Please use uppercase, lowercase, digits and symbols'
};

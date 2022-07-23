import { Meta, Story } from '@storybook/react';
import { Formik } from 'formik';

import TextInput, {
  TextInputProps
} from '../../components/common/Form/TextInput';

export default {
  title: 'Components/Text Input',
  component: TextInput
} as Meta;

const Template: Story<TextInputProps> = (props) => {
  return (
    <Formik
      initialValues={{
        name: 'John Doe'
      }}
      onSubmit={() => {}}
    >
      <TextInput {...props} />
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'name'
};

export const WithLabelPlaceholderHelperText = Template.bind({});
WithLabelPlaceholderHelperText.storyName = 'Label + Placeholder + Helper text';

WithLabelPlaceholderHelperText.args = {
  name: 'name',
  label: 'Text input label',
  placeholder: 'Placeholder value',
  helperText: 'Helper text'
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'name',
  disabled: true
};

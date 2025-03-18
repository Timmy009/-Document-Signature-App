import { StoryFn, Meta } from '@storybook/react';
import { CircularProgressBar as CircularProgressBarBase } from './circle';

export default {
  title: 'Primitive/Progress',
  component: CircularProgressBarBase,
  argTypes: {
    variant: {},
  },
} as Meta<typeof CircularProgressBarBase>;

const Template: StoryFn<typeof CircularProgressBarBase> = (args) => {
  return <CircularProgressBarBase {...args} />;
};

export const Circle = Template.bind({});
Circle.args = {
  progress: 40,
};

import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { Banner } from './banner';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Warning: Story = {
  args: {
    variant: 'warning',
    label:
      'Keep your information current to personalizze your academic journey. Click Edit Profile to make changes.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label:
      'Keep your information current to personalizze your academic journey. Click Edit Profile to make changes.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label:
      'Keep your information current to personalizze your academic journey. Click Edit Profile to make changes.',
  },
};

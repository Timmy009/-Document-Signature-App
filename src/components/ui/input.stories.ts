import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const RegularInput: Story = {
  args: {
    // className: 'h-96 w-64',
    placeholder: 'Email',
    type: 'email',
  },
};

export const FileInput: Story = {
  args: {
    id: 'picture',
    type: 'file',
  },
};

export const Diabled: Story = {
  args: {
    // className: 'h-96 w-64',
    placeholder: 'Phone number',
    type: 'number',
    disabled: true,
  },
};
export const Error: Story = {
  args: {
    // className: 'h-96 w-64',
    placeholder: 'Phone number',
    type: 'number',
    error: true,
  },
};
export const Bare: Story = {
  args: {
    // className: 'h-96 w-64',
    placeholder: 'Phone number',
    type: 'number',
    variant: 'bare',
  },
};

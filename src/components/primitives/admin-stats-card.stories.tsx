import type { Meta, StoryObj } from '@storybook/react';
import { AdminStatsCard } from './admin-stats-card';
import { CourseIcon } from 'hugeicons-react';
import { ContributionsEnum } from '@/dto/courses';
// import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/AdminStatsCard',
  component: AdminStatsCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    title: { control: 'text' },
    value: { control: 'number' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof AdminStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Courses: Story = {
  args: {
    title: ContributionsEnum.EXAMCOUNT,
    value: 10,
    icon: <CourseIcon color="white" size={20} />,
  },
};

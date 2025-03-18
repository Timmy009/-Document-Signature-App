import { StoryFn, Meta } from '@storybook/react';
import { Text as TypographyText } from './text';

const meta = {
  title: 'Typography/Text',
  component: TypographyText,
  argTypes: {
    fontSize: {
      //options: ['text-sm', 'text-md', 'text-xl', 'text-2xl'],
      control: { type: 'select' },
    },
    casing: {
      control: { type: 'select' },
    },
    textDecoration: {
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof TypographyText>;

// type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof TypographyText> = (args) => (
  <TypographyText {...args} />
);

export const Text = Template.bind({});
Text.args = {
  asComp: 'h1',
  children:
    'I hope this was helpful for beginners trying to wrap their head around the GraphQL pagination model and integrate with React and Relay Classic. I wanted to share this because I could not find any examples of bi-directional pagination in GraphQL while solving this exercise.',
};

export default meta;

import { StoryFn, Meta } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: {},
} satisfies Meta<typeof Card>;

// type Story = StoryObj<typeof meta>;

export const CardBase: StoryFn<typeof Card> = (args) => (
  <Card {...args}>
    <CardHeader>
      <CardTitle>Tokyo</CardTitle>
      <CardDescription>The most beautiful city in the word</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Beaches . Building . Lifestyle</p>
    </CardContent>
    <CardFooter>
      <Button>Reserve</Button>
    </CardFooter>
  </Card>
);

export default meta;

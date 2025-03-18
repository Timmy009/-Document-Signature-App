import { StoryFn, Meta } from '@storybook/react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {},
} satisfies Meta<typeof RadioGroup>;

// type Story = StoryObj<typeof meta>;

export const RadioGroupBase: StoryFn<typeof RadioGroup> = (args) => {
  return (
    <RadioGroup {...args} defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  );
};

export default meta;

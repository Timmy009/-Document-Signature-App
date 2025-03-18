import { StoryFn, Meta } from '@storybook/react';
import { Document as DocumentBase } from './document';

export default {
  title: 'Connected/Document',
  component: DocumentBase,
  argTypes: {},
} as Meta<typeof DocumentBase>;

const Template: StoryFn<typeof DocumentBase> = (args) => (
  <DocumentBase {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  document: {
    name: 'My Redemption.pdf',
    type: 'document',
    id: '1',
    url: 'https://images.unsplash.com/file-1635810851773-3defff69fe00image',
    size: '2 MB',
  },
};

export const Uploading = Template.bind({});
Uploading.args = {
  uploading: true,
  uploadPercent: 80,
  document: {
    name: 'My Redemption.pdf',
    type: 'document',
    id: '1',
    url: 'https://images.unsplash.com/file-1635810851773-3defff69fe00image',
    size: '2 MB',
  },
};

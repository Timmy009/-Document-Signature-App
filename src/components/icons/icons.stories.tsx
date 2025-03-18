// // import { storiesOf } from '@storybook/react';
import * as generated from './generated';
import { Meta, IconGallery, IconItem } from '@storybook/blocks';

// // Icons gallery example code
// {/\* <div
// key={index}
// className="bg-transparent border border-black-50 rounded flex flex-col items-center justify-center p-4 truncate transition duration-150 ease-in-out transform hover:scale-110 hover:bg-grey-100"

// >

// <Icon width={size} height={size} color={color} className="mb-2" />
// <Text fontSize="text-sm" isTruncated>
// 	{Icon.name.replace('Svg', '')}
// </Text>
// </div>
// <IconExample icon={icon} />
// */}
// const meta = <Meta title="Components/Icons" />;

export const Icons = () => (
  <IconGallery>
    {Object.entries(generated).map(([name, Icon], index) => (
      <IconItem name={name} key={`${name}_${index}`}>
        <Icon width={24} height={24} color={'000000'} className="mb-2" />
      </IconItem>
    ))}
  </IconGallery>
);

const meta = {
  title: 'Components/Icons',
  // component: Icons,
  // args: {
  //   size: 32,
  //   color: '#DD0035',
  // },
  // argTypes: {
  //   size: {
  //     options: [16, 24, 32, 64, 128],
  //     control: { type: 'select' },
  //   },
  //   color: {
  //     options: [
  //       '#000000',
  //       '#DD0035',
  //       '#191919',
  //       '#FFC700',
  //       '#39B54A',
  //       '#808080',
  //       '#FFFFFF',
  //       '#F2994A',
  //     ],
  //     control: { type: 'select' },
  //   },
  // },
};

export default meta;

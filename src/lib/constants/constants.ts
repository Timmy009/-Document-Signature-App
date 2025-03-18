import image1 from '../../assets/images/slide_one.png';
import image2 from '../../assets/images/slide_two.png';
import image3 from '../../assets/images/slide_three.png';

export const authSliderData: Array<{
  imageUrl: string;
  title: string;
  desc: string;
}> = [
  {
    imageUrl: image1,
    title: 'AI Mock Exams & Study Library',
    desc: 'Access tailored study materials and mock \nexams for your courses.',
  },
  {
    imageUrl: image2,
    title: 'Assignment Marketplace',
    desc: 'Receive assignment help or share your \nexpertise and earn money.',
  },
  {
    imageUrl: image3,
    title: 'Test and Analyze',
    desc: ' Gain access to customized materials \ndesigned to meet your specific learning \nrequirements.',
  },
];

export const period_list = [
  'TODAY',
  'THIS_WEEK',
  'LAST_WEEK',
  'THIS_MONTH',
  'LAST_MONTH',
  'THIS_YEAR',
  'LAST_YEAR',
  'CUSTOM',
];

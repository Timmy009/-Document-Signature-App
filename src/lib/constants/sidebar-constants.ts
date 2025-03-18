import { ISidebarItem } from '@/dto/app';
import {
  AllBookmarkIcon,
  Book02Icon,
  CalculateIcon,
  ChatBotIcon,
  Chatting01Icon,
  CourseIcon,
  FileUploadIcon,
  Home01Icon,
  LibrariesIcon,
  Logout03Icon,
  Settings01Icon,
  UserGroupIcon,
  UserListIcon,
} from 'hugeicons-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';

export const sidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Home',
      icon: Home01Icon,
      url: '/dashboard',
      isActive: true,
    },
    {
      title: 'Course',
      icon: Book02Icon,
      url: '/courses',
    },
    {
      title: 'Chat',
      icon: Chatting01Icon,
      url: '/chat',
    },
    {
      title: 'Assistance',
      icon: ChatBotIcon,
      url: '/assistance',
    },
  ] as ISidebarItem[],
  projects: [
    {
      title: 'Community',
      url: '#',
      icon: UserGroupIcon,
    },
    {
      title: 'My Test',
      url: '#',
      icon: CourseIcon,
    },
    {
      title: 'Signature',
      url: '/sign',
      icon: LibrariesIcon,
    },
    
  ] as ISidebarItem[],
  settings: [
    {
      title: 'Account',
      url: '/profile',
      icon: Settings01Icon,
    },
  ] as ISidebarItem[],
  footer: [
    {
      title: 'Log out',
      url: '#',
      icon: Logout03Icon,
    },
  ] as ISidebarItem[],
};

export const orgSidebarData = {
  navMain: [
    {
      title: 'Home',
      icon: Home01Icon,
      url: '/dashboard',
      isActive: true,
    },
    {
      title: 'My Upload',
      icon: FileUploadIcon,
      url: '/upload',
    },
    
  ] as ISidebarItem[],
  projects: [
   
    {
      title: 'Signature',
      url: '/sign',
      icon: LibrariesIcon,
    },
  ] as ISidebarItem[],
  settings: [
    {
      title: 'Account',
     
      url: '/profile',
      icon: Settings01Icon,
    },
  ] as ISidebarItem[],
  footer: [
    {
      title: 'Log out',
      url: '#',
      icon: Logout03Icon,
    },
  ] as ISidebarItem[],
};

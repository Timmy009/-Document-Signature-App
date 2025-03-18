'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarItemList } from '../primitives/sidebar-item-list';
import { LogoFilled, LogoIcon } from '../icons/generated';
import { Logoutbutton } from './logoutbutton';
import { Divider } from '../ui/divider';
import { orgSidebarData, sidebarData } from '@/lib/constants/sidebar-constants';
import { Link } from 'react-router-dom';
import { Feather } from 'lucide-react';
import { FeatherIcon } from 'hugeicons-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile } = useSidebar();




  return (
    <Sidebar
      variant={isMobile ? 'inset' : 'sidebar'}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>

        <Link to="/" className="pt-2 pb-3">
          {open ? (
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <FeatherIcon width={30} height={32} className="transition-transform duration-300 transform hover:scale-105" />
            <span className="text-base font-bold text-blue-600">Contract Squire</span>
          </div>

          ) : (
            <LogoIcon width={32} height={32} />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>

        <SidebarItemList items={orgSidebarData.navMain} />



        <Divider />

        <SidebarItemList items={orgSidebarData.projects} />



        <Divider />

        <SidebarItemList items={sidebarData.settings} />

      </SidebarContent>
      <SidebarFooter>
        <Logoutbutton onClick={() => null} loading={false} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

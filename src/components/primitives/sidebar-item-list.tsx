import { Link, useLocation } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import { ISidebarItem } from '@/dto/app';
import { useCallback } from 'react';

interface ICustomSidebarItemProps {
  items: ISidebarItem[];
}

export const SidebarItemList = ({ items }: ICustomSidebarItemProps) => {
  const location = useLocation();
  const activePath = location.pathname.split('/').reverse()[0];
  console.log(activePath, '==> location');
  const { isMobile, toggleSidebar } = useSidebar();

  const handleCloseAfterClick = useCallback(() => {
    if (isMobile) toggleSidebar();
  }, [isMobile, toggleSidebar]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          const mainURL = item.url.split('/').reverse()[0];
          console.log(mainURL, '==> mainURL');

          // const isActive = Boolean(mainURL === activePath);
          const isActive = Boolean(
            location.pathname.split('/').includes(mainURL)
          );
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={item.title}
                asChild
              >
                <Link
                  to={item.url}
                  className="flex items-center text-neutral-900 space-x-1 hover:no-underline"
                  onClick={handleCloseAfterClick}
                >
                  {item.icon && (
                    <item.icon
                      size={20}
                      strokeWidth={2}
                      // width={24}
                      // height={24}
                      stroke="10"
                      color="text-grey-800"
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

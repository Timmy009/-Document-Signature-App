import { HugeiconsIcon } from 'hugeicons-react';

export interface ISidebarItem {
  title: string;
  url: string;
  icon?: HugeiconsIcon;
  isActive?: boolean;
}

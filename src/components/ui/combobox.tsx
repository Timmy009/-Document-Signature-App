import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TWidth } from 'tailwindcss-classnames';
import { CommandLoading } from 'cmdk';
import { Command as CommandPrimitive } from 'cmdk';
import { Loading02Icon } from 'hugeicons-react';

interface ICombobox
  extends Omit<React.ComponentPropsWithoutRef<typeof Command>, 'onChange'> {
  data?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  emptyLabel?: string;
  width?: TWidth | string;
  loading?: boolean;
  disabled?: boolean;
  name: string;
  resetSearch?: () => void;
  searchProps?: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;
}

export function Combobox({
  data,
  value,
  onChange,
  placeholder,
  emptyLabel,
  width,
  loading,
  searchProps,
  resetSearch,
  disabled,
  ...props
}: ICombobox) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const [popoverWidth, setPopoverWidth] = React.useState(() => 'w-[200px]');

  React.useEffect(() => {
    if (!open) {
      if (resetSearch) resetSearch();
    }
  }, [open, resetSearch]);

  React.useEffect(() => {
    if (ref.current?.clientWidth) {
      setPopoverWidth(`w-[${ref.current?.clientWidth}px]`);
    }
  }, [ref.current?.clientWidth]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline_base"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', width)}
          disabled={Boolean(disabled)}
        >
          {value
            ? data?.find((item) => item.value === value)?.label
            : placeholder
            ? `${placeholder}...`
            : 'Select item...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', popoverWidth)}>
        <Command {...props}>
          <CommandInput
            placeholder="Search ..."
            className="h-9"
            {...searchProps}
          />
          <CommandList>
            {!loading ? (
              <CommandEmpty>{emptyLabel ?? 'No item found.'}</CommandEmpty>
            ) : null}
            {loading && (
              <CommandLoading className="flex justify-center items-center text-sm p-2 text-center">
                {/* {loadingText ?? 'Fetching items...'} */}
                <Loading02Icon className="w-5 h-5 animate-spin" />
              </CommandLoading>
            )}
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

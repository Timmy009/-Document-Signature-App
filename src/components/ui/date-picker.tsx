import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';

type DatePickerProps = Omit<
  React.ComponentProps<typeof Calendar>,
  'onSelect' | 'mode' | 'classNames' | 'className' | 'selected'
> & {
  selected?: Date;
  onSelect: SelectSingleEventHandler;
  placeholder?: string;
};

export function DatePicker({
  selected,
  placeholder,
  ...props
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant={'outline_base'}
          className={cn(
            ' justify-start text-left font-normal',
            !selected && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {selected ? (
            format(selected, 'PPP')
          ) : (
            <span>{placeholder ?? `Pick a date`}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} initialFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}

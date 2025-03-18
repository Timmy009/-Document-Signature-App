import { cn } from '@/lib/utils';
import { Text } from '../typography/Text/text';

interface IDividerProps {
  className?: string;
  label?: string;
}

export const Divider = ({ label, className }: IDividerProps) => {
  return (
    <div
      className={`relative flex  items-center py-0 my-0 ${
        label ? 'space-x-2' : ''
      }`}
    >
      <div className={cn('w-full bg-border  h-[1px]', className)}></div>
      {label ? (
        <Text textColor="text-neutral-700" fontSize="text-sm">
          {label}
        </Text>
      ) : // </div>
      null}
      <div className="w-full h-[1px] bg-border" />
    </div>
  );
};

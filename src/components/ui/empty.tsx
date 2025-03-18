import { cn } from '@/lib/utils';
import { Text } from '../typography/Text/text';

interface IEmptyProps {
  icon: React.ReactNode;
  description: string;
  className?: string;
}

export const Empty = ({ icon, description, className }: IEmptyProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4',
        className
      )}
    >
      {icon}
      <Text fontWeight="font-medium">{description}</Text>
    </div>
  );
};

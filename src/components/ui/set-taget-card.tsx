import { Text } from '../typography/Text/text';
import { Button } from './button';

interface ISetTargetCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  buttonText?: string;
}

export const SetTargetCard = ({
  title,
  description,
  buttonText,
  onClick,
}: ISetTargetCardProps) => {
  return (
    <div className="w-full bg-[#f7f7f7] px-6 py-4 rounded-lg space-y-5">
      <div className="space-y-1">
        <Text
          textColor="text-primary"
          fontSize="text-2xl"
          fontWeight="font-semibold"
        >
          {title}
        </Text>
        <Text textColor="text-grey-600" fontWeight="font-medium">
          {description}
        </Text>
      </div>

      <Button onClick={onClick}>{buttonText ?? 'Set a target'}</Button>
    </div>
  );
};

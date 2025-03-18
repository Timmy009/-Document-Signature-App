import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IUser } from '@/dto/user';
import { getNameInitials } from '@/lib/utils';
import { Text } from '../typography/Text/text';
import { Skeleton } from '../ui/skeleton';

interface IUserCardProps {
  user: IUser;
}

export const UserCard = ({ user }: IUserCardProps) => {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ');
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.profilePictureUrl} />
        <AvatarFallback>{getNameInitials({ name })}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 w-full">
        <Text fontSize="text-sm" fontWeight="font-medium">
          {name}
        </Text>
        <Text textColor="text-accent" fontSize="text-xs">
          {user.email}
        </Text>
      </div>
    </div>
  );
};

export const UserCardLoader = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Skeleton className="w-10 h-10 rounded-full " />
      </div>
      <div className="space-y-2 w-full">
        <Skeleton className="w-1/2 h-5" />
        <Skeleton className="w-2/3 h-5" />
      </div>
    </div>
  );
};

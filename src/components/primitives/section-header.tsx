import { Text } from '../typography/Text/text';

interface ISectionHeaderProps {
  title: string;
  subTitle?: string;
}

export const SectionHeader = ({ title, subTitle }: ISectionHeaderProps) => {
  return (
    <div>
      <Text fontSize="text-base" fontWeight="font-bold">
        {title}
      </Text>
      {subTitle ? (
        <Text textColor="text-neutral-800" fontSize="text-sm">
          {subTitle}
        </Text>
      ) : null}
    </div>
  );
};

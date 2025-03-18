import { cloneElement, ComponentProps, ReactElement } from 'react';
import { Card, CardDescription, CardTitle } from './card';
import { Text } from '../typography/Text/text';

interface ICardButtonProps extends ComponentProps<typeof Card> {
  icon?: ReactElement;
  label: string;
  subLabel?: string;
}

export const CardButton = ({
  icon,
  label,
  subLabel,
  className,
  ...props
}: ICardButtonProps) => {
  return (
    <Card
      {...props}
      className={`px-9 py-11 w-[218px] cursor-pointer hover:bg-primary/5 ${className}`}
    >
      <div className="flex flex-col w-full justify-center items-center gap-2">
        {icon ? (
          <div className={`p-2 rounded-lg ${'bg-primary-light'}`}>
            {cloneElement(icon, {
              color: '#1E2F97',
            })}
          </div>
        ) : null}
        <div className="space-y-2">
          <CardTitle>{label}</CardTitle>
          {subLabel ? <CardDescription>{subLabel}</CardDescription> : null}{' '}
        </div>
      </div>
    </Card>
  );
};

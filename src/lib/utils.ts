import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

interface INameInitialsProps {
  name: string | undefined;
  maxInitials?: number;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onError = (error: TypeError, message?: string) => {
  toast.error(
    (error as AxiosError<{ message: string }>)?.response?.data?.message ??
      message
  );
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const getNameInitials = ({
  name,
  maxInitials = 2,
}: INameInitialsProps) => {
  if (!name) return '';
  return name
    .split(/\s/)
    .map((part) => part.substring(0, 1).toUpperCase())
    .filter((value) => !!value)
    .slice(0, maxInitials)
    .join('')
    .toUpperCase();
};

export const hexColorVariants = [1, 0.8, 0.7, 0.9, 0.6];

export function getDataAggregateValue(data: { name: string; value: number }[]) {
  let aggregate;
  if (Array.isArray(data) && data.length > 0 && data[0].value !== undefined) {
    aggregate = data.reduce((prev, cur) => {
      if (Number(cur.value)) {
        prev += cur.value;
      }

      return prev;
    }, 0);
  }

  return aggregate;
}

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { AlertCircleIcon } from 'hugeicons-react';
import { CheckCircleIcon } from 'lucide-react';
import { Text } from '../typography/Text/text';

const bannerVariants = cva(
  'border flex flex-col text-sm  w-full py-2.5 px-4 rounded-sm min-h-[54px] overflow-y-hidden',
  {
    variants: {
      variant: {
        warning: 'border-warning text-warning bg-warning-50',
        success: 'border-success text-success bg-success-50',
        error: 'border-error text-error bg-error-50',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  }
);

interface IBannerProps extends VariantProps<typeof bannerVariants> {
  label: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
}
const iconMap = {
  error: AlertCircleIcon,
  warning: AlertCircleIcon,
  success: CheckCircleIcon,
};

export const Banner = ({
  label,
  variant,
  description,
  className,
}: IBannerProps) => {
  const Icon = iconMap[variant ?? 'warning'];

  return (
    <div className={cn(bannerVariants({ variant, className }))}>
      <div className="flex items-center">
        <Icon size={16} className="text-inherit flex-shrink-0 " />

        <span className="ml-2 leading-none">
          {typeof label == 'string' ? (
            <Text fontSize="text-sm" textColor="text-grey-600">
              {label}
            </Text>
          ) : (
            label
          )}
        </span>
      </div>
      {description && (
        <Text fontSize="text-xs" textColor="text-gray-500">
          {description}
        </Text>
      )}
    </div>
  );
};

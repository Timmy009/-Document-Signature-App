import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default:
          'focus-visible:border-primary ring-primary focus-visible:ring-primary-200',
        bare: 'border-none rounded-none py-0 px-0 focus-visible:ring-0',
        unstyled: 'border-none rounded-none py-1 px-0 focus-visible:ring-0',
        // filled: '',
      },
      error: {
        false: null,
        true: 'ring-error !border-error focus-visible:ring-error-200',
      },
      fullWidth: {
        false: null,
        true: 'w-full',
      },
    },
  }
);

export interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = 'default',
      fullWidth = true,
      disabled,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
            error,
            fullWidth,
            className,
          })
        )}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  }
);
Input.displayName = 'Input';

// eslint-disable-next-line react-refresh/only-export-components
export { Input, inputVariants };
